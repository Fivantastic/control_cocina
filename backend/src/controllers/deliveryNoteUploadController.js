const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const pdf = require('pdf-parse');
const { pool } = require('../utils/db');

// Configurar multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /pdf|jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten archivos PDF e imágenes'));
    }
}).single('file');

class DeliveryNoteUploadController {
    static async uploadFile(req, res) {
        try {
            upload(req, res, async function (err) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err.message
                    });
                }

                if (!req.file) {
                    return res.status(400).json({
                        success: false,
                        error: 'No se ha subido ningún archivo'
                    });
                }

                try {
                    let extractedData = {
                        supplier_name: '',
                        delivery_date: new Date().toISOString().split('T')[0],
                        items: []
                    };

                    // Por ahora, solo devolvemos la estructura vacía para que puedas
                    // rellenar los datos manualmente en la interfaz
                    // TODO: Implementar OCR para extraer datos de imágenes automáticamente

                    // Limpiar el archivo temporal
                    await fs.unlink(req.file.path);

                    res.json({
                        success: true,
                        data: extractedData
                    });
                } catch (error) {
                    console.error('Error processing file:', error);
                    // Intentar limpiar el archivo en caso de error
                    try {
                        await fs.unlink(req.file.path);
                    } catch (unlinkError) {
                        console.error('Error deleting temporary file:', unlinkError);
                    }

                    res.status(500).json({
                        success: false,
                        error: 'Error al procesar el archivo'
                    });
                }
            });
        } catch (error) {
            console.error('Error in upload:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    static async extractDataFromPDF(text) {
        const PDFParser = require('../utils/pdfParser');
        return PDFParser.parseText(text);
    }

    static async confirmDeliveryNote(req, res) {
        const connection = await pool.getConnection();
        try {
            const { supplier_name, delivery_date, items } = req.body;

            await connection.beginTransaction();

            // 1. Crear o obtener el proveedor
            const [supplierResult] = await connection.query(
                'INSERT INTO suppliers (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
                [supplier_name]
            );
            const supplier_id = supplierResult.insertId;

            // 2. Crear el albarán
            const [deliveryNoteResult] = await connection.query(
                'INSERT INTO delivery_notes (supplier_id, delivery_date) VALUES (?, ?)',
                [supplier_id, delivery_date]
            );
            const delivery_note_id = deliveryNoteResult.insertId;

            // 3. Crear los items del albarán
            for (const item of items) {
                // Obtener o crear el producto
                const [productResult] = await connection.query(
                    'INSERT INTO products (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
                    [item.product_name]
                );
                const product_id = productResult.insertId;

                // Crear el item del albarán
                await connection.query(
                    `INSERT INTO delivery_note_items 
                    (delivery_note_id, product_id, quantity, remaining_quantity, unit_type, 
                    batch_number, expiry_date, price_per_unit, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'full')`,
                    [
                        delivery_note_id,
                        product_id,
                        item.quantity,
                        item.quantity,
                        item.unit,
                        item.batch_number,
                        item.expiry_date,
                        item.price
                    ]
                );
            }

            await connection.commit();

            res.json({
                success: true,
                data: {
                    delivery_note_id
                }
            });
        } catch (error) {
            await connection.rollback();
            console.error('Error confirming delivery note:', error);
            res.status(500).json({
                success: false,
                error: 'Error al confirmar el albarán'
            });
        } finally {
            connection.release();
        }
    }
}

module.exports = DeliveryNoteUploadController;
