const pool = require('../config/database');

class Menu {
    static async getMenuByWeek(weekNumber) {
        try {
            const query = `
                SELECT 
                    m.id as menu_id,
                    m.name as menu_name,
                    d.id as dish_id,
                    d.name as dish_name,
                    d.category,
                    d.description,
                    md.day_of_week,
                    md.week_number,
                    md.dish_order
                FROM menus m
                JOIN menu_dishes md ON m.id = md.menu_id
                JOIN dishes d ON md.dish_id = d.id
                WHERE md.week_number = ?
                ORDER BY md.day_of_week, md.dish_order`;

            const [rows] = await pool.query(query, [weekNumber]);
            
            // Organizar los resultados por tipo de menú (comida/cena) y día
            const menuData = {
                lunch: Array(7).fill().map(() => ({ first: [], second: [], garnish: [] })),
                dinner: Array(7).fill().map(() => ({ first: [], second: [], garnish: [] }))
            };

            rows.forEach(row => {
                const menuType = row.menu_id === 1 ? 'lunch' : 'dinner';
                const dayIndex = row.day_of_week - 1;
                
                const dish = {
                    id: row.dish_id,
                    name: row.dish_name,
                    description: row.description
                };

                switch(row.category) {
                    case 'Primero':
                        menuData[menuType][dayIndex].first.push(dish);
                        break;
                    case 'Segundo':
                        menuData[menuType][dayIndex].second.push(dish);
                        break;
                    case 'Guarnición':
                        menuData[menuType][dayIndex].garnish.push(dish);
                        break;
                }
            });

            return menuData;
        } catch (error) {
            console.error('Error in getMenuByWeek:', error);
            throw error;
        }
    }

    static async getAllMenuWeeks() {
        try {
            const query = 'SELECT DISTINCT week_number FROM menu_dishes ORDER BY week_number';
            const [rows] = await pool.query(query);
            return rows.map(row => row.week_number);
        } catch (error) {
            console.error('Error in getAllMenuWeeks:', error);
            throw error;
        }
    }
}

module.exports = Menu;
