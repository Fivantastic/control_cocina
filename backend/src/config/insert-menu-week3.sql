-- Insertar primeros platos
INSERT INTO dishes (name, category, description) VALUES
('Lentejas con verduras', 'Primero', 'Legumbres'),
('Cazuela de fideos', 'Primero', 'Pasta'),
('Cocido malagueño', 'Primero', 'Cocido'),
('Espaguetis italiana', 'Primero', 'Pasta'),
('Sopa de picadillo', 'Primero', 'Sopa');

-- Insertar segundos platos
INSERT INTO dishes (name, category, description) VALUES
('Carne de lomo al ajillo', 'Segundo', 'Carne de cerdo'),
('Abadejo al ajoperejil', 'Segundo', 'Pescado'),
('Calamares a la romana', 'Segundo', 'Pescado'),
('Magro de cerdo encebollado', 'Segundo', 'Carne de cerdo');

-- Insertar guarniciones
INSERT INTO dishes (name, category, description) VALUES
('Hervido de judías verdes', 'Guarnición', 'Verdura'),
('Guisantes con cebolla salteados', 'Guarnición', 'Verdura'),
('Arroz blanco con tomate', 'Guarnición', 'Arroz'),
('Ensaladilla de verduras', 'Guarnición', 'Verdura'),
('Patatas dado horno', 'Guarnición', 'Patatas');

-- Obtener el ID del menú de comidas
SET @menu_id = 1;

-- Insertar relaciones menú-platos para la semana 3
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 3, 1 FROM dishes WHERE name = 'Lentejas con verduras';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 3, 2 FROM dishes WHERE name = 'Tortilla de patatas y cebolla';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 3, 3 FROM dishes WHERE name = 'Ensalada de lechuga, tomate y maíz';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 3, 1 FROM dishes WHERE name = 'Cazuela de fideos';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 3, 2 FROM dishes WHERE name = 'Albóndigas de ave en salsa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 3, 3 FROM dishes WHERE name = 'Patatas fritas';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 3, 1 FROM dishes WHERE name = 'Cocido malagueño';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 3, 2 FROM dishes WHERE name = 'Carne de lomo al ajillo';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 3, 3 FROM dishes WHERE name = 'Hervido de judías verdes';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 3, 1 FROM dishes WHERE name = 'Espaguetis italiana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 3, 2 FROM dishes WHERE name = 'Abadejo al ajoperejil';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 3, 3 FROM dishes WHERE name = 'Guisantes con cebolla salteados';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 3, 1 FROM dishes WHERE name = 'Ensalada completa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 3, 2 FROM dishes WHERE name = 'Huevos fritos';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 3, 3 FROM dishes WHERE name = 'Arroz blanco con tomate';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 3, 1 FROM dishes WHERE name = 'Alubias blancas con verduras';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 3, 2 FROM dishes WHERE name = 'Calamares a la romana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 3, 3 FROM dishes WHERE name = 'Ensaladilla de verduras';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 3, 1 FROM dishes WHERE name = 'Sopa de picadillo';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 3, 2 FROM dishes WHERE name = 'Magro de cerdo encebollado';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 3, 3 FROM dishes WHERE name = 'Patatas dado horno';
