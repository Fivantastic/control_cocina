-- Script para insertar el menú de la Semana 2 de comidas para la clínica Korian Ita (ID 2)

-- Usamos el menú existente para Korian Ita (ID 4)
SET @menu_id = 4;

-- Verificamos que el menú exista
SELECT IF(
    EXISTS(SELECT 1 FROM menus WHERE id = @menu_id AND clinic_id = 2),
    'Menú encontrado, procediendo con la inserción',
    'Error: Menú no encontrado'
) AS mensaje;

-- 1. Insertar los platos para la clínica Korian Ita (Semana 2)
-- Primeros platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Garbanzos con verduras', 'Primero', 'Garbanzos con verduras (300-250-200 gr)', 2),
('Arroz caldoso de pollo', 'Primero', 'Arroz caldoso de pollo (300-250-200 gr)', 2),
('Lentejas con chorizo', 'Primero', 'Lentejas con chorizo (300-250-200 gr)', 2),
('Judías verdes con patatas', 'Primero', 'Judías verdes con patatas (300-250-200 gr)', 2),
('Macarrones con atún y tomate', 'Primero', 'Macarrones con atún y tomate (300-250-200 gr)', 2),
('Arroz a la milanesa', 'Primero', 'Arroz a la milanesa (300-250-200 gr)', 2),
('Rigatoni en salsa de gorgonzola', 'Primero', 'Rigatoni en salsa de gorgonzola (300-250-200 gr)', 2);

-- Segundos platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Salchicha de vacuno plancha', 'Segundo', 'Salchicha de vacuno plancha (5 u-3 u-3 u)', 2),
('Tortilla francesa', 'Segundo', 'Tortilla francesa (2 u-1 u-1 u)', 2),
('Abadejo en salsa de tomate', 'Segundo', 'Abadejo en salsa de tomate (2 u-1 u-1 u)', 2),
('Filete de limanda empanado', 'Segundo', 'Filete de limanda empanado (2 u-1 u-1 u)', 2),
('Croquetas de jamón', 'Segundo', 'Croquetas de jamón (5 u-4 u-4 u)', 2),
('Pavo con verduras en salsa', 'Segundo', 'Pavo con verduras en salsa (200 gr-140 gr-140 gr)', 2),
('Merluza en salsa de puerto', 'Segundo', 'Merluza en salsa de puerto (2 u-1 u-1 u)', 2);

-- Guarniciones
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Calabacín plancha', 'Guarnición', 'Calabacín plancha (150 gr-100 gr-50 gr)', 2),
('Vegetales al grill', 'Guarnición', 'Vegetales al grill (150 gr-100 gr-50 gr)', 2),
('Calabacín', 'Guarnición', 'Calabacín (150 gr-100 gr-50 gr)', 2),
('Vegetales al grill jueves', 'Guarnición', 'Vegetales al grill (150 gr-10 gr-50 gr)', 2),
('Calabacín a la plancha', 'Guarnición', 'Calabacín a la plancha (150 gr-100 gr-50 gr)', 2),
('Judías verdes y espárragos', 'Guarnición', 'Judías verdes y espárragos (150 gr-100 gr-50 gr)', 2);

-- 2. Obtener los IDs de los platos insertados
-- Primeros platos
SET @garbanzos_verduras_id = (SELECT id FROM dishes WHERE name = 'Garbanzos con verduras' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @arroz_pollo_id = (SELECT id FROM dishes WHERE name = 'Arroz caldoso de pollo' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @lentejas_chorizo_id = (SELECT id FROM dishes WHERE name = 'Lentejas con chorizo' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @judias_patatas_id = (SELECT id FROM dishes WHERE name = 'Judías verdes con patatas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @macarrones_atun_id = (SELECT id FROM dishes WHERE name = 'Macarrones con atún y tomate' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @arroz_milanesa_id = (SELECT id FROM dishes WHERE name = 'Arroz a la milanesa' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @rigatoni_gorgonzola_id = (SELECT id FROM dishes WHERE name = 'Rigatoni en salsa de gorgonzola' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Segundos platos
SET @salchicha_vacuno_id = (SELECT id FROM dishes WHERE name = 'Salchicha de vacuno plancha' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tortilla_francesa_id = (SELECT id FROM dishes WHERE name = 'Tortilla francesa' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @abadejo_tomate_id = (SELECT id FROM dishes WHERE name = 'Abadejo en salsa de tomate' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @limanda_empanado_id = (SELECT id FROM dishes WHERE name = 'Filete de limanda empanado' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @croquetas_jamon_id = (SELECT id FROM dishes WHERE name = 'Croquetas de jamón' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pavo_verduras_id = (SELECT id FROM dishes WHERE name = 'Pavo con verduras en salsa' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @merluza_puerto_id = (SELECT id FROM dishes WHERE name = 'Merluza en salsa de puerto' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Guarniciones
SET @calabacin_plancha_id = (SELECT id FROM dishes WHERE name = 'Calabacín plancha' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @vegetales_grill_id = (SELECT id FROM dishes WHERE name = 'Vegetales al grill' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @calabacin_id = (SELECT id FROM dishes WHERE name = 'Calabacín' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @vegetales_grill_jueves_id = (SELECT id FROM dishes WHERE name = 'Vegetales al grill jueves' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @calabacin_plancha2_id = (SELECT id FROM dishes WHERE name = 'Calabacín a la plancha' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @judias_esparragos_id = (SELECT id FROM dishes WHERE name = 'Judías verdes y espárragos' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- 3. Insertar las relaciones en la tabla menu_dishes para la semana 2
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @garbanzos_verduras_id, 1, 2, 1),
(@menu_id, @salchicha_vacuno_id, 1, 2, 2),
(@menu_id, @calabacin_plancha_id, 1, 2, 3);

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @arroz_pollo_id, 2, 2, 1),
(@menu_id, @tortilla_francesa_id, 2, 2, 2),
(@menu_id, @vegetales_grill_id, 2, 2, 3);

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @lentejas_chorizo_id, 3, 2, 1),
(@menu_id, @abadejo_tomate_id, 3, 2, 2),
(@menu_id, @calabacin_id, 3, 2, 3);

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @judias_patatas_id, 4, 2, 1),
(@menu_id, @limanda_empanado_id, 4, 2, 2),
(@menu_id, @vegetales_grill_jueves_id, 4, 2, 3);

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @macarrones_atun_id, 5, 2, 1),
(@menu_id, @croquetas_jamon_id, 5, 2, 2),
(@menu_id, @calabacin_plancha2_id, 5, 2, 3);

-- Sábado (sin guarnición)
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @arroz_milanesa_id, 6, 2, 1),
(@menu_id, @pavo_verduras_id, 6, 2, 2);

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @rigatoni_gorgonzola_id, 7, 2, 1),
(@menu_id, @merluza_puerto_id, 7, 2, 2),
(@menu_id, @judias_esparragos_id, 7, 2, 3);

-- Mostrar un mensaje de confirmación
SELECT 'Menú de la Semana 2 para la clínica Korian Ita insertado correctamente' AS mensaje;
