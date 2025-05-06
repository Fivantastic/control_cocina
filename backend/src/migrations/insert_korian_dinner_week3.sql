-- Script para insertar el menú de cenas de la Semana 3 para la clínica Korian Ita (ID 2)

-- Usamos el menú existente para Korian Ita (ID 6)
SET @menu_id = 6;

-- Verificamos que el menú exista
SELECT IF(
    EXISTS(SELECT 1 FROM menus WHERE id = @menu_id AND clinic_id = 2),
    'Menú encontrado, procediendo con la inserción',
    'Error: Menú no encontrado'
) AS mensaje;

-- 1. Insertar los platos para la clínica Korian Ita (Semana 3 - Cenas)
-- Primeros platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Macedonia de verduras sem3', 'Primero', 'Macedonia de verduras (300-250-200 gr)', 2),
('Judías verdes salteadas', 'Primero', 'Judías verdes salteadas (300-250-200 gr)', 2),
('Tomate, maíz, queso y aceitunas', 'Primero', 'Tomate, maíz, queso y aceitunas (300-250-200 gr)', 2),
('Crema de legumbres y verduras', 'Primero', 'Crema de legumbres y verduras (300-250-200 gr)', 2),
('Patata hervida + espinacas y zanahoria', 'Primero', 'Patata hervida + espinacas y zanahoria (300-250-200 gr)', 2),
('Guisantes con jamón de pavo sem3', 'Primero', 'Guisantes con jamón de pavo (1bol - 3/4bol - 1/2 bol)', 2),
('Coliflor al vapor con pimentón', 'Primero', 'Coliflor al vapor con pimentón (300-250-200 gr)', 2);

-- Segundos platos
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Huevos revueltos', 'Segundo', 'Huevos revueltos (180 gr-150 gr-100 gr)', 2),
('Escalopa de soja', 'Segundo', 'Escalopa de soja (3 u-2 u-2 u)', 2),
('Muslo de pollo al horno', 'Segundo', 'Muslo de pollo al horno (2 u-1 u-1 u)', 2),
('Nuggets de pollo', 'Segundo', 'Nuggets de pollo (6 u-4 u-4 u)', 2),
('Tortilla de queso', 'Segundo', 'Tortilla de queso (2 u-1 u-1 u)', 2),
('Merluza en salsa de puerro', 'Segundo', 'Merluza en salsa de puerro (2 u-1 u-1 u)', 2),
('Guiso de pavo con verduras', 'Segundo', 'Guiso de pavo con verduras (200 gr-140 gr-140 gr)', 2);

-- Guarniciones
INSERT INTO dishes (name, category, description, clinic_id)
VALUES 
('Patatas asadas con especias sem3', 'Guarnición', 'Patatas asadas con especias (150 gr-100 gr-50 gr)', 2),
('Patatas fritas sem3', 'Guarnición', 'Patatas fritas (150 gr-100 gr-50 gr)', 2),
('Dados de boniato', 'Guarnición', 'Dados de boniato (150 gr-100 gr-50 gr)', 2),
('Tomate natural sem3', 'Guarnición', 'Tomate natural (150 gr-100 gr-50 gr)', 2),
('Ensalada mixta sem3', 'Guarnición', 'Ensalada mixta (150 gr-100 gr-50 gr)', 2),
('Puré de calabaza', 'Guarnición', 'Puré de calabaza (150 gr-100 gr-50 gr)', 2),
('Arroz blanco sem3', 'Guarnición', 'Arroz blanco (150 gr-100 gr-50 gr)', 2);

-- 2. Obtener los IDs de los platos insertados
-- Primeros platos
SET @macedonia_verduras_id = (SELECT id FROM dishes WHERE name = 'Macedonia de verduras sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @judias_salteadas_id = (SELECT id FROM dishes WHERE name = 'Judías verdes salteadas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tomate_maiz_id = (SELECT id FROM dishes WHERE name = 'Tomate, maíz, queso y aceitunas' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @crema_legumbres_id = (SELECT id FROM dishes WHERE name = 'Crema de legumbres y verduras' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @patata_espinacas_id = (SELECT id FROM dishes WHERE name = 'Patata hervida + espinacas y zanahoria' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @guisantes_jamon_id = (SELECT id FROM dishes WHERE name = 'Guisantes con jamón de pavo sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @coliflor_vapor_id = (SELECT id FROM dishes WHERE name = 'Coliflor al vapor con pimentón' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Segundos platos
SET @huevos_revueltos_id = (SELECT id FROM dishes WHERE name = 'Huevos revueltos' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @escalopa_soja_id = (SELECT id FROM dishes WHERE name = 'Escalopa de soja' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @muslo_pollo_id = (SELECT id FROM dishes WHERE name = 'Muslo de pollo al horno' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @nuggets_pollo_id = (SELECT id FROM dishes WHERE name = 'Nuggets de pollo' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tortilla_queso_id = (SELECT id FROM dishes WHERE name = 'Tortilla de queso' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @merluza_puerro_id = (SELECT id FROM dishes WHERE name = 'Merluza en salsa de puerro' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @guiso_pavo_id = (SELECT id FROM dishes WHERE name = 'Guiso de pavo con verduras' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- Guarniciones
SET @patatas_asadas_id = (SELECT id FROM dishes WHERE name = 'Patatas asadas con especias sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @patatas_fritas_id = (SELECT id FROM dishes WHERE name = 'Patatas fritas sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @dados_boniato_id = (SELECT id FROM dishes WHERE name = 'Dados de boniato' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @tomate_natural_id = (SELECT id FROM dishes WHERE name = 'Tomate natural sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @ensalada_mixta_id = (SELECT id FROM dishes WHERE name = 'Ensalada mixta sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @pure_calabaza_id = (SELECT id FROM dishes WHERE name = 'Puré de calabaza' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);
SET @arroz_blanco_id = (SELECT id FROM dishes WHERE name = 'Arroz blanco sem3' AND clinic_id = 2 ORDER BY id DESC LIMIT 1);

-- 3. Insertar las relaciones en la tabla menu_dishes para la semana 3
-- Lunes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @macedonia_verduras_id, 1, 3, 1),
(@menu_id, @huevos_revueltos_id, 1, 3, 2),
(@menu_id, @patatas_asadas_id, 1, 3, 3);

-- Martes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @judias_salteadas_id, 2, 3, 1),
(@menu_id, @escalopa_soja_id, 2, 3, 2),
(@menu_id, @patatas_fritas_id, 2, 3, 3);

-- Miércoles
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @tomate_maiz_id, 3, 3, 1),
(@menu_id, @muslo_pollo_id, 3, 3, 2),
(@menu_id, @dados_boniato_id, 3, 3, 3);

-- Jueves
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @crema_legumbres_id, 4, 3, 1),
(@menu_id, @nuggets_pollo_id, 4, 3, 2),
(@menu_id, @tomate_natural_id, 4, 3, 3);

-- Viernes
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @patata_espinacas_id, 5, 3, 1),
(@menu_id, @tortilla_queso_id, 5, 3, 2),
(@menu_id, @ensalada_mixta_id, 5, 3, 3);

-- Sábado
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @guisantes_jamon_id, 6, 3, 1),
(@menu_id, @merluza_puerro_id, 6, 3, 2),
(@menu_id, @pure_calabaza_id, 6, 3, 3);

-- Domingo
INSERT INTO menu_dishes (menu_id, dish_id, day_of_week, week_number, dish_order)
VALUES
(@menu_id, @coliflor_vapor_id, 7, 3, 1),
(@menu_id, @guiso_pavo_id, 7, 3, 2),
(@menu_id, @arroz_blanco_id, 7, 3, 3);

-- Mostrar un mensaje de confirmación
SELECT 'Menú de cenas de la Semana 3 para la clínica Korian Ita insertado correctamente' AS mensaje;
