import MenuStock from '../models/menuStock.js';

class MenuStockController {
    static async getMenuStockNeeds(req, res) {
        try {
            const { weekNumber } = req.params;
            
            const stockData = await MenuStock.calculateMenuStockNeeds(weekNumber);
            
            // Agrupar las necesidades por día y tipo de menú
            const groupedNeeds = stockData.stockNeeds.reduce((acc, need) => {
                const key = `${need.day_of_week}-${need.menu_type}`;
                if (!acc[key]) {
                    acc[key] = {
                        day: need.day_of_week,
                        menu_type: need.menu_type,
                        dishes: {}
                    };
                }
                if (!acc[key].dishes[need.dish_name]) {
                    acc[key].dishes[need.dish_name] = [];
                }
                acc[key].dishes[need.dish_name].push({
                    product_name: need.product_name,
                    quantity_needed: need.quantity_needed,
                    unit_name: need.unit_name,
                    product_id: need.product_id
                });
                return acc;
            }, {});

            // Calcular el stock disponible vs necesario
            const stockAnalysis = stockData.stockNeeds.map(need => {
                const availableStock = stockData.stockAvailable
                    .filter(stock => stock.product_id === need.product_id)
                    .reduce((total, stock) => total + stock.remaining_quantity, 0);

                return {
                    product_id: need.product_id,
                    product_name: need.product_name,
                    total_needed: need.quantity_needed,
                    available: availableStock,
                    status: availableStock >= need.quantity_needed ? 'sufficient' : 'insufficient',
                    unit_name: need.unit_name
                };
            });

            res.json({
                success: true,
                data: {
                    weekNumber,
                    menuNeeds: groupedNeeds,
                    stockAnalysis: stockAnalysis
                }
            });
        } catch (error) {
            console.error('Error calculating menu stock needs:', error);
            res.status(500).json({
                success: false,
                error: 'Error al calcular las necesidades de stock del menú'
            });
        }
    }

    static async applyMenuStock(req, res) {
        try {
            const { weekNumber } = req.params;
            const { stockUsage } = req.body;

            // Validar que el stockUsage tenga el formato correcto
            if (!Array.isArray(stockUsage)) {
                return res.status(400).json({
                    success: false,
                    error: 'El formato de uso de stock no es válido'
                });
            }

            // Validar cada elemento del stockUsage
            for (const usage of stockUsage) {
                if (!usage.delivery_note_item_id || !usage.quantity || !usage.remaining_quantity) {
                    return res.status(400).json({
                        success: false,
                        error: 'Faltan datos requeridos en el uso de stock'
                    });
                }
            }

            await MenuStock.applyMenuStockUsage(weekNumber, stockUsage);

            res.json({
                success: true,
                message: `Stock actualizado para el menú de la semana ${weekNumber}`
            });
        } catch (error) {
            console.error('Error applying menu stock:', error);
            res.status(500).json({
                success: false,
                error: 'Error al aplicar el uso de stock del menú'
            });
        }
    }
}

export default MenuStockController;
