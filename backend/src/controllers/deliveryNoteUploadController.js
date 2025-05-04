import multer from 'multer';
import { pool } from '../utils/db.js';
import ocrService from '../services/ocrService.js';
import { mistralOcrService } from '../services/mistralOcrService.js';

// Configurar multer para usar almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Solo se permiten archivos PDF e imágenes'));
            return;
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
}).single('file');

class DeliveryNoteUploadController {
    async uploadFile(req, res) {
        try {
            await new Promise((resolve, reject) => {
                upload(req, res, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: 'No se ha proporcionado ningún archivo'
                });
            }

            // Determinar qué servicio OCR usar basado en la variable de entorno
            let extractedData;
            const useMistralOcr = process.env.USE_MISTRAL_OCR === 'true';
            
            try {
                if (useMistralOcr) {
                    console.log('Procesando imagen con Mistral OCR...');
                    extractedData = await mistralOcrService.processImage(req.file.buffer);
                } else {
                    console.log('Procesando imagen con OCR.space...');
                    extractedData = await ocrService.processImage(req.file.buffer);
                }
                
                console.log('Resultado OCR:', extractedData);
                
                res.json({
                    success: true,
                    data: extractedData
                });
            } catch (error) {
                console.error('Error al procesar la imagen:', error.message);
                return res.status(422).json({
                    success: false,
                    error: `Error al procesar la imagen: ${error.message}`,
                    service: useMistralOcr ? 'Mistral OCR' : 'OCR.space'
                });
            }

        } catch (error) {
            console.error('Error processing delivery note:', error);
            res.status(500).json({
                success: false,
                error: 'Error al procesar el albarán'
            });
        }
    }

    async confirmDeliveryNote(req, res) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const { supplier_name, delivery_date, delivery_note_number, items } = req.body;

            console.log('Datos recibidos para confirmar albarán:', JSON.stringify({
                supplier_name,
                delivery_date,
                delivery_note_number,
                items_count: items ? items.length : 0
            }));

            // Validar datos requeridos
            if (!supplier_name) {
                throw new Error('El nombre del proveedor es obligatorio');
            }
            if (!delivery_date) {
                throw new Error('La fecha de entrega es obligatoria');
            }
            if (!items || !Array.isArray(items) || items.length === 0) {
                throw new Error('Se requiere al menos un producto en el albarán');
            }

            // 1. Buscar o crear el proveedor
            let [supplierRows] = await connection.query(
                'SELECT id FROM suppliers WHERE name = ?',
                [supplier_name]
            );

            let supplier_id;
            if (supplierRows.length === 0) {
                const [newSupplier] = await connection.query(
                    'INSERT INTO suppliers (name, type) VALUES (?, "general")',
                    [supplier_name]
                );
                supplier_id = newSupplier.insertId;
            } else {
                supplier_id = supplierRows[0].id;
            }

            // 2. Crear el albarán
            const [deliveryNote] = await connection.query(
                'INSERT INTO delivery_notes (supplier_id, delivery_date, supplier_delivery_note_number) VALUES (?, ?, ?)',
                [supplier_id, delivery_date, delivery_note_number || null]
            );
            const deliveryNoteId = deliveryNote.insertId;

            // Clasificar productos como existentes o nuevos
            const existingProducts = [];
            const newProducts = [];
            
            // 3. Procesar cada item
            for (const item of items) {
                try {
                    // Validar datos del producto
                    if (!item.product_name) {
                        console.warn('Producto sin nombre detectado, se omitirá');
                        continue;
                    }
                    
                    // 3.1 Buscar el producto por código primero (si existe)
                    let productRows = [];
                    if (item.product_code) {
                        [productRows] = await connection.query(
                            'SELECT id, name FROM products WHERE code = ?',
                            [item.product_code]
                        );
                    }
                    
                    // Si no se encuentra por código, buscar por nombre
                    if (productRows.length === 0) {
                        [productRows] = await connection.query(
                            'SELECT id, name FROM products WHERE name = ?',
                            [item.product_name]
                        );
                    }

                    let product_id;
                    let isNewProduct = false;
                    
                    if (productRows.length === 0) {
                        // Crear nuevo producto
                        // Determinar el tipo de producto basado en el nombre
                        let type_id = 5; // Valor predeterminado: Seco (5)
                        
                        // Intentar determinar el tipo de producto basado en el nombre
                        const productNameLower = item.product_name.toLowerCase();
                        if (productNameLower.includes('congelado') || productNameLower.includes('congelada')) {
                            type_id = 1; // Congelado
                        } else if (productNameLower.includes('fresco') || productNameLower.includes('fresca')) {
                            type_id = 2; // Fresco
                        } else if (productNameLower.includes('conserva')) {
                            type_id = 4; // Conserva
                        }
                        
                        // Extraer información de formato (unit_quantity) del nombre o descripción
                        let unitQuantity = null;
                        
                        // Buscar patrones como "5L", "5 L", "5Lx3", "5 L x 3", "5L x3", "5 Lx3"
                        const formatRegex = /(\d+(?:\.\d+)?)\s*([KkLl]|[Kk][Gg]|[Ll][Tt]|[Uu][Dd]|[Uu][Nn][Ii])\s*(?:[xX]\s*(\d+))?/;
                        const formatMatch = item.product_name.match(formatRegex);
                        
                        if (formatMatch) {
                            const quantity = parseFloat(formatMatch[1]);
                            const unit = formatMatch[2].toUpperCase();
                            const multiplier = formatMatch[3] ? parseInt(formatMatch[3]) : 1;
                            
                            unitQuantity = quantity * multiplier;
                        }
                        
                        // Determinar la unidad de compra y la unidad base
                        let purchase_unit_id = 1; // Predeterminado: Kilogramo
                        let base_unit_id = 1; // Predeterminado: Kilogramo
                        
                        if (item.unit) {
                            // Convertir la unidad a un formato estándar
                            const unitUpper = item.unit.toUpperCase();
                            
                            // Buscar la unidad en la base de datos
                            const [unitRows] = await connection.query(
                                'SELECT id FROM units WHERE abbreviation = ? OR name = ?',
                                [unitUpper, unitUpper]
                            );
                            
                            if (unitRows.length > 0) {
                                purchase_unit_id = unitRows[0].id;
                                base_unit_id = unitRows[0].id;
                            } else {
                                // Si la unidad no existe, intentar determinarla por el nombre
                                if (unitUpper.includes('KG') || unitUpper.includes('KILO')) {
                                    purchase_unit_id = 1; // Kilogramo
                                    base_unit_id = 1;
                                } else if (unitUpper.includes('L') || unitUpper.includes('LT')) {
                                    purchase_unit_id = 3; // Litro
                                    base_unit_id = 3;
                                } else if (unitUpper.includes('UD') || unitUpper.includes('UNI')) {
                                    purchase_unit_id = 4; // Unidad
                                    base_unit_id = 4;
                                } else if (unitUpper.includes('CAJ')) {
                                    purchase_unit_id = 2; // Caja
                                    base_unit_id = 1; // Base en KG
                                }
                            }
                        }
                        
                        // Crear el producto con toda la información extraída
                        const [newProduct] = await connection.query(
                            `INSERT INTO products (
                                name, 
                                code, 
                                actual_stock, 
                                type_id, 
                                purchase_unit_id, 
                                base_unit_id, 
                                unit_quantity,
                                price,
                                last_count_date
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)`,
                            [
                                item.product_name, 
                                item.product_code || null, 
                                0, 
                                type_id, 
                                purchase_unit_id, 
                                base_unit_id, 
                                unitQuantity,
                                item.price || 0
                            ]
                        );
                        product_id = newProduct.insertId;
                        isNewProduct = true;
                        newProducts.push({
                            id: product_id,
                            name: item.product_name,
                            code: item.product_code,
                            unit: item.unit,
                            format: unitQuantity ? `${unitQuantity}` : null,
                            type_id: type_id
                        });
                    } else {
                        // Producto existente
                        product_id = productRows[0].id;
                        
                        // Actualizar información del producto si es necesario
                        let updateFields = [];
                        let updateValues = [];
                        
                        // Actualizar código de producto si no lo tiene
                        if (item.product_code) {
                            updateFields.push('code = ?');
                            updateValues.push(item.product_code);
                        }
                        
                        // Actualizar formato si se puede extraer
                        const formatRegex = /(\d+(?:\.\d+)?)\s*([KkLl]|[Kk][Gg]|[Ll][Tt]|[Uu][Dd]|[Uu][Nn][Ii])\s*(?:[xX]\s*(\d+))?/;
                        const formatMatch = item.product_name.match(formatRegex);
                        
                        if (formatMatch) {
                            const quantity = parseFloat(formatMatch[1]);
                            const multiplier = formatMatch[3] ? parseInt(formatMatch[3]) : 1;
                            const unitQuantity = quantity * multiplier;
                            
                            updateFields.push('unit_quantity = ?');
                            updateValues.push(unitQuantity);
                        }
                        
                        // Actualizar precio si está disponible
                        if (item.price) {
                            updateFields.push('price = ?');
                            updateValues.push(item.price);
                        }
                        
                        // Actualizar fecha de última actualización
                        updateFields.push('last_count_date = CURRENT_DATE');
                        
                        // Ejecutar la actualización si hay campos para actualizar
                        if (updateFields.length > 0) {
                            updateValues.push(product_id);
                            await connection.query(
                                `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
                                updateValues
                            );
                        }
                        
                        // Obtener información completa del producto para la respuesta
                        const [productDetails] = await connection.query(
                            'SELECT p.*, pt.name as type_name, u.abbreviation as unit_abbreviation FROM products p LEFT JOIN product_types pt ON p.type_id = pt.id LEFT JOIN units u ON p.purchase_unit_id = u.id WHERE p.id = ?',
                            [product_id]
                        );
                        
                        existingProducts.push({
                            id: product_id,
                            name: productRows[0].name,
                            code: item.product_code,
                            quantity: item.quantity,
                            unit: item.unit,
                            format: productDetails[0].unit_quantity ? `${productDetails[0].unit_quantity}` : null,
                            type: productDetails[0].type_name,
                            price: item.price || productDetails[0].price
                        });
                    }

                    // 3.2 Crear el item del albarán
                    const [deliveryNoteItem] = await connection.query(
                        'INSERT INTO delivery_note_items (delivery_note_id, product_id, quantity, unit_type, batch_number, expiry_date, unit_price) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [deliveryNoteId, product_id, item.quantity, item.unit || 'UNI', item.batch_number || null, item.expiry_date || null, item.price || 0]
                    );
                    
                    const deliveryNoteItemId = deliveryNoteItem.insertId;

                    // 3.3 Crear el movimiento de stock
                    await connection.query(
                        'INSERT INTO stock_movements (delivery_note_item_id, movement_type, quantity, remaining_quantity) VALUES (?, ?, ?, ?)',
                        [deliveryNoteItemId, 'in', item.quantity, item.quantity]
                    );
                    
                    // 3.4 Actualizar el stock actual del producto
                    // Actualizar directamente el stock en la tabla products
                    await connection.query(
                        'UPDATE products SET actual_stock = COALESCE(actual_stock, 0) + ?, last_count_date = CURRENT_DATE WHERE id = ?',
                        [item.quantity, product_id]
                    );
                } catch (itemError) {
                    console.error(`Error procesando producto ${item.product_name}:`, itemError);
                    throw new Error(`Error al procesar el producto ${item.product_name}: ${itemError.message}`);
                }
            }

            await connection.commit();
            
            // Preparar mensaje de respuesta según los productos encontrados
            let message = 'Albarán guardado correctamente';
            if (newProducts.length > 0) {
                message += `. Se han creado ${newProducts.length} productos nuevos.`;
            }
            
            res.json({
                success: true,
                message: message,
                deliveryNoteId,
                newProducts: newProducts.length > 0 ? newProducts : null,
                existingProducts: existingProducts.length > 0 ? existingProducts : null
            });

        } catch (error) {
            await connection.rollback();
            console.error('Error confirming delivery note:', error.message, error.stack);
            
            // Devolver un mensaje de error más descriptivo
            res.status(500).json({
                success: false,
                error: `Error al guardar el albarán: ${error.message}`
            });
        } finally {
            connection.release();
        }
    }
    
    /**
     * Actualiza el stock actual de un producto
     * @param {Object} connection - Conexión a la base de datos
     * @param {number} productId - ID del producto
     * @param {number} quantity - Cantidad a añadir
     */
    async updateProductStock(connection, productId, quantity) {
        try {
            // Actualizar directamente el stock en la tabla products
            await connection.query(
                'UPDATE products SET actual_stock = COALESCE(actual_stock, 0) + ? WHERE id = ?',
                [quantity, productId]
            );
        } catch (error) {
            console.error('Error updating product stock:', error);
            throw error;
        }
    }
}

export default new DeliveryNoteUploadController();
