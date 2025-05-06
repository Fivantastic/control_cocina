import { pool } from '../utils/db.js';

class Menu {
    static async getMenuByWeek(weekNumber, clinicId = 1) {
        try {
            console.log(`Getting menu for week ${weekNumber} and clinic ${clinicId}`);
            
            // Primero verificamos si hay menús para esta semana en la clínica seleccionada
            const checkQuery = `
                SELECT COUNT(*) as menuCount
                FROM menus m
                JOIN menu_dishes md ON m.id = md.menu_id
                WHERE md.week_number = ? AND m.clinic_id = ?
            `;
            
            const [checkResult] = await pool.query(checkQuery, [weekNumber, clinicId]);
            console.log('Menu count check result:', checkResult[0]);
            
            // Si no hay menús para esta clínica, devolvemos un objeto vacío
            if (checkResult[0].menuCount === 0) {
                console.log(`No menus found for week ${weekNumber} in clinic ${clinicId}`);
                return {
                    lunch: Array(7).fill().map(() => ({ first: [], second: [], garnish: [] })),
                    dinner: Array(7).fill().map(() => ({ first: [], second: [], garnish: [] }))
                };
            }
            
            const query = `
                SELECT 
                    m.id as menu_id,
                    m.name as menu_name,
                    m.service_type,
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
                AND m.clinic_id = ?
                ORDER BY md.day_of_week, md.dish_order`;

            const [rows] = await pool.query(query, [weekNumber, clinicId]);
            console.log(`Found ${rows.length} menu items for week ${weekNumber} in clinic ${clinicId}`);
            
            // Organizar los resultados por tipo de menú (comida/cena) y día
            const menuData = {
                lunch: Array(7).fill().map(() => ({ first: [], second: [], garnish: [] })),
                dinner: Array(7).fill().map(() => ({ first: [], second: [], garnish: [] }))
            };

            rows.forEach(row => {
                // Usar el campo service_type para determinar si es comida o cena
                const menuType = row.service_type === 'comida' ? 'lunch' : 'dinner';
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
            console.error('Error in getMenuByWeek model:', error);
            throw error;
        }
    }

    static async getAllMenuWeeks(clinicId = 1) {
        try {
            console.log(`Getting all menu weeks for clinic ${clinicId}`);
            
            const query = `
                SELECT DISTINCT md.week_number 
                FROM menu_dishes md
                JOIN menus m ON md.menu_id = m.id
                WHERE m.clinic_id = ?
                ORDER BY md.week_number`;
            
            const [rows] = await pool.query(query, [clinicId]);
            console.log(`Found ${rows.length} menu weeks for clinic ${clinicId}:`, rows.map(r => r.week_number));
            
            return rows.map(row => row.week_number);
        } catch (error) {
            console.error('Error in getAllMenuWeeks model:', error);
            throw error;
        }
    }
}

export default Menu;
