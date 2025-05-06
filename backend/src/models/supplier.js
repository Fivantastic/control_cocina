import { pool } from '../utils/db.js';

class Supplier {
    static async getAll(clinicId = 1) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM suppliers
                WHERE clinic_id = ?
                ORDER BY name
            `, [clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id, clinicId = 1) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM suppliers
                WHERE id = ? AND clinic_id = ?
            `, [id, clinicId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(supplierData, clinicId = 1) {
        try {
            const {
                code,
                name,
                tax_id,
                address,
                contact_phone,
                type,
                delivery_schedule,
                temperature_requirements,
                sales_rep_name,
                sales_rep_id
            } = supplierData;

            const [result] = await pool.query(`
                INSERT INTO suppliers (
                    code,
                    name,
                    tax_id,
                    address,
                    contact_phone,
                    type,
                    delivery_schedule,
                    temperature_requirements,
                    sales_rep_name,
                    sales_rep_id,
                    clinic_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                code,
                name,
                tax_id,
                address,
                contact_phone,
                type,
                delivery_schedule,
                temperature_requirements,
                sales_rep_name,
                sales_rep_id,
                clinicId
            ]);

            return { id: result.insertId, ...supplierData };
        } catch (error) {
            throw error;
        }
    }

    static async update(id, supplierData, clinicId = 1) {
        try {
            const {
                code,
                name,
                tax_id,
                address,
                contact_phone,
                type,
                delivery_schedule,
                temperature_requirements,
                sales_rep_name,
                sales_rep_id
            } = supplierData;

            await pool.query(`
                UPDATE suppliers
                SET code = ?,
                    name = ?,
                    tax_id = ?,
                    address = ?,
                    contact_phone = ?,
                    type = ?,
                    delivery_schedule = ?,
                    temperature_requirements = ?,
                    sales_rep_name = ?,
                    sales_rep_id = ?
                WHERE id = ? AND clinic_id = ?
            `, [
                code,
                name,
                tax_id,
                address,
                contact_phone,
                type,
                delivery_schedule,
                temperature_requirements,
                sales_rep_name,
                sales_rep_id,
                id,
                clinicId
            ]);

            return { id, ...supplierData };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id, clinicId = 1) {
        try {
            await pool.query('DELETE FROM suppliers WHERE id = ? AND clinic_id = ?', [id, clinicId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default Supplier;
