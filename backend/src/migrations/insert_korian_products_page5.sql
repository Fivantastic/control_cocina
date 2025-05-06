-- Script para insertar productos de la quinta página para la clínica Korian Ita (ID 2)

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

-- Insertar productos del inventario de Korian Ita (quinta página)
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
-- 1. SALMÓN SALTEADO CON VERDURAS Y ACEITUNAS APETITO
(
    'SALMÓN SALTEADO CON VERDURAS Y ACEITUNAS APETITO',
    '7003697',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    1.5,
    1,
    NULL,
    'Caja 6,00 KG (4x1500g)',
    2
),
-- 2. SOPA DE FIDEOS CON VERDURA Y CARNE DE AVE APETITO
(
    'SOPA DE FIDEOS CON VERDURA Y CARNE DE AVE APETITO',
    '7004357',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    4.31,
    1,
    NULL,
    'Caja 4,320 KG (16x270 g)',
    2
),
-- 3. SOPA JULIANA DE VERDURAS APETITO
(
    'SOPA JULIANA DE VERDURAS APETITO',
    '7004390',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    NULL,
    1,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 4. TIRAS DE CARNE DE VACUNO EN SALSA DE CHAMPIÑONES APETITO
(
    'TIRAS DE CARNE DE VACUNO EN SALSA DE CHAMPIÑONES APETITO',
    '7003390',
    @congelado_id,
    @caj_id,
    3.84,
    @rac_id,
    NULL,
    1,
    1,
    NULL,
    'Caja 3,84 KG (16x240 g)',
    2
),
-- 5. TIRAS DE PAVO A LA PLANCHA CON VERDURAS EN SALSA CREMOSA APETITO
(
    'TIRAS DE PAVO A LA PLANCHA CON VERDURAS EN SALSA CREMOSA APETITO',
    '7003432',
    @congelado_id,
    @caj_id,
    3.84,
    @rac_id,
    NULL,
    2.13,
    1,
    NULL,
    'Caja 3,84 KG',
    2
),
-- 6. TORTILLA DE QUESO APETITO
(
    'TORTILLA DE QUESO APETITO',
    '7004464',
    @congelado_id,
    @caj_id,
    3.36,
    @ud_id,
    NULL,
    3,
    1,
    NULL,
    'Caja 3,36 KG (24 Unidades/140g)',
    2
),
-- 7. TORTILLA FRANCESA PALACIOS CON SAL
(
    'TORTILLA FRANCESA PALACIOS CON SAL',
    '7100053',
    @congelado_id,
    @caj_id,
    3.4,
    @bol_id,
    NULL,
    3,
    1,
    NULL,
    '40 X 85G',
    2
),
-- 8. TORTILLA LIPRENA PATATA C/CALABACÍN
(
    'TORTILLA LIPRENA PATATA C/CALABACÍN',
    '7100052',
    @congelado_id,
    @caj_id,
    8,
    @ud_id,
    NULL,
    7,
    2,
    NULL,
    '10 X 800G',
    2
),
-- 9. TRIÁNGULO DE PATATAS Y QUESO PRECOCINADO
(
    'TRIÁNGULO DE PATATAS Y QUESO PRECOCINADO',
    '7003769',
    @congelado_id,
    @caj_id,
    2.4,
    @ud_id,
    NULL,
    2.25,
    1,
    NULL,
    '2,40 kg (48x50g)',
    2
),
-- 10. VEGETALES AL GRILL APETITO
(
    'VEGETALES AL GRILL APETITO',
    '7003727',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    4.1,
    1,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5 KG)',
    2
),
-- 11. VERDURAS VARIADAS AL VAPOR SIN SAL APETITO
(
    'VERDURAS VARIADAS AL VAPOR SIN SAL APETITO',
    '7003013',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    4,
    1,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5kg)',
    2
),
-- 12. ZANAHORIA CON GUISANTES AL VAPOR SIN SAL APETITO
(
    'ZANAHORIA CON GUISANTES AL VAPOR SIN SAL APETITO',
    '7003912',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    5.5,
    1,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5kg)',
    2
),
-- 13. ZANAHORIAS AL VAPOR SIN SAL APETITO
(
    'ZANAHORIAS AL VAPOR SIN SAL APETITO',
    '7003919',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    5.5,
    1,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5kg)',
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos de la quinta página para la clínica Korian Ita insertados correctamente' AS mensaje;
