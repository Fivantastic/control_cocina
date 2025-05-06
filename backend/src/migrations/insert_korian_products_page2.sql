-- Script para insertar productos de la segunda página para la clínica Korian Ita (ID 2)

-- Obtener los IDs de los tipos de productos para Korian Ita
SET @congelado_id = (SELECT id FROM product_types WHERE name = 'CONGELADO' AND clinic_id = 2);
SET @fresco_id = (SELECT id FROM product_types WHERE name = 'FRESCO' AND clinic_id = 2);
SET @seco_id = (SELECT id FROM product_types WHERE name = 'SECO' AND clinic_id = 2);
SET @conserva_id = (SELECT id FROM product_types WHERE name = 'CONSERVA' AND clinic_id = 2);

-- Obtener los IDs de las unidades para Korian Ita
SET @kg_id = (SELECT id FROM units WHERE abbreviation = 'KG' AND clinic_id = 2);
SET @caj_id = (SELECT id FROM units WHERE abbreviation = 'CAJ' AND clinic_id = 2);
SET @ud_id = (SELECT id FROM units WHERE abbreviation = 'UD' AND clinic_id = 2);
SET @rac_id = (SELECT id FROM units WHERE abbreviation = 'UN' AND clinic_id = 2);
SET @bol_id = (SELECT id FROM units WHERE abbreviation = 'BOL' AND clinic_id = 2);

-- Insertar productos del inventario de Korian Ita (segunda página)
INSERT INTO products (
    name,
    code,
    type_id,
    purchase_unit_id,
    unit_quantity,
    base_unit_id,
    theoretical_stock,
    actual_stock,
    minimum_stock,
    price,
    notes,
    clinic_id
) VALUES
-- 1. CREMA DE LEGUMBRES APETITO
(
    'CREMA DE LEGUMBRES APETITO',
    '7004880',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    8,
    5,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 2. CREMA DE VERDURAS BAJA EN SAL
(
    'CREMA DE VERDURAS BAJA EN SAL',
    '7004883',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    20,
    5,
    NULL,
    'Caja 4,32KG (16x270g)',
    2
),
-- 3. CREMA DE ZANAHORIA APETITO SIN LACTOSA
(
    'CREMA DE ZANAHORIA APETITO SIN LACTOSA',
    '7004887',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    1,
    5,
    NULL,
    'Caja 4,32 KG (16x270g)',
    2
),
-- 4. CREMA SETAS BOCATTO DI CARDINALE
(
    'CREMA SETAS BOCATTO DI CARDINALE',
    '7000904',
    @congelado_id,
    @caj_id,
    6,
    @rac_id,
    NULL,
    NULL,
    2,
    NULL,
    '4 BOLSAS x 1,50 KG',
    2
),
-- 5. CREMA DE GUISANTES
(
    'CREMA DE GUISANTES',
    NULL,
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    NULL,
    2,
    NULL,
    NULL,
    2
),
-- 6. CREMA DE BRÓCOLI
(
    'CREMA DE BRÓCOLI',
    NULL,
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    2,
    1,
    NULL,
    NULL,
    2
),
-- 7. CROQUETA DE JAMÓN
(
    'CROQUETA DE JAMÓN',
    NULL,
    @congelado_id,
    @bol_id,
    1,
    @kg_id,
    NULL,
    6,
    2,
    NULL,
    NULL,
    2
),
-- 8. CORDÓN BLEU DE PAVO
(
    'CORDÓN BLEU DE PAVO',
    NULL,
    @congelado_id,
    @caj_id,
    4,
    @ud_id,
    NULL,
    3.5,
    1,
    NULL,
    NULL,
    2
),
-- 9. ESTOFADO DE PAVO CON VERDURAS
(
    'ESTOFADO DE PAVO CON VERDURAS',
    NULL,
    @congelado_id,
    @bol_id,
    1,
    @rac_id,
    NULL,
    2,
    1,
    NULL,
    NULL,
    2
),
-- 10. ESCALOPA DE SOJA PRECOCINADA
(
    'ESCALOPA DE SOJA PRECOCINADA',
    '7003171',
    @congelado_id,
    @caj_id,
    3,
    @rac_id,
    NULL,
    4.25,
    2,
    NULL,
    'Caja 3 KG (48 X 62 GR)',
    2
),
-- 11. ESPINACAS A LA CREMA APETITO
(
    'ESPINACAS A LA CREMA APETITO',
    '7003170',
    @congelado_id,
    @caj_id,
    4.8,
    @rac_id,
    NULL,
    2.17,
    1,
    NULL,
    'Caja 4,800 KG (16x300 g)',
    2
),
-- 12. ESPINACAS Y ZANAHORIA AL VAPOR APETITO
(
    'ESPINACAS Y ZANAHORIA AL VAPOR APETITO',
    '7004700',
    @congelado_id,
    @caj_id,
    3,
    @kg_id,
    NULL,
    2.5,
    1,
    NULL,
    'Caja 3 KG',
    2
),
-- 13. ESPIRALES DE PASTA DE MAÍZ Y GARBANZO HERVIDOS
(
    'ESPIRALES DE PASTA DE MAÍZ Y GARBANZO HERVIDOS',
    '7003370',
    @congelado_id,
    @bol_id,
    1.5,
    @bol_id,
    NULL,
    1.25,
    1,
    NULL,
    'bolsa 1,5 kg',
    2
),
-- 14. FILETE DE BACALAO EMPANADO APETITO
(
    'FILETE DE BACALAO EMPANADO APETITO',
    '7003448',
    @congelado_id,
    @caj_id,
    2.88,
    @ud_id,
    NULL,
    3,
    1,
    NULL,
    'Caja 2,88 KG (36x80g)',
    2
),
-- 15. FILETE DE BACALAO PLANCHA
(
    'FILETE DE BACALAO PLANCHA',
    NULL,
    @congelado_id,
    @caj_id,
    5,
    @ud_id,
    NULL,
    1.5,
    1,
    NULL,
    '50 UND CAJA',
    2
),
-- 16. FALAFEL
(
    'FALAFEL',
    NULL,
    @congelado_id,
    @bol_id,
    1,
    @kg_id,
    NULL,
    1,
    0.5,
    NULL,
    NULL,
    2
),
-- 17. FILETE DE LIMANDA EMPANADO APETITO
(
    'FILETE DE LIMANDA EMPANADO APETITO',
    '7003471',
    @congelado_id,
    @caj_id,
    3.12,
    @ud_id,
    NULL,
    1,
    1,
    NULL,
    'Caja 3,12 KG (24x130 g)',
    2
),
-- 18. FILETE DE SALMÓN SIN SAL AÑADIDA APETITO
(
    'FILETE DE SALMÓN SIN SAL AÑADIDA APETITO',
    '7003436',
    @congelado_id,
    @caj_id,
    2.56,
    @ud_id,
    NULL,
    1.2,
    1,
    NULL,
    'Caja 2,56 KG (32x80 g)',
    2
),
-- 19. FOGONERO A LA PLANCHA APETITO
(
    'FOGONERO A LA PLANCHA APETITO',
    '7004461',
    @congelado_id,
    @caj_id,
    5,
    @ud_id,
    NULL,
    1.2,
    1,
    NULL,
    'Caja 5KG (50x100g)',
    2
),
-- 20. GARBANZOS ESTOFADOS CON VERDURAS APETITO
(
    'GARBANZOS ESTOFADOS CON VERDURAS APETITO',
    '7004438',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    2,
    1,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 21. GARBANZOS CON JUDÍAS VERDES
(
    'GARBANZOS CON JUDÍAS VERDES',
    NULL,
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    1.96,
    1,
    NULL,
    NULL,
    2
),
-- 22. GRATÉN DE PATATAS Y ESPINACAS APETITO
(
    'GRATÉN DE PATATAS Y ESPINACAS APETITO',
    '7003384',
    @congelado_id,
    @caj_id,
    4.8,
    @rac_id,
    NULL,
    23,
    5,
    NULL,
    'Caja 4,80 KG (16x400g)',
    2
),
-- 23. GUISANTES SALTEADOS CON JAMÓN DE PAVO APETITO
(
    'GUISANTES SALTEADOS CON JAMÓN DE PAVO APETITO',
    '7004822',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    6,
    2,
    NULL,
    'Caja 6 KILOS (4 bolsas x 1500g)',
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos de la segunda página para la clínica Korian Ita insertados correctamente' AS mensaje;
