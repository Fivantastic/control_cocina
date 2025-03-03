import StockMovement from '../models/stockMovement.js';

class StockMovementController {
    static async createMovement(req, res) {
        try {
            const {
                delivery_note_item_id,
                dish_product_id,
                movement_type,
                quantity,
                remaining_quantity,
                notes
            } = req.body;

            // TODO: Get created_by from auth middleware
            const created_by = 1;

            const movementId = await StockMovement.create({
                delivery_note_item_id,
                dish_product_id,
                movement_type,
                quantity,
                remaining_quantity,
                notes,
                created_by
            });

            res.status(201).json({
                success: true,
                data: { id: movementId }
            });
        } catch (error) {
            console.error('Error creating stock movement:', error);
            res.status(500).json({
                success: false,
                error: 'Error al crear el movimiento de stock'
            });
        }
    }

    static async getMovementsByItem(req, res) {
        try {
            const { itemId } = req.params;
            const movements = await StockMovement.getByDeliveryNoteItem(itemId);
            
            res.json({
                success: true,
                data: movements
            });
        } catch (error) {
            console.error('Error getting stock movements:', error);
            res.status(500).json({
                success: false,
                error: 'Error al obtener los movimientos de stock'
            });
        }
    }

    static async getProductStock(req, res) {
        try {
            const { productId } = req.params;
            const stock = await StockMovement.getStockStatus(productId);
            
            res.json({
                success: true,
                data: stock
            });
        } catch (error) {
            console.error('Error getting product stock:', error);
            res.status(500).json({
                success: false,
                error: 'Error al obtener el stock del producto'
            });
        }
    }

    static async adjustStock(req, res) {
        try {
            const {
                delivery_note_item_id,
                quantity,
                remaining_quantity,
                notes
            } = req.body;

            // TODO: Get created_by from auth middleware
            const created_by = 1;

            const movementId = await StockMovement.create({
                delivery_note_item_id,
                movement_type: 'adjustment',
                quantity,
                remaining_quantity,
                notes,
                created_by
            });

            res.status(201).json({
                success: true,
                data: { id: movementId }
            });
        } catch (error) {
            console.error('Error adjusting stock:', error);
            res.status(500).json({
                success: false,
                error: 'Error al ajustar el stock'
            });
        }
    }
}

export default StockMovementController;
