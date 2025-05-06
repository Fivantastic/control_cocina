import { pool } from '../utils/db.js';

class Product {
    static async getAll(clinicId = 1) {
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
                LEFT JOIN product_types pt ON p.type_id = pt.id AND pt.clinic_id = ?
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id AND pu.clinic_id = ?
                LEFT JOIN units bu ON p.base_unit_id = bu.id AND bu.clinic_id = ?
                WHERE p.clinic_id = ?
                ORDER BY p.name
            `, [clinicId, clinicId, clinicId, clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id, clinicId = 1) {
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
                LEFT JOIN product_types pt ON p.type_id = pt.id AND pt.clinic_id = ?
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id AND pu.clinic_id = ?
                LEFT JOIN units bu ON p.base_unit_id = bu.id AND bu.clinic_id = ?
                WHERE p.id = ? AND p.clinic_id = ?
            `, [clinicId, clinicId, clinicId, id, clinicId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getByType(typeId, clinicId = 1) {
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
                LEFT JOIN product_types pt ON p.type_id = pt.id AND pt.clinic_id = ?
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id AND pu.clinic_id = ?
                LEFT JOIN units bu ON p.base_unit_id = bu.id AND bu.clinic_id = ?
                WHERE p.type_id = ? AND p.clinic_id = ?
                ORDER BY p.name
            `, [clinicId, clinicId, clinicId, typeId, clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async search(query, clinicId = 1) {
        try {
            const searchTerm = `%${query}%`;
            const [rows] = await pool.query(`
                SELECT 
                    p.*,
                    pt.name as type_name,
                    pu.name as purchase_unit_name,
                    pu.abbreviation as purchase_unit_abbreviation,
                    bu.name as base_unit_name,
                    bu.abbreviation as base_unit_abbreviation
                FROM products p
                LEFT JOIN product_types pt ON p.type_id = pt.id AND pt.clinic_id = ?
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id AND pu.clinic_id = ?
                LEFT JOIN units bu ON p.base_unit_id = bu.id AND bu.clinic_id = ?
                WHERE (p.name LIKE ? OR p.code LIKE ?) AND p.clinic_id = ?
                ORDER BY p.name
            `, [clinicId, clinicId, clinicId, searchTerm, searchTerm, clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getLowStock(clinicId = 1) {
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
                LEFT JOIN product_types pt ON p.type_id = pt.id AND pt.clinic_id = ?
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id AND pu.clinic_id = ?
                LEFT JOIN units bu ON p.base_unit_id = bu.id AND bu.clinic_id = ?
                WHERE p.actual_stock <= p.minimum_stock AND p.clinic_id = ?
                ORDER BY p.name
            `, [clinicId, clinicId, clinicId, clinicId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async create(productData, clinicId = 1) {
        try {
            const {
                name,
                code,
                type_id,
                purchase_unit_id,
                base_unit_id,
                unit_quantity,
                actual_stock,
                minimum_stock,
                price,
                notes
            } = productData;

            const [result] = await pool.query(`
                INSERT INTO products (
                    name, code, type_id, purchase_unit_id, base_unit_id, 
                    unit_quantity, actual_stock, minimum_stock, price, notes, clinic_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                name, code, type_id, purchase_unit_id, base_unit_id, 
                unit_quantity, actual_stock, minimum_stock, price, notes, clinicId
            ]);

            return { id: result.insertId, ...productData, clinic_id: clinicId };
        } catch (error) {
            throw error;
        }
    }

    static async update(id, productData, clinicId = 1) {
        try {
            const {
                name,
                code,
                type_id,
                purchase_unit_id,
                base_unit_id,
                unit_quantity,
                actual_stock,
                minimum_stock,
                price,
                notes
            } = productData;

            await pool.query(`
                UPDATE products 
                SET name = ?, code = ?, type_id = ?, purchase_unit_id = ?, 
                    base_unit_id = ?, unit_quantity = ?, actual_stock = ?, 
                    minimum_stock = ?, price = ?, notes = ?
                WHERE id = ? AND clinic_id = ?
            `, [
                name, code, type_id, purchase_unit_id, base_unit_id, 
                unit_quantity, actual_stock, minimum_stock, price, notes, id, clinicId
            ]);

            return { id, ...productData, clinic_id: clinicId };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id, clinicId = 1) {
        try {
            await pool.query('DELETE FROM products WHERE id = ? AND clinic_id = ?', [id, clinicId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async updateStock(id, actualStock, clinicId = 1) {
        try {
            await pool.query(
                'UPDATE products SET actual_stock = ? WHERE id = ? AND clinic_id = ?',
                [actualStock, id, clinicId]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async updateMinimumStock(id, minimumStock, clinicId = 1) {
        try {
            await pool.query(
                'UPDATE products SET minimum_stock = ? WHERE id = ? AND clinic_id = ?',
                [minimumStock, id, clinicId]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async getAllProductTypes(clinicId = 1) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM product_types WHERE clinic_id = ? ORDER BY name',
                [clinicId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getAllUnits(clinicId = 1) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM units WHERE clinic_id = ? ORDER BY name',
                [clinicId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

export default Product;
