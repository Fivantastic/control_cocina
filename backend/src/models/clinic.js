import { pool } from '../utils/db.js';

class Clinic {
    static async getAll() {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM clinics ORDER BY name
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM clinics WHERE id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getByCode(code) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM clinics WHERE code = ?
            `, [code]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(clinicData) {
        try {
            const { name, code, address, contact_info } = clinicData;
            const [result] = await pool.query(`
                INSERT INTO clinics (name, code, address, contact_info)
                VALUES (?, ?, ?, ?)
            `, [name, code, address, contact_info]);
            
            return { id: result.insertId, ...clinicData };
        } catch (error) {
            throw error;
        }
    }

    static async update(id, clinicData) {
        try {
            const { name, code, address, contact_info } = clinicData;
            await pool.query(`
                UPDATE clinics
                SET name = ?, code = ?, address = ?, contact_info = ?
                WHERE id = ?
            `, [name, code, address, contact_info, id]);
            
            return { id, ...clinicData };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            // Verificar si hay datos asociados a esta clínica
            const [products] = await pool.query(`SELECT COUNT(*) as count FROM products WHERE clinic_id = ?`, [id]);
            if (products[0].count > 0) {
                throw new Error('No se puede eliminar la clínica porque tiene productos asociados');
            }
            
            await pool.query(`DELETE FROM clinics WHERE id = ?`, [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default Clinic;
