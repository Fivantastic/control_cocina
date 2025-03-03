import { pool } from '../utils/db.js';

class DeliveryNote {
    static async getAll() {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                ORDER BY dn.delivery_date DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            // Obtener el albarán
            const [noteRows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dn.id = ?
            `, [id]);

            if (!noteRows[0]) return null;

            // Obtener los items del albarán
            const [itemRows] = await pool.query(`
                SELECT 
                    dni.*,
                    p.name as product_name,
                    p.code as internal_product_code
                FROM delivery_note_items dni
                LEFT JOIN products p ON dni.product_id = p.id
                WHERE dni.delivery_note_id = ?
            `, [id]);

            // Obtener el resumen de impuestos
            const [taxRows] = await pool.query(`
                SELECT *
                FROM tax_summary
                WHERE delivery_note_id = ?
            `, [id]);

            // Combinar toda la información
            return {
                ...noteRows[0],
                items: itemRows,
                tax_summary: taxRows
            };
        } catch (error) {
            throw error;
        }
    }

    static async create(deliveryNoteData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Insertar el albarán
            const {
                supplier_id,
                supplier_delivery_note_number,
                external_reference,
                expedition_number,
                client_number,
                delivery_date,
                delivery_location,
                total_packages,
                total_weight,
                temperature_zone,
                delivery_schedule,
                payment_method,
                sales_rep_id,
                total_net_amount,
                total_tax_amount,
                total_mer_amount,
                total_amount,
                notes,
                items,
                tax_summary
            } = deliveryNoteData;

            const [noteResult] = await connection.query(`
                INSERT INTO delivery_notes SET ?
            `, [{
                supplier_id,
                supplier_delivery_note_number,
                external_reference,
                expedition_number,
                client_number,
                delivery_date,
                delivery_location,
                total_packages,
                total_weight,
                temperature_zone,
                delivery_schedule,
                payment_method,
                sales_rep_id,
                total_net_amount,
                total_tax_amount,
                total_mer_amount,
                total_amount,
                notes
            }]);

            const deliveryNoteId = noteResult.insertId;

            // Insertar los items
            if (items && items.length > 0) {
                for (const item of items) {
                    await connection.query(`
                        INSERT INTO delivery_note_items SET ?
                    `, { ...item, delivery_note_id: deliveryNoteId });
                }
            }

            // Insertar el resumen de impuestos
            if (tax_summary && tax_summary.length > 0) {
                for (const tax of tax_summary) {
                    await connection.query(`
                        INSERT INTO tax_summary SET ?
                    `, { ...tax, delivery_note_id: deliveryNoteId });
                }
            }

            await connection.commit();
            return await this.getById(deliveryNoteId);

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async update(id, deliveryNoteData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Actualizar el albarán principal
            const {
                supplier_id,
                supplier_delivery_note_number,
                external_reference,
                expedition_number,
                client_number,
                delivery_date,
                delivery_location,
                total_packages,
                total_weight,
                temperature_zone,
                delivery_schedule,
                payment_method,
                sales_rep_id,
                total_net_amount,
                total_tax_amount,
                total_mer_amount,
                total_amount,
                notes,
                items,
                tax_summary
            } = deliveryNoteData;

            await connection.query(`
                UPDATE delivery_notes SET ? WHERE id = ?
            `, [{
                supplier_id,
                supplier_delivery_note_number,
                external_reference,
                expedition_number,
                client_number,
                delivery_date,
                delivery_location,
                total_packages,
                total_weight,
                temperature_zone,
                delivery_schedule,
                payment_method,
                sales_rep_id,
                total_net_amount,
                total_tax_amount,
                total_mer_amount,
                total_amount,
                notes
            }, id]);

            // Actualizar items
            if (items && items.length > 0) {
                // Eliminar items existentes
                await connection.query('DELETE FROM delivery_note_items WHERE delivery_note_id = ?', [id]);
                
                // Insertar nuevos items
                for (const item of items) {
                    await connection.query(`
                        INSERT INTO delivery_note_items SET ?
                    `, { ...item, delivery_note_id: id });
                }
            }

            // Actualizar resumen de impuestos
            if (tax_summary && tax_summary.length > 0) {
                // Eliminar resumen existente
                await connection.query('DELETE FROM tax_summary WHERE delivery_note_id = ?', [id]);
                
                // Insertar nuevo resumen
                for (const tax of tax_summary) {
                    await connection.query(`
                        INSERT INTO tax_summary SET ?
                    `, { ...tax, delivery_note_id: id });
                }
            }

            await connection.commit();
            return await this.getById(id);

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async delete(id) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Eliminar items relacionados
            await connection.query('DELETE FROM delivery_note_items WHERE delivery_note_id = ?', [id]);
            
            // Eliminar resumen de impuestos
            await connection.query('DELETE FROM tax_summary WHERE delivery_note_id = ?', [id]);
            
            // Eliminar registros de temperatura
            await connection.query('DELETE FROM temperature_logs WHERE delivery_note_id = ?', [id]);
            
            // Eliminar el albarán
            await connection.query('DELETE FROM delivery_notes WHERE id = ?', [id]);

            await connection.commit();
            return true;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    // Métodos adicionales específicos
    static async getBySupplier(supplierId) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dn.supplier_id = ?
                ORDER BY dn.delivery_date DESC
            `, [supplierId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getByDateRange(startDate, endDate) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dn.delivery_date BETWEEN ? AND ?
                ORDER BY dn.delivery_date DESC
            `, [startDate, endDate]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

export default DeliveryNote;
