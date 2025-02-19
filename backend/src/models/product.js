const { pool } = require('../utils/db');

class Product {
    static async getAll() {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    p.*,
                    pt.name as type_name,
                    pu.name as purchase_unit_name,
                    pu.abbreviation as purchase_unit_abbreviation,
                    bu.name as base_unit_name,
                    bu.abbreviation as base_unit_abbreviation
                FROM products p
                JOIN product_types pt ON p.type_id = pt.id
                JOIN units pu ON p.purchase_unit_id = pu.id
                JOIN units bu ON p.base_unit_id = bu.id
                ORDER BY p.name
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    p.*,
                    pt.name as type_name,
                    pu.name as purchase_unit_name,
                    pu.abbreviation as purchase_unit_abbreviation,
                    bu.name as base_unit_name,
                    bu.abbreviation as base_unit_abbreviation
                FROM products p
                JOIN product_types pt ON p.type_id = pt.id
                JOIN units pu ON p.purchase_unit_id = pu.id
                JOIN units bu ON p.base_unit_id = bu.id
                WHERE p.id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getByType(typeId) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    p.*,
                    pt.name as type_name,
                    pu.name as purchase_unit_name,
                    pu.abbreviation as purchase_unit_abbreviation,
                    bu.name as base_unit_name,
                    bu.abbreviation as base_unit_abbreviation
                FROM products p
                JOIN product_types pt ON p.type_id = pt.id
                JOIN units pu ON p.purchase_unit_id = pu.id
                JOIN units bu ON p.base_unit_id = bu.id
                WHERE p.type_id = ?
                ORDER BY p.name
            `, [typeId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateStock(id, actualStock) {
        try {
            const [result] = await pool.query(`
                UPDATE products 
                SET 
                    actual_stock = ?,
                    last_count_date = CURRENT_DATE(),
                    updated_at = NOW()
                WHERE id = ?
            `, [actualStock, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updateMinimumStock(id, minimumStock) {
        try {
            const [result] = await pool.query(`
                UPDATE products 
                SET 
                    minimum_stock = ?,
                    updated_at = NOW()
                WHERE id = ?
            `, [minimumStock, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getLowStock() {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    p.*,
                    pt.name as type_name,
                    pu.name as purchase_unit_name,
                    pu.abbreviation as purchase_unit_abbreviation,
                    bu.name as base_unit_name,
                    bu.abbreviation as base_unit_abbreviation
                FROM products p
                JOIN product_types pt ON p.type_id = pt.id
                JOIN units pu ON p.purchase_unit_id = pu.id
                JOIN units bu ON p.base_unit_id = bu.id
                WHERE p.actual_stock <= p.minimum_stock
                ORDER BY p.name
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async search(query) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                    p.*,
                    pt.name as type_name,
                    pu.name as purchase_unit_name,
                    pu.abbreviation as purchase_unit_abbreviation,
                    bu.name as base_unit_name,
                    bu.abbreviation as base_unit_abbreviation
                FROM products p
                JOIN product_types pt ON p.type_id = pt.id
                JOIN units pu ON p.purchase_unit_id = pu.id
                JOIN units bu ON p.base_unit_id = bu.id
                WHERE p.name LIKE ? OR p.code LIKE ?
                ORDER BY p.name
            `, [`%${query}%`, `%${query}%`]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Product;
