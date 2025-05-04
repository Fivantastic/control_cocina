import { pool } from '../utils/db.js';

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
                LEFT JOIN product_types pt ON p.type_id = pt.id
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id
                LEFT JOIN units bu ON p.base_unit_id = bu.id
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
                LEFT JOIN product_types pt ON p.type_id = pt.id
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id
                LEFT JOIN units bu ON p.base_unit_id = bu.id
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
                LEFT JOIN product_types pt ON p.type_id = pt.id
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id
                LEFT JOIN units bu ON p.base_unit_id = bu.id
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
                LEFT JOIN product_types pt ON p.type_id = pt.id
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id
                LEFT JOIN units bu ON p.base_unit_id = bu.id
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
                LEFT JOIN product_types pt ON p.type_id = pt.id
                LEFT JOIN units pu ON p.purchase_unit_id = pu.id
                LEFT JOIN units bu ON p.base_unit_id = bu.id
                WHERE p.name LIKE ? OR p.code LIKE ?
                ORDER BY p.name
            `, [`%${query}%`, `%${query}%`]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Crear un nuevo producto
     * @param {Object} productData - Datos del producto a crear
     * @returns {Object} - El producto creado con su ID
     */
    static async create(productData) {
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
                    name,
                    code,
                    type_id,
                    purchase_unit_id,
                    base_unit_id,
                    unit_quantity,
                    actual_stock,
                    minimum_stock,
                    price,
                    last_count_date,
                    notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE(), ?)
            `, [
                name,
                code || null,
                type_id || null,
                purchase_unit_id || null,
                base_unit_id || null,
                unit_quantity || null,
                actual_stock || 0,
                minimum_stock || 0,
                price || 0,
                notes || null
            ]);

            // Obtener el producto recién creado
            return this.getById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Actualizar un producto existente
     * @param {number} id - ID del producto a actualizar
     * @param {Object} productData - Datos actualizados del producto
     * @returns {Object} - El producto actualizado
     */
    static async update(id, productData) {
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

            // Construir la consulta dinámicamente basada en los campos proporcionados
            let updateFields = [];
            let updateValues = [];

            if (name !== undefined) {
                updateFields.push('name = ?');
                updateValues.push(name);
            }

            if (code !== undefined) {
                updateFields.push('code = ?');
                updateValues.push(code);
            }

            if (type_id !== undefined) {
                updateFields.push('type_id = ?');
                updateValues.push(type_id);
            }

            if (purchase_unit_id !== undefined) {
                updateFields.push('purchase_unit_id = ?');
                updateValues.push(purchase_unit_id);
            }

            if (base_unit_id !== undefined) {
                updateFields.push('base_unit_id = ?');
                updateValues.push(base_unit_id);
            }

            if (unit_quantity !== undefined) {
                updateFields.push('unit_quantity = ?');
                updateValues.push(unit_quantity);
            }

            if (actual_stock !== undefined) {
                updateFields.push('actual_stock = ?');
                updateFields.push('last_count_date = CURRENT_DATE()');
                updateValues.push(actual_stock);
            }

            if (minimum_stock !== undefined) {
                updateFields.push('minimum_stock = ?');
                updateValues.push(minimum_stock);
            }

            if (price !== undefined) {
                updateFields.push('price = ?');
                updateValues.push(price);
            }

            if (notes !== undefined) {
                updateFields.push('notes = ?');
                updateValues.push(notes);
            }

            // Siempre actualizar el timestamp
            updateFields.push('updated_at = NOW()');

            // Si no hay campos para actualizar, retornar error
            if (updateFields.length === 1) { // Solo el updated_at
                throw new Error('No se proporcionaron campos para actualizar');
            }

            // Agregar el ID al final de los valores
            updateValues.push(id);

            const [result] = await pool.query(`
                UPDATE products 
                SET ${updateFields.join(', ')}
                WHERE id = ?
            `, updateValues);

            if (result.affectedRows === 0) {
                return null;
            }

            // Obtener el producto actualizado
            return this.getById(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Eliminar un producto
     * @param {number} id - ID del producto a eliminar
     * @returns {boolean} - true si se eliminó correctamente, false si no se encontró
     */
    static async delete(id) {
        try {
            // Primero verificar si el producto está siendo utilizado en algún albarán
            const [deliveryNoteItems] = await pool.query(`
                SELECT COUNT(*) as count FROM delivery_note_items WHERE product_id = ?
            `, [id]);

            if (deliveryNoteItems[0].count > 0) {
                throw new Error('No se puede eliminar el producto porque está siendo utilizado en albaranes');
            }

            // Verificar si el producto está siendo utilizado en recetas
            const [dishProducts] = await pool.query(`
                SELECT COUNT(*) as count FROM dish_products WHERE product_id = ?
            `, [id]);

            if (dishProducts[0].count > 0) {
                throw new Error('No se puede eliminar el producto porque está siendo utilizado en recetas');
            }

            // Verificar si hay movimientos de stock para este producto
            const [stockMovements] = await pool.query(`
                SELECT COUNT(*) as count FROM stock_movements sm
                JOIN delivery_note_items dni ON sm.delivery_note_item_id = dni.id
                WHERE dni.product_id = ?
            `, [id]);

            if (stockMovements[0].count > 0) {
                throw new Error('No se puede eliminar el producto porque tiene movimientos de stock asociados');
            }

            // Si no hay dependencias, proceder con la eliminación
            const [result] = await pool.query(`
                DELETE FROM products WHERE id = ?
            `, [id]);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtener todos los tipos de producto
     * @returns {Array} - Lista de tipos de producto
     */
    static async getAllTypes() {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM product_types ORDER BY name
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtener todas las unidades de medida
     * @returns {Array} - Lista de unidades de medida
     */
    static async getAllUnits() {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM units ORDER BY name
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

export default Product;
