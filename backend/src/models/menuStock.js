const { pool } = require('../utils/db');

class MenuStock {
    static async calculateMenuStockNeeds(weekNumber) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // 1. Obtener todos los platos del menú de la semana
            const [menuDishes] = await connection.query(`
                SELECT 
                    md.id as menu_dish_id,
                    md.dish_id,
                    md.day_of_week,
                    m.id as menu_id,
                    m.name as menu_name,
                    d.name as dish_name,
                    d.category
                FROM menu_dishes md
                JOIN menus m ON md.menu_id = m.id
                JOIN dishes d ON md.dish_id = d.id
                WHERE md.week_number = ?
            `, [weekNumber]);

            // 2. Obtener el stock disponible para todos los productos
            const [stockAvailable] = await connection.query(`
                SELECT 
                    dni.product_id,
                    SUM(dni.remaining_quantity) as available_quantity
                FROM delivery_note_items dni
                WHERE dni.remaining_quantity > 0
                GROUP BY dni.product_id
            `);

            // 3. Obtener los productos necesarios para cada plato
            const stockNeeds = [];
            for (const menuDish of menuDishes) {
                const [products] = await connection.query(`
                    SELECT 
                        dp.product_id,
                        dp.quantity as recipe_quantity,
                        dp.unit_id,
                        p.name as product_name,
                        u.name as unit_name
                    FROM dish_products dp
                    JOIN products p ON dp.product_id = p.id
                    JOIN units u ON dp.unit_id = u.id
                    WHERE dp.dish_id = ?
                `, [menuDish.dish_id]);

                for (const product of products) {
                    stockNeeds.push({
                        menu_dish_id: menuDish.menu_dish_id,
                        product_id: product.product_id,
                        quantity_needed: product.recipe_quantity,
                        unit_id: product.unit_id,
                        day_of_week: menuDish.day_of_week,
                        menu_type: menuDish.menu_id === 1 ? 'lunch' : 'dinner',
                        dish_name: menuDish.dish_name,
                        product_name: product.product_name,
                        unit_name: product.unit_name
                    });
                }
            }

            // 3. Obtener el stock disponible detallado para cada producto
            const stockDetails = [];
            const uniqueProductIds = [...new Set(stockNeeds.map(need => need.product_id))];
            
            for (const productId of uniqueProductIds) {
                const [items] = await connection.query(`
                    SELECT 
                        dni.id as delivery_note_item_id,
                        dni.product_id,
                        dni.remaining_quantity,
                        dni.unit_type,
                        dni.batch_number,
                        dni.expiry_date
                    FROM delivery_note_items dni
                    WHERE dni.product_id = ?
                        AND dni.remaining_quantity > 0
                        AND dni.status != 'empty'
                    ORDER BY dni.expiry_date ASC
                `, [productId]);
                
                stockDetails.push(...items);
            }

            await connection.commit();
            
            return {
                stockNeeds,
                stockAvailable: stockDetails
            };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async applyMenuStockUsage(weekNumber, stockUsage) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            for (const usage of stockUsage) {
                // Crear el movimiento de stock
                await connection.query(`
                    INSERT INTO stock_movements (
                        delivery_note_item_id,
                        dish_product_id,
                        movement_type,
                        quantity,
                        remaining_quantity,
                        notes,
                        created_by
                    ) VALUES (?, ?, 'out', ?, ?, ?, ?)
                `, [
                    usage.delivery_note_item_id,
                    usage.dish_product_id,
                    usage.quantity,
                    usage.remaining_quantity,
                    `Usado en menú semana ${weekNumber} - ${usage.dish_name}`,
                    1 // TODO: Obtener el usuario actual
                ]);

                // Actualizar el stock restante
                await connection.query(`
                    UPDATE delivery_note_items
                    SET remaining_quantity = ?,
                        status = CASE 
                            WHEN ? = 0 THEN 'empty'
                            WHEN ? < quantity THEN 'partial'
                            ELSE 'full'
                        END
                    WHERE id = ?
                `, [
                    usage.remaining_quantity,
                    usage.remaining_quantity,
                    usage.remaining_quantity,
                    usage.delivery_note_item_id
                ]);
            }

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = MenuStock;
