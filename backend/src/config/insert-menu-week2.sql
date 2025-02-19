-- Insertar primeros platos
INSERT INTO dishes (name, category, description) VALUES
('Potaje de garbanzos', 'Primero', 'Legumbres'),
('Arroz caldoso con verduras', 'Primero', 'Arroz'),
('Alubias blancas con verduras', 'Primero', 'Legumbres'),
('Fideos a la marinera', 'Primero', 'Pasta'),
('Macarrones Napolitana', 'Primero', 'Pasta'),
('Patatas a la Navarra', 'Primero', 'Patatas');

-- Insertar segundos platos
INSERT INTO dishes (name, category, description) VALUES
('Lomo de adobado en salsa', 'Segundo', 'Carne de cerdo'),
('Albóndigas de ave en salsa de tomate', 'Segundo', 'Carne de ave'),
('Buñuelos de bacalao', 'Segundo', 'Pescado'),
('Magro de cerdo en salsa de tomate', 'Segundo', 'Carne de cerdo'),
('Chuleta de rape a la siciliana', 'Segundo', 'Pescado'),
('Tortilla Francesa', 'Segundo', 'Huevos'),
('Paella mixta con pollo', 'Segundo', 'Arroz con carne');

-- Insertar guarniciones
INSERT INTO dishes (name, category, description) VALUES
('Ensalada de lechuga, cebolla y zanahoria', 'Guarnición', 'Ensalada'),
('Ensaladilla al vapor', 'Guarnición', 'Verduras'),
('Arroz pilaf', 'Guarnición', 'Arroz'),
('Brócoli al limón', 'Guarnición', 'Verdura'),
('Calabacín salteado con cebolla y tomillo', 'Guarnición', 'Verdura');

-- Obtener el ID del menú de comidas
SET @menu_id = 1;

-- Insertar relaciones menú-platos para la semana 2
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 2, 1 FROM dishes WHERE name = 'Potaje de garbanzos';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 2, 2 FROM dishes WHERE name = 'Lomo de adobado en salsa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 2, 3 FROM dishes WHERE name = 'Ensalada de lechuga, cebolla y zanahoria';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 2, 1 FROM dishes WHERE name = 'Arroz caldoso con verduras';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 2, 2 FROM dishes WHERE name = 'Albóndigas de ave en salsa de tomate';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 2, 3 FROM dishes WHERE name = 'Ensaladilla al vapor';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 2, 1 FROM dishes WHERE name = 'Alubias blancas con verduras';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 2, 2 FROM dishes WHERE name = 'Buñuelos de bacalao';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 2, 3 FROM dishes WHERE name = 'Ensalada de lechuga, tomate y maíz';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 2, 1 FROM dishes WHERE name = 'Fideos a la marinera';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 2, 2 FROM dishes WHERE name = 'Magro de cerdo en salsa de tomate';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 2, 3 FROM dishes WHERE name = 'Arroz pilaf';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 2, 1 FROM dishes WHERE name = 'Macarrones Napolitana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 2, 2 FROM dishes WHERE name = 'Chuleta de rape a la siciliana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 2, 3 FROM dishes WHERE name = 'Brócoli al limón';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 2, 1 FROM dishes WHERE name = 'Patatas a la Navarra';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 2, 2 FROM dishes WHERE name = 'Tortilla Francesa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 2, 3 FROM dishes WHERE name = 'Calabacín salteado con cebolla y tomillo';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 2, 1 FROM dishes WHERE name = 'Ensalada completa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 2, 2 FROM dishes WHERE name = 'Paella mixta con pollo';
