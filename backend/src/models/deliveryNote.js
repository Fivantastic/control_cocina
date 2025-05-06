import { pool } from '../utils/db.js';

class DeliveryNote {
    static async getAll(clinicId = 1) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dn.clinic_id = ? AND s.clinic_id = ?
                ORDER BY dn.delivery_date DESC
            `, [clinicId, clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id, clinicId = 1) {
        try {
            // Obtener el albarán
            const [noteRows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dn.id = ? AND dn.clinic_id = ?
            `, [id, clinicId]);

            if (!noteRows[0]) return null;

            // Obtener los items del albarán
            const [itemRows] = await pool.query(`
                SELECT 
                    dni.*,
                    p.name as product_name,
                    p.code as internal_product_code
                FROM delivery_note_items dni
                LEFT JOIN products p ON dni.product_id = p.id
                WHERE dni.delivery_note_id = ? AND (p.clinic_id = ? OR p.clinic_id IS NULL)
            `, [id, clinicId]);

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
                tax_summary,
                clinic_id
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
                notes,
                clinic_id
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
            return await this.getById(deliveryNoteId, clinic_id);

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
                tax_summary,
                clinic_id
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
                notes,
                clinic_id
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
            return await this.getById(id, clinic_id);

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async delete(id, clinicId = 1) {
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
            await connection.query('DELETE FROM delivery_notes WHERE id = ? AND clinic_id = ?', [id, clinicId]);

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
    static async getBySupplier(supplierId, clinicId = 1) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dn.supplier_id = ? AND dn.clinic_id = ? AND s.clinic_id = ?
                ORDER BY dn.delivery_date DESC
            `, [supplierId, clinicId, clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getByDateRange(startDate, endDate, clinicId = 1) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    dn.*,
                    s.name as supplier_name,
                    s.type as supplier_type
                FROM delivery_notes dn
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dn.delivery_date BETWEEN ? AND ? AND dn.clinic_id = ? AND s.clinic_id = ?
                ORDER BY dn.delivery_date DESC
            `, [startDate, endDate, clinicId, clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

export default DeliveryNote;
