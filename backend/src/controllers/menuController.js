import Menu from '../models/menu.js';

class MenuController {
    static async getMenuByWeek(req, res) {
        try {
            const weekNumber = parseInt(req.params.weekNumber);
            
            if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 53) {
                return res.status(400).json({
                    success: false,
                    message: 'Número de semana inválido'
                });
            }

            const menuData = await Menu.getMenuByWeek(weekNumber);
            
            res.json({
                success: true,
                data: menuData
            });
        } catch (error) {
            console.error('Error in getMenuByWeek controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener el menú'
            });
        }
    }

    static async getAllMenuWeeks(req, res) {
        try {
            const weeks = await Menu.getAllMenuWeeks();
            
            res.json({
                success: true,
                data: weeks
            });
        } catch (error) {
            console.error('Error in getAllMenuWeeks controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener las semanas disponibles'
            });
        }
    }
}

export default MenuController;
