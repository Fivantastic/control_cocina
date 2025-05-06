-- Script para insertar productos de la tercera página para la clínica Korian Ita (ID 2)

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

-- Insertar productos del inventario de Korian Ita (tercera página)
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
-- 1. HAMBURGUESA DE CARNE DE VACUNO A LA PLANCHA APETITO
(
    'HAMBURGUESA DE CARNE DE VACUNO A LA PLANCHA APETITO',
    NULL,
    @congelado_id,
    @caj_id,
    3.6,
    @ud_id,
    NULL,
    NULL,
    10,
    NULL,
    'Caja 3,6 KG (40x90 g)',
    2
),
-- 2. HAMBURGUESA DE VACUNO, QUESO Y VERDURA A LA PLANCHA APETITO
(
    'HAMBURGUESA DE VACUNO, QUESO Y VERDURA A LA PLANCHA APETITO',
    NULL,
    @congelado_id,
    @caj_id,
    4.8,
    @ud_id,
    NULL,
    1.27,
    10,
    NULL,
    'Caja 4,80KG (30x125g) GRIEGA',
    2
),
-- 3. HOJALDRE AL QUESO DE CABRA DAVIGEL
(
    'HOJALDRE AL QUESO DE CABRA DAVIGEL',
    '7100002',
    @congelado_id,
    @caj_id,
    4.2,
    @rac_id,
    NULL,
    11,
    5,
    NULL,
    'C4 20 KG (42x100g)',
    2
),
-- 4. HUEVOS REVUELTOS APETITO
(
    'HUEVOS REVUELTOS APETITO',
    '7003373',
    @congelado_id,
    @caj_id,
    4.8,
    @bol_id,
    NULL,
    1,
    1,
    NULL,
    'Caja 4,8 KG (16x300 g)',
    2
),
-- 5. JAMONCITOS DE POLLO ASADOS APETITO
(
    'JAMONCITOS DE POLLO ASADOS APETITO',
    '7004430',
    @congelado_id,
    @caj_id,
    3.24,
    @ud_id,
    NULL,
    3.35,
    1,
    NULL,
    'Caja 3,24 KG (2 bolsas/1,62Kg)',
    2
),
-- 6. JUDÍAS VERDE APETITO
(
    'JUDÍAS VERDE APETITO',
    '7003767',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    2.5,
    1,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5KG)',
    2
),
-- 7. JUDÍAS VERDES SALTEADAS BAJAS EN SAL APETITO
(
    'JUDÍAS VERDES SALTEADAS BAJAS EN SAL APETITO',
    '7004434',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    6.5,
    2,
    NULL,
    'Caja 6 KG',
    2
),
-- 8. JUDÍAS VERDES Y ESPÁRRAGOS TRIGUEROS SALTEADOS APETITO
(
    'JUDÍAS VERDES Y ESPÁRRAGOS TRIGUEROS SALTEADOS APETITO',
    '7004705',
    @congelado_id,
    @caj_id,
    3,
    @kg_id,
    NULL,
    0.5,
    1,
    NULL,
    'Caja 3 KG',
    2
),
-- 9. LASAÑA VEGETAL
(
    'LASAÑA VEGETAL',
    '7003382',
    @congelado_id,
    @caj_id,
    6.4,
    @rac_id,
    NULL,
    19,
    5,
    NULL,
    '6,40 kg (16x400g)',
    2
),
-- 10. LENTEJAS ESTOFADAS CON ARROZ APETITO
(
    'LENTEJAS ESTOFADAS CON ARROZ APETITO',
    '7004482',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    3.56,
    1,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 11. LENTEJAS ESTOFADAS CON CHORIZO APETITO
(
    'LENTEJAS ESTOFADAS CON CHORIZO APETITO',
    '7004440',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    12,
    5,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 12. LENTEJAS ESTOFADAS CON VERDURAS BAJAS EN SAL APETITO
(
    'LENTEJAS ESTOFADAS CON VERDURAS BAJAS EN SAL APETITO',
    '7004431',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    27,
    5,
    NULL,
    'Caja 4,320 KG (16x270 g)',
    2
),
-- 13. LOMO PLANCHA
(
    'LOMO PLANCHA',
    NULL,
    @congelado_id,
    @caj_id,
    1,
    @rac_id,
    NULL,
    2.58,
    1,
    NULL,
    '1 CAJ',
    2
),
-- 14. MACARRONES HERVIDOS
(
    'MACARRONES HERVIDOS',
    NULL,
    @congelado_id,
    @caj_id,
    3,
    @kg_id,
    NULL,
    1.25,
    1,
    NULL,
    'Caja 3 KILOS',
    2
),
-- 15. MACARRONES CON ATÚN Y TOMATE APETITO
(
    'MACARRONES CON ATÚN Y TOMATE APETITO',
    '7004427',
    @congelado_id,
    @caj_id,
    4,
    @rac_id,
    NULL,
    1.67,
    1,
    NULL,
    'Caja 4,00 KG (16x250 gr)',
    2
),
-- 16. MACEDONIA DE VERDURAS BONDUELLE MINUTE
(
    'MACEDONIA DE VERDURAS BONDUELLE MINUTE',
    '7100088',
    @congelado_id,
    @caj_id,
    10,
    @kg_id,
    NULL,
    1,
    1,
    NULL,
    'Caja 10 KG (4 x 2,5 KG)',
    2
),
-- 17. MERLUZA A LA RIOJANA APETITO
(
    'MERLUZA A LA RIOJANA APETITO',
    '7004471',
    @congelado_id,
    @caj_id,
    3.36,
    @bol_id,
    NULL,
    2,
    1,
    NULL,
    'Caja 3,36 KG (16 x 210G)',
    2
),
-- 18. MERLUZA DEL CABO EN SALSA DE PUERRO APETITO
(
    'MERLUZA DEL CABO EN SALSA DE PUERRO APETITO',
    '7004467',
    @congelado_id,
    @caj_id,
    3.52,
    @rac_id,
    NULL,
    6,
    2,
    NULL,
    'Caja 3,52 KG (16x220g)',
    2
),
-- 19. MERLUZA DEL PACÍFICO CON AJO Y PEREJIL APETITO
(
    'MERLUZA DEL PACÍFICO CON AJO Y PEREJIL APETITO',
    '7004841',
    @congelado_id,
    @caj_id,
    3.36,
    @rac_id,
    NULL,
    2,
    1,
    NULL,
    'Caja 3,36 KG (24x140 g)',
    2
),
-- 20. MERLUZA A LA TOSCANA
(
    'MERLUZA A LA TOSCANA',
    NULL,
    @congelado_id,
    @caj_id,
    3.36,
    @rac_id,
    NULL,
    NULL,
    1,
    NULL,
    NULL,
    2
),
-- 21. MINI RAVIOLIS RELLENOS DE VERDURA CON SALSA DE TOMATE APETITO
(
    'MINI RAVIOLIS RELLENOS DE VERDURA CON SALSA DE TOMATE APETITO',
    '7003349',
    @congelado_id,
    @caj_id,
    5.6,
    @rac_id,
    NULL,
    NULL,
    1,
    NULL,
    'Caja 5,60 KG (16x350g)',
    2
),
-- 22. MUSLO DE POLLO AL HORNO APETITO
(
    'MUSLO DE POLLO AL HORNO APETITO',
    '7004402',
    @congelado_id,
    @caj_id,
    4.5,
    @ud_id,
    NULL,
    1.17,
    1,
    NULL,
    'Caja 4,50 KG (30x150 g)',
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos de la tercera página para la clínica Korian Ita insertados correctamente' AS mensaje;
