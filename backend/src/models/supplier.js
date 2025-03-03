import { pool } from '../utils/db.js';

class Supplier {
    static async getAll() {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM suppliers
                ORDER BY name
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM suppliers
                WHERE id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(supplierData) {
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
                    sales_rep_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                sales_rep_id
            ]);

            return { id: result.insertId, ...supplierData };
        } catch (error) {
            throw error;
        }
    }

    static async update(id, supplierData) {
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
                WHERE id = ?
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
                id
            ]);

            return { id, ...supplierData };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default Supplier;
