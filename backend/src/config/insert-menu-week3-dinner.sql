-- Insertar primeros platos
INSERT INTO dishes (name, category, description) VALUES
('Menestra natural de brócoli, zanahoria y patata', 'Primero', 'Verduras'),
('Crema de puerros', 'Primero', 'Crema'),
('Ensalada de pasta', 'Primero', 'Ensalada'),
('Sopa Castellana', 'Primero', 'Sopa'),
('Arroz salteado al curry', 'Primero', 'Arroz');

-- Insertar segundos platos
INSERT INTO dishes (name, category, description) VALUES
('Salteado de pollo asado', 'Segundo', 'Carne de pollo'),
('Merluza en salsa verde', 'Segundo', 'Pescado'),
('Revuelto de jamón york', 'Segundo', 'Huevos'),
('Salmón teriyaki', 'Segundo', 'Pescado'),
('Alitas pollo al horno', 'Segundo', 'Carne de pollo'),
('Hamburguesa de ave plancha', 'Segundo', 'Carne de ave'),
('Quiche de york y puerro', 'Segundo', 'Huevos y verduras');

-- Insertar guarniciones
INSERT INTO dishes (name, category, description) VALUES
('Brócoli rehogado', 'Guarnición', 'Verdura'),
('Tomate grill', 'Guarnición', 'Verdura'),
('Ensalada de lechuga y remolacha', 'Guarnición', 'Ensalada'),
('Berenjena y tomate asado', 'Guarnición', 'Verdura'),
('Ensalada lechuga y maíz', 'Guarnición', 'Ensalada');

-- Obtener el ID del menú de cenas
SET @menu_id = 2;

-- Insertar relaciones menú-platos para la semana 3
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 3, 1 FROM dishes WHERE name = 'Sopa de marisco';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 3, 2 FROM dishes WHERE name = 'Salteado de pollo asado';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 3, 3 FROM dishes WHERE name = 'Menestra de verduras';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 3, 1 FROM dishes WHERE name = 'Crema de calabaza';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 3, 2 FROM dishes WHERE name = 'Merluza en salsa verde';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 3, 3 FROM dishes WHERE name = 'Brócoli rehogado';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 3, 1 FROM dishes WHERE name = 'Menestra natural de brócoli, zanahoria y patata';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 3, 2 FROM dishes WHERE name = 'Revuelto de jamón york';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 3, 3 FROM dishes WHERE name = 'Tomate grill';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 3, 1 FROM dishes WHERE name = 'Crema de puerros';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 3, 2 FROM dishes WHERE name = 'Salmón teriyaki';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 3, 3 FROM dishes WHERE name = 'Ensalada de lechuga y remolacha';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 3, 1 FROM dishes WHERE name = 'Ensalada de pasta';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 3, 2 FROM dishes WHERE name = 'Alitas pollo al horno';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 3, 3 FROM dishes WHERE name = 'Berenjena y tomate asado';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 3, 1 FROM dishes WHERE name = 'Sopa Castellana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 3, 2 FROM dishes WHERE name = 'Hamburguesa de ave plancha';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 3, 3 FROM dishes WHERE name = 'Ensalada lechuga y maíz';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 3, 1 FROM dishes WHERE name = 'Arroz salteado al curry';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 3, 2 FROM dishes WHERE name = 'Quiche de york y puerro';
