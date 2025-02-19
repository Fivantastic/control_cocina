-- Insertar primeros platos
INSERT INTO dishes (name, category, description) VALUES
('Patatas Riojana', 'Primero', 'Plato tradicional de patatas'),
('Lentejas estofadas', 'Primero', 'Legumbres'),
('Puchero andaluz de arroz', 'Primero', 'Plato tradicional andaluz'),
('Tallarines italiana', 'Primero', 'Pasta'),
('Fideos a la cazuela', 'Primero', 'Pasta'),
('Berza rehogadas', 'Primero', 'Verdura'),
('Ensalada verde con atún', 'Primero', 'Ensalada');

-- Insertar segundos platos
INSERT INTO dishes (name, category, description) VALUES
('Solomillo de Pollo asado con miel, pimienta y limón', 'Segundo', 'Carne de pollo'),
('Abadejo con ajo y perejil', 'Segundo', 'Pescado'),
('Huevos fritos', 'Segundo', 'Huevos'),
('Lomo de cerdo asado', 'Segundo', 'Carne de cerdo'),
('Tortilla de patatas y cebolla', 'Segundo', 'Huevos y patatas'),
('Albóndigas en salsa', 'Segundo', 'Carne'),
('Fiduá', 'Segundo', 'Pasta con pescado');

-- Insertar guarniciones
INSERT INTO dishes (name, category, description) VALUES
('Tomate asado', 'Guarnición', 'Verdura'),
('Ensalada de lechuga, zanahoria y maíz', 'Guarnición', 'Ensalada'),
('Patatas fritas', 'Guarnición', 'Patatas'),
('Verduritas', 'Guarnición', 'Verduras variadas'),
('Ensalada de lechuga, tomate, maíz y zanahoria', 'Guarnición', 'Ensalada'),
('Arroz salteado', 'Guarnición', 'Arroz');

-- Obtener el ID del menú de comidas
SET @menu_id = 1;

-- Insertar relaciones menú-platos para la semana 1
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 1, 1 FROM dishes WHERE name = 'Patatas Riojana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 1, 2 FROM dishes WHERE name = 'Solomillo de Pollo asado con miel, pimienta y limón';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 1, 3 FROM dishes WHERE name = 'Tomate asado';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 1, 1 FROM dishes WHERE name = 'Lentejas estofadas';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 1, 2 FROM dishes WHERE name = 'Abadejo con ajo y perejil';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 1, 3 FROM dishes WHERE name = 'Ensalada de lechuga, zanahoria y maíz';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 1, 1 FROM dishes WHERE name = 'Puchero andaluz de arroz';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 1, 2 FROM dishes WHERE name = 'Huevos fritos';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 1, 3 FROM dishes WHERE name = 'Patatas fritas';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 1, 1 FROM dishes WHERE name = 'Tallarines italiana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 1, 2 FROM dishes WHERE name = 'Lomo de cerdo asado';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 1, 3 FROM dishes WHERE name = 'Verduritas';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 1, 1 FROM dishes WHERE name = 'Fideos a la cazuela';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 1, 2 FROM dishes WHERE name = 'Tortilla de patatas y cebolla';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 1, 3 FROM dishes WHERE name = 'Ensalada de lechuga, tomate, maíz y zanahoria';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 1, 1 FROM dishes WHERE name = 'Berza rehogadas';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 1, 2 FROM dishes WHERE name = 'Albóndigas en salsa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 1, 3 FROM dishes WHERE name = 'Arroz salteado';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 1, 1 FROM dishes WHERE name = 'Ensalada verde con atún';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 1, 2 FROM dishes WHERE name = 'Fiduá';
