-- Insertar solo los platos nuevos que no existan
INSERT INTO dishes (name, category, description)
SELECT 'Fajita de ternera a la mostaza', 'Segundo', 'Carne de ternera'
WHERE NOT EXISTS (SELECT 1 FROM dishes WHERE name = 'Fajita de ternera a la mostaza');

-- Obtener el ID del menú de cenas
SET @menu_id = 2;

-- Insertar relaciones menú-platos para la semana 4
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 4, 1 FROM dishes WHERE name = 'Sopa de puchero';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 4, 2 FROM dishes WHERE name = 'Tortilla de patatas y cebolla';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 4, 3 FROM dishes WHERE name = 'Tomate grill';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 4, 1 FROM dishes WHERE name = 'Tabulé';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 4, 2 FROM dishes WHERE name = 'Croquetas de jamón';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 4, 3 FROM dishes WHERE name = 'Patatas al vapor';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 4, 1 FROM dishes WHERE name = 'Arroz con verduras y surimi';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 4, 2 FROM dishes WHERE name = 'Fajita de ternera a la mostaza';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 4, 3 FROM dishes WHERE name = 'Ensalada de lechuga y tomate';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 4, 1 FROM dishes WHERE name = 'Crema de verduras';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 4, 2 FROM dishes WHERE name = 'Tortilla de patatas y cebolla';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 4, 3 FROM dishes WHERE name = 'Brócoli al limón';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 4, 1 FROM dishes WHERE name = 'Sopa de pescadilla';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 4, 2 FROM dishes WHERE name = 'Cinta de lomo al ajillo';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 4, 3 FROM dishes WHERE name = 'Judías verdes y zanahoria';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 4, 1 FROM dishes WHERE name = 'Coliflor a la gallega';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 4, 2 FROM dishes WHERE name = 'Hamburguesa de ave completa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 4, 3 FROM dishes WHERE name = 'Ensalada';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 4, 1 FROM dishes WHERE name = 'Crema de puerros';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 4, 2 FROM dishes WHERE name = 'San jacobos caseros';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 4, 3 FROM dishes WHERE name = 'Ensalada mixta';
