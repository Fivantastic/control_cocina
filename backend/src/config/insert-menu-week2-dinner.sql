-- Insertar primeros platos
INSERT INTO dishes (name, category, description) VALUES
('Tabulé', 'Primero', 'Ensalada'),
('Sopa de marisco', 'Primero', 'Sopa'),
('Ensalada aliñada con zanahoria, maíz y atún', 'Primero', 'Ensalada'),
('Crema de zanahoria con picatostes', 'Primero', 'Crema'),
('Ensalada canaria', 'Primero', 'Ensalada'),
('Sopa juliana', 'Primero', 'Sopa'),
('Crema de verduras', 'Primero', 'Crema');

-- Insertar segundos platos
INSERT INTO dishes (name, category, description) VALUES
('Huevos revueltos con tomate y cebolla', 'Segundo', 'Huevos'),
('Contramuslo de pollo al horno', 'Segundo', 'Carne de pollo'),
('Wrap de pollo con guacamole', 'Segundo', 'Carne de pollo'),
('Merluza al horno', 'Segundo', 'Pescado'),
('Hamburguesa de ave empanada', 'Segundo', 'Carne de ave'),
('Salchichas frescas de ave a la plancha', 'Segundo', 'Carne de ave');

-- Insertar guarniciones
INSERT INTO dishes (name, category, description) VALUES
('Judías verdes', 'Guarnición', 'Verdura'),
('Patatas y champiñón al vapor con laurel', 'Guarnición', 'Patatas y verduras'),
('Guisantes salteados con cebolla', 'Guarnición', 'Verdura'),
('Ensalada de lechuga, tomate, zanahoria, cebolla y maíz', 'Guarnición', 'Ensalada'),
('Menestra de verduras', 'Guarnición', 'Verdura'),
('Patatas asada con ajo y perejil', 'Guarnición', 'Patatas'),
('Patata y zanahoria al vapor', 'Guarnición', 'Verduras');

-- Obtener el ID del menú de cenas
SET @menu_id = 2;

-- Insertar relaciones menú-platos para la semana 2
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 2, 1 FROM dishes WHERE name = 'Tabulé';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 2, 2 FROM dishes WHERE name = 'Huevos revueltos con tomate y cebolla';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 2, 3 FROM dishes WHERE name = 'Judías verdes';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 2, 1 FROM dishes WHERE name = 'Sopa de marisco';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 2, 2 FROM dishes WHERE name = 'Contramuslo de pollo al horno';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 2, 3 FROM dishes WHERE name = 'Patatas y champiñón al vapor con laurel';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 2, 1 FROM dishes WHERE name = 'Ensalada aliñada con zanahoria, maíz y atún';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 2, 2 FROM dishes WHERE name = 'Wrap de pollo con guacamole';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 2, 3 FROM dishes WHERE name = 'Guisantes salteados con cebolla';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 2, 1 FROM dishes WHERE name = 'Crema de zanahoria con picatostes';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 2, 2 FROM dishes WHERE name = 'Tortilla de patata y cebolla';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 2, 3 FROM dishes WHERE name = 'Ensalada de lechuga, tomate, zanahoria, cebolla y maíz';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 2, 1 FROM dishes WHERE name = 'Ensalada canaria';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 2, 2 FROM dishes WHERE name = 'Merluza al horno';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 2, 3 FROM dishes WHERE name = 'Menestra de verduras';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 2, 1 FROM dishes WHERE name = 'Sopa juliana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 2, 2 FROM dishes WHERE name = 'Hamburguesa de ave empanada';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 2, 3 FROM dishes WHERE name = 'Patatas asada con ajo y perejil';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 2, 1 FROM dishes WHERE name = 'Crema de verduras';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 2, 2 FROM dishes WHERE name = 'Salchichas frescas de ave a la plancha';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 2, 3 FROM dishes WHERE name = 'Patata y zanahoria al vapor';
