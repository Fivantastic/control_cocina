-- Script para insertar el menú de cenas de la Semana 1 para la clínica Korian Ita (ID 2)

-- 1. Crear el menú principal para Korian Ita si no existe
INSERT IGNORE INTO menus (name, season, service_type, total_weeks, start_date, end_date, is_active, clinic_id)
VALUES ('Menú Otoño-Invierno 2024-25 - Cenas', 'otoño-invierno', 'cena', 4, '2024-09-01', '2025-03-31', 1, 2);

-- Obtener el ID del menú recién creado
SET @menu_id = LAST_INSERT_ID();
-- Si no se insertó porque ya existía, obtener su ID
SELECT IF(@menu_id = 0, 
    (SELECT id FROM menus WHERE name = 'Menú Otoño-Invierno 2024-25 - Cenas' AND clinic_id = 2 LIMIT 1), 
    @menu_id) INTO @menu_id;

-- 2. Insertar los platos para la clínica Korian Ita
-- Primeros platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Judías verdes con patatas', 'Primero', 'Judías verdes con patatas (300-250-200 gr)', 2),
('Porrusalda', 'Primero', 'Porrusalda (300-250-200 gr)', 2),
('Gratén de patatas y espinacas', 'Primero', 'Gratén de patatas y espinacas (300-250-200 gr)', 2),
('Puré de patatas y col', 'Primero', 'Puré de patatas y col (300-250-200 gr)', 2),
('Guisantes con jamón de pavo', 'Primero', 'Guisantes con jamón de pavo (300-250-200 gr)', 2),
('Sopa de fideos y carne ave', 'Primero', 'Sopa de fideos y carne ave (300-250-200 gr)', 2),
('Macedonia de verduras', 'Primero', 'Macedonia de verduras (300-250-200 gr)', 2);

-- Segundos platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Abadejo relleno mostaza y miel', 'Segundo', 'Abadejo relleno mostaza y miel (2 u-1 u-1 u)', 2),
('Pavo a la plancha', 'Segundo', 'Pavo a la plancha (2 u-1 u-1 u)', 2),
('Bacalao empanado', 'Segundo', 'Bacalao empanado (2 u-1 u-1 u)', 2),
('Tortilla francesa', 'Segundo', 'Tortilla francesa (2 u-1 u-1 u)', 2),
('Tortilla de calabacín y patatas', 'Segundo', 'Tortilla de calabacín y patatas (300 gr-250 gr-200 gr)', 2),
('Triángulo de patata y queso', 'Segundo', 'Triángulo de patata y queso (2 u-1 u-1 u)', 2),
('Pizza tres quesos', 'Segundo', 'Pizza tres quesos (300-250-200 gr)', 2);

-- Guarniciones
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Verduras al grill', 'Guarnición', 'Verduras al grill (150 gr-100 gr-50 gr)', 2),
('Ensalada', 'Guarnición', 'Ensalada (150 gr-100 gr-50 gr)', 2),
('Zanahoria', 'Guarnición', 'Zanahoria (150 gr-100 gr-50 gr)', 2),
('Tomate natural', 'Guarnición', 'Tomate natural (150 gr-10 gr-50 gr)', 2),
('Ensalada mixta', 'Guarnición', 'Ensalada mixta (150 gr-100 gr-50 gr)', 2);

-- Postres (los incluimos como guarniciones para cumplir con la restricción de dish_order)
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Zanahoria con miel', 'Guarnición', 'Zanahoria con miel (Postre)', 2),
('Ensalada de queso', 'Guarnición', 'Ensalada de queso (Postre)', 2);

-- 3. Obtener los IDs de los platos insertados
-- Primeros platos
SET @judias_patatas_id = (SELECT id FROM dishes WHERE name = 'Judías verdes con patatas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @porrusalda_id = (SELECT id FROM dishes WHERE name = 'Porrusalda' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @graten_patatas_id = (SELECT id FROM dishes WHERE name = 'Gratén de patatas y espinacas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pure_patatas_id = (SELECT id FROM dishes WHERE name = 'Puré de patatas y col' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @guisantes_jamon_id = (SELECT id FROM dishes WHERE name = 'Guisantes con jamón de pavo' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @sopa_fideos_id = (SELECT id FROM dishes WHERE name = 'Sopa de fideos y carne ave' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @macedonia_verduras_id = (SELECT id FROM dishes WHERE name = 'Macedonia de verduras' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Segundos platos
SET @abadejo_id = (SELECT id FROM dishes WHERE name = 'Abadejo relleno mostaza y miel' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pavo_plancha_id = (SELECT id FROM dishes WHERE name = 'Pavo a la plancha' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @bacalao_id = (SELECT id FROM dishes WHERE name = 'Bacalao empanado' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tortilla_francesa_id = (SELECT id FROM dishes WHERE name = 'Tortilla francesa' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tortilla_calabacin_id = (SELECT id FROM dishes WHERE name = 'Tortilla de calabacín y patatas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @triangulo_patata_id = (SELECT id FROM dishes WHERE name = 'Triángulo de patata y queso' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pizza_quesos_id = (SELECT id FROM dishes WHERE name = 'Pizza tres quesos' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Guarniciones
SET @verduras_grill_id = (SELECT id FROM dishes WHERE name = 'Verduras al grill' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_id = (SELECT id FROM dishes WHERE name = 'Ensalada' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @zanahoria_id = (SELECT id FROM dishes WHERE name = 'Zanahoria' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tomate_natural_id = (SELECT id FROM dishes WHERE name = 'Tomate natural' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_mixta_id = (SELECT id FROM dishes WHERE name = 'Ensalada mixta' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Postres
SET @zanahoria_miel_id = (SELECT id FROM dishes WHERE name = 'Zanahoria con miel' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_queso_id = (SELECT id FROM dishes WHERE name = 'Ensalada de queso' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- 4. Insertar las relaciones en la tabla menu_dishes para la semana 1
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @judias_patatas_id, 1, 1, 1),
(@menu_id, @abadejo_id, 1, 1, 2),
(@menu_id, @verduras_grill_id, 1, 1, 3);

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @porrusalda_id, 2, 1, 1),
(@menu_id, @pavo_plancha_id, 2, 1, 2),
(@menu_id, @ensalada_id, 2, 1, 3);

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @graten_patatas_id, 3, 1, 1),
(@menu_id, @bacalao_id, 3, 1, 2),
(@menu_id, @zanahoria_id, 3, 1, 3);

-- Jueves (incluimos el postre como un plato separado)
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @pure_patatas_id, 4, 1, 1),
(@menu_id, @tortilla_francesa_id, 4, 1, 2),
(@menu_id, @tomate_natural_id, 4, 1, 3);

-- Viernes (incluimos el postre como un plato separado)
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @guisantes_jamon_id, 5, 1, 1),
(@menu_id, @tortilla_calabacin_id, 5, 1, 2),
(@menu_id, @ensalada_mixta_id, 5, 1, 3);

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @sopa_fideos_id, 6, 1, 1),
(@menu_id, @triangulo_patata_id, 6, 1, 2),
(@menu_id, @ensalada_id, 6, 1, 3);

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @macedonia_verduras_id, 7, 1, 1),
(@menu_id, @pizza_quesos_id, 7, 1, 2);

-- Mostrar un mensaje de confirmación
SELECT CONCAT('Menú de cenas de la Semana 1 para la clínica Korian Ita insertado correctamente. ID del menú: ', @menu_id) AS mensaje;
