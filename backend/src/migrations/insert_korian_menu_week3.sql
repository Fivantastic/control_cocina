-- Script para insertar el menú de la Semana 3 de comidas para la clínica Korian Ita (ID 2)

-- Usamos el menú existente para Korian Ita (ID 4)
SET @menu_id = 4;

-- Verificamos que el menú exista
SELECT IF(
    EXISTS(SELECT 1 FROM menus WHERE id = @menu_id AND clinic_id = 2),
    'Menú encontrado, procediendo con la inserción',
    'Error: Menú no encontrado'
) AS mensaje;

-- 1. Insertar los platos para la clínica Korian Ita (Semana 3)
-- Primeros platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Lentejas con verduras sem3', 'Primero', 'Lentejas con verduras (300-250-200 gr)', 2),
('Rigatoni con tomate y salsa', 'Primero', 'Rigatoni con tomate y salsa (300-250-200 gr)', 2),
('Crema de zanahoria', 'Primero', 'Crema de zanahoria (300-250-200 gr)', 2),
('Arroz con verduras sem3', 'Primero', 'Arroz con verduras (300-250-200 gr)', 2),
('Crema de champiñones sem3', 'Primero', 'Crema de champiñones (300-250-200 gr)', 2),
('Lentejas con arroz y verduras', 'Primero', 'Lentejas con arroz y verduras (300-250-200 gr)', 2),
('Ensalada de garbanzos', 'Primero', 'Ensalada de garbanzos (300-250-200 gr)', 2);

-- Segundos platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Pastel de carne con puré', 'Segundo', 'Pastel de carne con puré (300-250-200 gr)', 2),
('Cordón Bleu de pavo', 'Segundo', 'Cordón Bleu de pavo (2 u-1 u-1 u)', 2),
('Hamburguesa a la griega', 'Segundo', 'Hamburguesa a la griega (2 u-1 u-1 u)', 2),
('Tortilla francesa sem3', 'Segundo', 'Tortilla francesa (2 u-1 u-1 u)', 2),
('Pizza tres quesos sem3', 'Segundo', 'Pizza tres quesos (300-250-200 gr)', 2),
('Ternera en salsa de champiñones', 'Segundo', 'Ternera en salsa de champiñones (200 gr-140 gr-140 gr)', 2),
('Merluza a la toscana', 'Segundo', 'Merluza a la toscana (2 u-1 u-1 u)', 2);

-- Guarniciones
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Vegetales sem3', 'Guarnición', 'Vegetales (150 gr-100 gr-50 gr)', 2),
('Vegetales al grill sem3', 'Guarnición', 'Vegetales al grill (150 gr-100 gr-50 gr)', 2),
('Patatas fritas sem3', 'Guarnición', 'Patatas fritas (150 gr-100 gr-50 gr)', 2),
('Ensalada sem3', 'Guarnición', 'Ensalada (150 gr-100 gr-50 gr)', 2),
('Zanahoria sem3', 'Guarnición', 'Zanahoria (150 gr-100 gr-50 gr)', 2);

-- 2. Obtener los IDs de los platos insertados
-- Primeros platos
SET @lentejas_verduras_id = (SELECT id FROM dishes WHERE name = 'Lentejas con verduras sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @rigatoni_tomate_id = (SELECT id FROM dishes WHERE name = 'Rigatoni con tomate y salsa' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @crema_zanahoria_id = (SELECT id FROM dishes WHERE name = 'Crema de zanahoria' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @arroz_verduras_id = (SELECT id FROM dishes WHERE name = 'Arroz con verduras sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @crema_champinones_id = (SELECT id FROM dishes WHERE name = 'Crema de champiñones sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @lentejas_arroz_id = (SELECT id FROM dishes WHERE name = 'Lentejas con arroz y verduras' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_garbanzos_id = (SELECT id FROM dishes WHERE name = 'Ensalada de garbanzos' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Segundos platos
SET @pastel_carne_id = (SELECT id FROM dishes WHERE name = 'Pastel de carne con puré' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @cordon_bleu_id = (SELECT id FROM dishes WHERE name = 'Cordón Bleu de pavo' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @hamburguesa_griega_id = (SELECT id FROM dishes WHERE name = 'Hamburguesa a la griega' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tortilla_francesa_id = (SELECT id FROM dishes WHERE name = 'Tortilla francesa sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pizza_quesos_id = (SELECT id FROM dishes WHERE name = 'Pizza tres quesos sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ternera_champinones_id = (SELECT id FROM dishes WHERE name = 'Ternera en salsa de champiñones' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @merluza_toscana_id = (SELECT id FROM dishes WHERE name = 'Merluza a la toscana' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Guarniciones
SET @vegetales_id = (SELECT id FROM dishes WHERE name = 'Vegetales sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @vegetales_grill_id = (SELECT id FROM dishes WHERE name = 'Vegetales al grill sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @patatas_fritas_id = (SELECT id FROM dishes WHERE name = 'Patatas fritas sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_id = (SELECT id FROM dishes WHERE name = 'Ensalada sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @zanahoria_id = (SELECT id FROM dishes WHERE name = 'Zanahoria sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- 3. Insertar las relaciones en la tabla menu_dishes para la semana 3
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @lentejas_verduras_id, 1, 3, 1),
(@menu_id, @pastel_carne_id, 1, 3, 2),
(@menu_id, @vegetales_id, 1, 3, 3);

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @rigatoni_tomate_id, 2, 3, 1),
(@menu_id, @cordon_bleu_id, 2, 3, 2),
(@menu_id, @vegetales_grill_id, 2, 3, 3);

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @crema_zanahoria_id, 3, 3, 1),
(@menu_id, @hamburguesa_griega_id, 3, 3, 2),
(@menu_id, @patatas_fritas_id, 3, 3, 3);

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @arroz_verduras_id, 4, 3, 1),
(@menu_id, @tortilla_francesa_id, 4, 3, 2),
(@menu_id, @ensalada_id, 4, 3, 3);

-- Viernes (sin guarnición)
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @crema_champinones_id, 5, 3, 1),
(@menu_id, @pizza_quesos_id, 5, 3, 2);

-- Sábado (sin guarnición)
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @lentejas_arroz_id, 6, 3, 1),
(@menu_id, @ternera_champinones_id, 6, 3, 2);

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @ensalada_garbanzos_id, 7, 3, 1),
(@menu_id, @merluza_toscana_id, 7, 3, 2),
(@menu_id, @zanahoria_id, 7, 3, 3);

-- Mostrar un mensaje de confirmación
SELECT 'Menú de la Semana 3 para la clínica Korian Ita insertado correctamente' AS mensaje;
