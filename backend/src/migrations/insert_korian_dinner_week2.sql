-- Script para insertar el menú de cenas de la Semana 2 para la clínica Korian Ita (ID 2)

-- Usamos el menú existente para Korian Ita (ID 6)
SET @menu_id = 6;

-- Verificamos que el menú exista
SELECT IF(
    EXISTS(SELECT 1 FROM menus WHERE id = @menu_id AND clinic_id = 2),
    'Menú encontrado, procediendo con la inserción',
    'Error: Menú no encontrado'
) AS mensaje;

-- 1. Insertar los platos para la clínica Korian Ita (Semana 2 - Cenas)
-- Primeros platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Crema champiñones', 'Primero', 'Crema champiñones (300-250-200 gr)', 2),
('Patata y zanahoria', 'Primero', 'Patata y zanahoria (300-250-200 gr)', 2),
('Coliflor a la crema', 'Primero', 'Coliflor a la crema (300-250-200 gr)', 2),
('Zanahoria con guisantes', 'Primero', 'Zanahoria con guisantes (300-250-200 gr)', 2),
('Ensalada de queso fresco', 'Primero', 'Ensalada de queso fresco (300-250-200 gr)', 2),
('Ensalada de frutos secos', 'Primero', 'Ensalada de frutos secos (300-250-200 gr)', 2),
('Porrusalda', 'Primero', 'Porrusalda (300-250-200 gr)', 2);

-- Segundos platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Merluza con ajo y perejil', 'Segundo', 'Merluza con ajo y perejil (2 u-1 u-1 u)', 2),
('Butifarra a la plancha', 'Segundo', 'Butifarra a la plancha (2 u-1 u-1 u)', 2),
('Pavo', 'Segundo', 'Pavo (2 u-1 u-1 u)', 2),
('Tortilla calabacín y patata', 'Segundo', 'Tortilla calabacín y patata (2 u-1 u-1 u)', 2),
('Jamoncitos de pollo asados AP', 'Segundo', 'Jamoncitos de pollo asados AP (3 u-2 u-2 u)', 2),
('Lasaña vegetal', 'Segundo', 'Lasaña vegetal (300-250-200 gr)', 2),
('Pechuga con vegetales', 'Segundo', 'Pechuga con vegetales (2 u-1 u-1 u)', 2);

-- Guarniciones
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Puré de patatas con verduras', 'Guarnición', 'Puré de patatas con verduras (150 gr-100 gr-50 gr)', 2),
('Ensalada mixta', 'Guarnición', 'Ensalada mixta (150 gr-100 gr-50 gr)', 2),
('Arroz blanco hervido', 'Guarnición', 'Arroz blanco hervido (150 gr-100 gr-50 gr)', 2),
('Lechuga, aceite y vinagre', 'Guarnición', 'Lechuga, aceite y vinagre (150 gr-100 gr-50 gr)', 2),
('Patatas asadas con especias', 'Guarnición', 'Patatas asadas con especias (150 gr-100 gr-50 gr)', 2),
('Guarnición sábado', 'Guarnición', 'Guarnición (150 gr-100 gr-50 gr)', 2),
('Guarnición domingo', 'Guarnición', 'Guarnición (150 gr-100 gr-50 gr)', 2);

-- 2. Obtener los IDs de los platos insertados
-- Primeros platos
SET @crema_champinones_id = (SELECT id FROM dishes WHERE name = 'Crema champiñones' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @patata_zanahoria_id = (SELECT id FROM dishes WHERE name = 'Patata y zanahoria' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @coliflor_crema_id = (SELECT id FROM dishes WHERE name = 'Coliflor a la crema' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @zanahoria_guisantes_id = (SELECT id FROM dishes WHERE name = 'Zanahoria con guisantes' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_queso_id = (SELECT id FROM dishes WHERE name = 'Ensalada de queso fresco' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_frutos_id = (SELECT id FROM dishes WHERE name = 'Ensalada de frutos secos' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @porrusalda_id = (SELECT id FROM dishes WHERE name = 'Porrusalda' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Segundos platos
SET @merluza_ajo_id = (SELECT id FROM dishes WHERE name = 'Merluza con ajo y perejil' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @butifarra_id = (SELECT id FROM dishes WHERE name = 'Butifarra a la plancha' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pavo_id = (SELECT id FROM dishes WHERE name = 'Pavo' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tortilla_calabacin_id = (SELECT id FROM dishes WHERE name = 'Tortilla calabacín y patata' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @jamoncitos_pollo_id = (SELECT id FROM dishes WHERE name = 'Jamoncitos de pollo asados AP' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @lasana_vegetal_id = (SELECT id FROM dishes WHERE name = 'Lasaña vegetal' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pechuga_vegetales_id = (SELECT id FROM dishes WHERE name = 'Pechuga con vegetales' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Guarniciones
SET @pure_patatas_id = (SELECT id FROM dishes WHERE name = 'Puré de patatas con verduras' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_mixta_id = (SELECT id FROM dishes WHERE name = 'Ensalada mixta' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @arroz_blanco_id = (SELECT id FROM dishes WHERE name = 'Arroz blanco hervido' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @lechuga_aceite_id = (SELECT id FROM dishes WHERE name = 'Lechuga, aceite y vinagre' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @patatas_asadas_id = (SELECT id FROM dishes WHERE name = 'Patatas asadas con especias' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @guarnicion_sabado_id = (SELECT id FROM dishes WHERE name = 'Guarnición sábado' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @guarnicion_domingo_id = (SELECT id FROM dishes WHERE name = 'Guarnición domingo' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- 3. Insertar las relaciones en la tabla menu_dishes para la semana 2
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @crema_champinones_id, 1, 2, 1),
(@menu_id, @merluza_ajo_id, 1, 2, 2),
(@menu_id, @pure_patatas_id, 1, 2, 3);

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @patata_zanahoria_id, 2, 2, 1),
(@menu_id, @butifarra_id, 2, 2, 2),
(@menu_id, @ensalada_mixta_id, 2, 2, 3);

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @coliflor_crema_id, 3, 2, 1),
(@menu_id, @pavo_id, 3, 2, 2),
(@menu_id, @arroz_blanco_id, 3, 2, 3);

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @zanahoria_guisantes_id, 4, 2, 1),
(@menu_id, @tortilla_calabacin_id, 4, 2, 2),
(@menu_id, @lechuga_aceite_id, 4, 2, 3);

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @ensalada_queso_id, 5, 2, 1),
(@menu_id, @jamoncitos_pollo_id, 5, 2, 2),
(@menu_id, @patatas_asadas_id, 5, 2, 3);

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @ensalada_frutos_id, 6, 2, 1),
(@menu_id, @lasana_vegetal_id, 6, 2, 2),
(@menu_id, @guarnicion_sabado_id, 6, 2, 3);

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @porrusalda_id, 7, 2, 1),
(@menu_id, @pechuga_vegetales_id, 7, 2, 2),
(@menu_id, @guarnicion_domingo_id, 7, 2, 3);

-- Mostrar un mensaje de confirmación
SELECT 'Menú de cenas de la Semana 2 para la clínica Korian Ita insertado correctamente' AS mensaje;
