-- Script para insertar el menú de la Semana 1 de comidas para la clínica Korian Ita (ID 2)

-- 1. Crear el menú principal para Korian Ita si no existe
INSERT IGNORE INTO menus (name, season, service_type, total_weeks, start_date, end_date, is_active, clinic_id)
VALUES ('Menú Otoño-Invierno 2024-25 - Comidas', 'otoño-invierno', 'comida', 4, '2024-09-01', '2025-03-31', 1, 2);

-- Obtener el ID del menú recién creado
SET @menu_id = LAST_INSERT_ID();
-- Si no se insertó porque ya existía, obtener su ID
SELECT IF(@menu_id = 0, 
    (SELECT id FROM menus WHERE name = 'Menú Otoño-Invierno 2024-25 - Comidas' AND clinic_id = 2 LIMIT 1), 
    @menu_id) INTO @menu_id;

-- 2. Insertar los platos para la clínica Korian Ita
-- Primeros platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Crema de calabaza', 'Primero', 'Crema de calabaza (300-250-200 gr)', 2),
('Arroz tres delicias', 'Primero', 'Arroz tres delicias (300-250-200 gr)', 2),
('Lentejas con verduras', 'Primero', 'Lentejas con verduras (300-250-200 gr)', 2),
('Garbanzos guisados con judías verdes', 'Primero', 'Garbanzos guisados con judías verdes (300-250-200 gr)', 2),
('Espinacas a la crema', 'Primero', 'Espinacas a la crema (300-250-200 gr)', 2),
('Ñoquis con vegetales y albahaca', 'Primero', 'Ñoquis con vegetales y albahaca (300-250-200 gr)', 2),
('Paella de Marisco', 'Primero', 'Paella de Marisco (300-250-200 gr)', 2);

-- Segundos platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Tortilla calabacín y patata', 'Segundo', 'Tortilla calabacín y patata (300 gr-250 gr-200 gr)', 2),
('Salchichas', 'Segundo', 'Salchichas (200-140-140 gr)', 2),
('Jamoncitos de pollos asados AP', 'Segundo', 'Jamoncitos de pollos asados AP (2 u-1 u-1 u)', 2),
('Pavo a la plancha', 'Segundo', 'Pavo a la plancha (2 u-1 u-1 u)', 2),
('Hamburguesa completa', 'Segundo', 'Hamburguesa completa (2 u-1 u-1 u)', 2),
('Salchichas de ave', 'Segundo', 'Salchichas de ave (5 u-3 u-3 u)', 2),
('Pavo con verduras en salsa', 'Segundo', 'Pavo con verduras en salsa (200 gr-140 gr-140 gr)', 2);

-- Guarniciones
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Ensalada mixta con lechuga', 'Guarnición', 'Ensalada mixta con lechuga (150-100-50 gr)', 2),
('Zanahoria salteada', 'Guarnición', 'Zanahoria salteada (150-100-50 gr)', 2),
('Ensalada Mixta', 'Guarnición', 'Ensalada Mixta (150 gr-100 gr-50 gr)', 2),
('Berenjena Grill', 'Guarnición', 'Berenjena Grill', 2),
('Patatas fritas', 'Guarnición', 'Patatas fritas (150 gr-100 gr-50 gr)', 2),
('Judías verdes y espárragos', 'Guarnición', 'Judías verdes y espárragos (150 gr-100 gr-50 gr)', 2);

-- 3. Obtener los IDs de los platos insertados
-- Primeros platos
SET @crema_calabaza_id = (SELECT id FROM dishes WHERE name = 'Crema de calabaza' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @arroz_tres_delicias_id = (SELECT id FROM dishes WHERE name = 'Arroz tres delicias' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @lentejas_verduras_id = (SELECT id FROM dishes WHERE name = 'Lentejas con verduras' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @garbanzos_judias_id = (SELECT id FROM dishes WHERE name = 'Garbanzos guisados con judías verdes' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @espinacas_crema_id = (SELECT id FROM dishes WHERE name = 'Espinacas a la crema' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @noquis_vegetales_id = (SELECT id FROM dishes WHERE name = 'Ñoquis con vegetales y albahaca' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @paella_marisco_id = (SELECT id FROM dishes WHERE name = 'Paella de Marisco' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Segundos platos
SET @tortilla_calabacin_id = (SELECT id FROM dishes WHERE name = 'Tortilla calabacín y patata' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @salchichas_id = (SELECT id FROM dishes WHERE name = 'Salchichas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @jamoncitos_pollo_id = (SELECT id FROM dishes WHERE name = 'Jamoncitos de pollos asados AP' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pavo_plancha_id = (SELECT id FROM dishes WHERE name = 'Pavo a la plancha' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @hamburguesa_id = (SELECT id FROM dishes WHERE name = 'Hamburguesa completa' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @salchichas_ave_id = (SELECT id FROM dishes WHERE name = 'Salchichas de ave' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pavo_verduras_id = (SELECT id FROM dishes WHERE name = 'Pavo con verduras en salsa' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Guarniciones
SET @ensalada_lechuga_id = (SELECT id FROM dishes WHERE name = 'Ensalada mixta con lechuga' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @zanahoria_salteada_id = (SELECT id FROM dishes WHERE name = 'Zanahoria salteada' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_mixta_id = (SELECT id FROM dishes WHERE name = 'Ensalada Mixta' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @berenjena_grill_id = (SELECT id FROM dishes WHERE name = 'Berenjena Grill' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @patatas_fritas_id = (SELECT id FROM dishes WHERE name = 'Patatas fritas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @judias_esparragos_id = (SELECT id FROM dishes WHERE name = 'Judías verdes y espárragos' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- 4. Insertar las relaciones en la tabla menu_dishes para la semana 1
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @crema_calabaza_id, 1, 1, 1),
(@menu_id, @tortilla_calabacin_id, 1, 1, 2),
(@menu_id, @ensalada_lechuga_id, 1, 1, 3);

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @arroz_tres_delicias_id, 2, 1, 1),
(@menu_id, @salchichas_id, 2, 1, 2),
(@menu_id, @zanahoria_salteada_id, 2, 1, 3);

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @lentejas_verduras_id, 3, 1, 1),
(@menu_id, @jamoncitos_pollo_id, 3, 1, 2),
(@menu_id, @ensalada_mixta_id, 3, 1, 3);

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @garbanzos_judias_id, 4, 1, 1),
(@menu_id, @pavo_plancha_id, 4, 1, 2),
(@menu_id, @berenjena_grill_id, 4, 1, 3);

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @espinacas_crema_id, 5, 1, 1),
(@menu_id, @hamburguesa_id, 5, 1, 2),
(@menu_id, @patatas_fritas_id, 5, 1, 3);

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @noquis_vegetales_id, 6, 1, 1),
(@menu_id, @salchichas_ave_id, 6, 1, 2),
(@menu_id, @judias_esparragos_id, 6, 1, 3);

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @paella_marisco_id, 7, 1, 1),
(@menu_id, @pavo_verduras_id, 7, 1, 2);

-- Mostrar un mensaje de confirmación
SELECT CONCAT('Menú de la Semana 1 para la clínica Korian Ita insertado correctamente. ID del menú: ', @menu_id) AS mensaje;
