-- Insertar primeros platos
INSERT INTO dishes (name, category, description) VALUES
('Ensalada de arroz con manzana y surimi', 'Primero', 'Ensalada'),
('Ensalada de pasta con jamón York', 'Primero', 'Ensalada'),
('Ensalada completa', 'Primero', 'Ensalada'),
('Acelgas rehogadas', 'Primero', 'Verdura'),
('Sopa Minestrone', 'Primero', 'Sopa'),
('Crema de Calabaza y puerro', 'Primero', 'Crema'),
('Sopa Hortelana', 'Primero', 'Sopa');

-- Insertar segundos platos
INSERT INTO dishes (name, category, description) VALUES
('Huevos revueltos', 'Segundo', 'Huevos'),
('Bacalao horno en salsa', 'Segundo', 'Pescado'),
('Pinchitos de pollo adobados', 'Segundo', 'Carne de pollo'),
('Croquetas de Pollo', 'Segundo', 'Carne de pollo'),
('Hamburguesa de pollo completa', 'Segundo', 'Carne de pollo'),
('Merluza a las finas hierbas', 'Segundo', 'Pescado'),
('Pizza de jamón york y champiñones', 'Segundo', 'Pizza');

-- Insertar guarniciones
INSERT INTO dishes (name, category, description) VALUES
('Ensalada de lechuga y tomate', 'Guarnición', 'Ensalada'),
('Judías verdes Rehogadas', 'Guarnición', 'Verdura'),
('Guisantes salteados', 'Guarnición', 'Verdura'),
('Ensaladilla rusa', 'Guarnición', 'Ensalada'),
('Patatas hervidas al laurel', 'Guarnición', 'Patatas'),
('Ensalada de tomate', 'Guarnición', 'Ensalada');

-- Obtener el ID del menú de cenas
SET @menu_id = 2;

-- Insertar relaciones menú-platos para la semana 1
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 1, 1 FROM dishes WHERE name = 'Ensalada de arroz con manzana y surimi';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 1, 2 FROM dishes WHERE name = 'Huevos revueltos';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 1, 3 FROM dishes WHERE name = 'Ensalada de lechuga y tomate';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 1, 1 FROM dishes WHERE name = 'Ensalada de pasta con jamón York';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 1, 2 FROM dishes WHERE name = 'Bacalao horno en salsa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 1, 3 FROM dishes WHERE name = 'Judías verdes Rehogadas';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 1, 1 FROM dishes WHERE name = 'Ensalada completa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 1, 2 FROM dishes WHERE name = 'Pinchitos de pollo adobados';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 1, 3 FROM dishes WHERE name = 'Guisantes salteados';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 1, 1 FROM dishes WHERE name = 'Acelgas rehogadas';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 1, 2 FROM dishes WHERE name = 'Croquetas de Pollo';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 1, 3 FROM dishes WHERE name = 'Ensaladilla rusa';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 1, 1 FROM dishes WHERE name = 'Sopa Minestrone';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 1, 2 FROM dishes WHERE name = 'Hamburguesa de pollo completa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 1, 3 FROM dishes WHERE name = 'Patatas hervidas al laurel';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 1, 1 FROM dishes WHERE name = 'Crema de Calabaza y puerro';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 1, 2 FROM dishes WHERE name = 'Merluza a las finas hierbas';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 1, 3 FROM dishes WHERE name = 'Ensalada de tomate';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 1, 1 FROM dishes WHERE name = 'Sopa Hortelana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 1, 2 FROM dishes WHERE name = 'Pizza de jamón york y champiñones';
