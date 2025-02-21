const { pool } = require('../utils/db');

class StockMovement {
    static async create({
        delivery_note_item_id,
        dish_product_id,
        movement_type,
        quantity,
        remaining_quantity,
        notes,
        created_by
    }) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Create stock movement
            const [result] = await connection.query(
                `INSERT INTO stock_movements 
                (delivery_note_item_id, dish_product_id, movement_type, quantity, 
                remaining_quantity, notes, created_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [delivery_note_item_id, dish_product_id, movement_type, quantity, 
                remaining_quantity, notes, created_by]
            );

            // Update delivery_note_items remaining quantity and status
            await connection.query(
                `UPDATE delivery_note_items 
                SET remaining_quantity = ?,
                    status = CASE 
                        WHEN ? = 0 THEN 'empty'
                        WHEN ? < quantity THEN 'partial'
                        ELSE 'full'
                    END
                WHERE id = ?`,
                [remaining_quantity, remaining_quantity, remaining_quantity, delivery_note_item_id]
            );

            await connection.commit();
            return result.insertId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getByDeliveryNoteItem(delivery_note_item_id) {
        try {
            const [rows] = await pool.query(
                `SELECT sm.*, 
                    dp.dish_id,
                    d.name as dish_name
                FROM stock_movements sm
                LEFT JOIN dish_products dp ON sm.dish_product_id = dp.id
                LEFT JOIN dishes d ON dp.dish_id = d.id
                WHERE sm.delivery_note_item_id = ?
                ORDER BY sm.movement_date DESC`,
                [delivery_note_item_id]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getStockStatus(product_id) {
        try {
            const [rows] = await pool.query(
                `SELECT 
                    dni.*,
                    dn.delivery_date,
                    s.name as supplier_name
                FROM delivery_note_items dni
                JOIN delivery_notes dn ON dni.delivery_note_id = dn.id
                JOIN suppliers s ON dn.supplier_id = s.id
                WHERE dni.product_id = ?
                    AND dni.remaining_quantity > 0
                ORDER BY dni.expiry_date ASC`,
                [product_id]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = StockMovement;
