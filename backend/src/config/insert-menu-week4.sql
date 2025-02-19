-- Insertar primeros platos
INSERT INTO dishes (name, category, description) VALUES
('Macarrones boloñesa', 'Primero', 'Pasta'),
('Lentejas a la jardinera', 'Primero', 'Legumbres'),
('Patatas guisadas con verduras', 'Primero', 'Patatas'),
('Fideos al ajillo', 'Primero', 'Pasta'),
('Potaje de garbanzos y berza', 'Primero', 'Legumbres'),
('Ensalada de col y manzana', 'Primero', 'Ensalada');

-- Insertar segundos platos
INSERT INTO dishes (name, category, description) VALUES
('Cinta de lomo adobada', 'Segundo', 'Carne de cerdo'),
('Albóndigas jardinera', 'Segundo', 'Carne'),
('Merluza al horno', 'Segundo', 'Pescado'),
('Ragout de pollo', 'Segundo', 'Carne de pollo'),
('Fritura variada', 'Segundo', 'Variado'),
('Rotti de pavo a la naranja', 'Segundo', 'Carne de pavo'),
('Paella mixta', 'Segundo', 'Arroz');

-- Insertar guarniciones
INSERT INTO dishes (name, category, description) VALUES
('Verduritas', 'Guarnición', 'Verdura'),
('Ensalada de lechuga y zanahoria', 'Guarnición', 'Ensalada'),
('Patatas panadera', 'Guarnición', 'Patatas');

-- Obtener el ID del menú de comidas
SET @menu_id = 1;

-- Insertar relaciones menú-platos para la semana 4
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 4, 1 FROM dishes WHERE name = 'Macarrones boloñesa';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 4, 2 FROM dishes WHERE name = 'Cinta de lomo adobada';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 1, 4, 3 FROM dishes WHERE name = 'Ensalada de lechuga y remolacha';

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 4, 1 FROM dishes WHERE name = 'Lentejas a la jardinera';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 4, 2 FROM dishes WHERE name = 'Albóndigas jardinera';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 2, 4, 3 FROM dishes WHERE name = 'Arroz pilaf';

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 4, 1 FROM dishes WHERE name = 'Patatas guisadas con verduras';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 4, 2 FROM dishes WHERE name = 'Merluza al horno';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 3, 4, 3 FROM dishes WHERE name = 'Menestra de verduras';

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 4, 1 FROM dishes WHERE name = 'Fideos al ajillo';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 4, 2 FROM dishes WHERE name = 'Ragout de pollo';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 4, 4, 3 FROM dishes WHERE name = 'Verduritas';

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 4, 1 FROM dishes WHERE name = 'Potaje de garbanzos y berza';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 4, 2 FROM dishes WHERE name = 'Fritura variada';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 5, 4, 3 FROM dishes WHERE name = 'Ensalada de lechuga y zanahoria';

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 4, 1 FROM dishes WHERE name = 'Sopa de marisco';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 4, 2 FROM dishes WHERE name = 'Rotti de pavo a la naranja';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 6, 4, 3 FROM dishes WHERE name = 'Patatas panadera';

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 4, 1 FROM dishes WHERE name = 'Ensalada de col y manzana';
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
SELECT @menu_id, id, 7, 4, 2 FROM dishes WHERE name = 'Paella mixta';
