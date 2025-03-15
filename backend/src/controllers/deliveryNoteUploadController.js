import multer from 'multer';
import { pool } from '../utils/db.js';
import ocrService from '../services/ocrService.js';
import mistralOcrService from '../services/mistralOcrService.js';

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

            // Usar solo Mistral OCR temporalmente
            console.log('Procesando imagen con Mistral OCR...');
            const extractedData = await mistralOcrService.processImage(req.file.buffer);
            
            if (!extractedData) {
                throw new Error('Mistral OCR falló al procesar la imagen');
            }

            console.log('Resultado Mistral OCR:', extractedData);

            res.json({
                success: true,
                data: extractedData
            });

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
            const { supplier_name, delivery_date, items } = req.body;

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
                'INSERT INTO delivery_notes (supplier_id, delivery_date) VALUES (?, ?)',
                [supplier_id, delivery_date]
            );
            const deliveryNoteId = deliveryNote.insertId;

            // 3. Procesar cada item
            for (const item of items) {
                // 3.1 Buscar o crear el producto
                let [productRows] = await connection.query(
                    'SELECT id FROM products WHERE name = ?',
                    [item.product_name]
                );

                let product_id;
                if (productRows.length === 0) {
                    const [newProduct] = await connection.query(
                        'INSERT INTO products (name, unit) VALUES (?, ?)',
                        [item.product_name, item.unit]
                    );
                    product_id = newProduct.insertId;
                } else {
                    product_id = productRows[0].id;
                }

                // 3.2 Crear el item del albarán
                await connection.query(
                    'INSERT INTO delivery_note_items (delivery_note_id, product_id, quantity, unit, batch_number, expiry_date, unit_price) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [deliveryNoteId, product_id, item.quantity, item.unit, item.batch_number, item.expiry_date, item.price]
                );

                // 3.3 Crear el movimiento de stock
                await connection.query(
                    'INSERT INTO stock_movements (product_id, movement_type, quantity, unit, reference_type, reference_id, batch_number, expiry_date) VALUES (?, "entrada", ?, ?, "delivery_note", ?, ?, ?)',
                    [product_id, item.quantity, item.unit, deliveryNoteId, item.batch_number, item.expiry_date]
                );
            }

            await connection.commit();
            res.json({
                success: true,
                message: 'Albarán guardado correctamente',
                deliveryNoteId
            });

        } catch (error) {
            await connection.rollback();
            console.error('Error confirming delivery note:', error);
            res.status(500).json({
                success: false,
                error: 'Error al guardar el albarán'
            });
        } finally {
            connection.release();
        }
    }
}

export default new DeliveryNoteUploadController();
