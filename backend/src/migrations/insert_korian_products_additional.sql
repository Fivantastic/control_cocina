-- Script para insertar productos adicionales (secos y bebidas) para la clínica Korian Ita (ID 2)

-- Obtener los IDs de los tipos de productos para Korian Ita
SET @congelado_id = (SELECT id FROM product_types WHERE name = 'CONGELADO' AND clinic_id = 2 LIMIT 1);
SET @fresco_id = (SELECT id FROM product_types WHERE name = 'FRESCO' AND clinic_id = 2 LIMIT 1);
SET @seco_id = (SELECT id FROM product_types WHERE name = 'SECO' AND clinic_id = 2 LIMIT 1);
SET @conserva_id = (SELECT id FROM product_types WHERE name = 'CONSERVA' AND clinic_id = 2 LIMIT 1);
SET @lacteos_id = (SELECT id FROM product_types WHERE name = 'LÁCTEOS' AND clinic_id = 2 LIMIT 1);

-- Insertar el tipo BEBIDAS si no existe
INSERT IGNORE INTO product_types (name, clinic_id) VALUES ('BEBIDAS', 2);
SET @bebidas_id = (SELECT id FROM product_types WHERE name = 'BEBIDAS' AND clinic_id = 2 LIMIT 1);

-- Obtener los IDs de las unidades para Korian Ita
SET @kg_id = (SELECT id FROM units WHERE abbreviation = 'KG' AND clinic_id = 2 LIMIT 1);
SET @caj_id = (SELECT id FROM units WHERE abbreviation = 'CAJ' AND clinic_id = 2 LIMIT 1);
SET @ud_id = (SELECT id FROM units WHERE abbreviation = 'UD' AND clinic_id = 2 LIMIT 1);
SET @rac_id = (SELECT id FROM units WHERE abbreviation = 'UN' AND clinic_id = 2 LIMIT 1);
SET @gar_id = (SELECT id FROM units WHERE abbreviation = 'GAR' AND clinic_id = 2 LIMIT 1);
SET @bte_id = (SELECT id FROM units WHERE abbreviation = 'BTE' AND clinic_id = 2 LIMIT 1);
SET @pza_id = (SELECT id FROM units WHERE abbreviation = 'PZA' AND clinic_id = 2 LIMIT 1);
SET @lat_id = (SELECT id FROM units WHERE abbreviation = 'LAT' AND clinic_id = 2 LIMIT 1);
SET @paq_id = (SELECT id FROM units WHERE abbreviation = 'PAQ' AND clinic_id = 2 LIMIT 1);

-- Insertar unidades que puedan faltar
INSERT IGNORE INTO units (name, abbreviation, clinic_id) VALUES ('Bandeja', 'BAN', 2);
SET @ban_id = (SELECT id FROM units WHERE abbreviation = 'BAN' AND clinic_id = 2 LIMIT 1);

INSERT IGNORE INTO units (name, abbreviation, clinic_id) VALUES ('Bolsa', 'BOL', 2);
SET @bol_id = (SELECT id FROM units WHERE abbreviation = 'BOL' AND clinic_id = 2 LIMIT 1);

-- Insertar productos adicionales del inventario de Korian Ita
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
-- 1. NUECES SIPIEL BOLSA 1 KG
(
    'NUECES SIPIEL BOLSA 1 KG',
    NULL,
    @seco_id,
    @bol_id,
    1,
    @bol_id,
    2.000,
    0.5,
    1,
    14.23,
    'Media bolsa',
    2
),
-- 2. PAN MOLDE 800GR 24
(
    'PAN MOLDE 800GR 24',
    'REBAN CJ SPAR2',
    @seco_id,
    @caj_id,
    24,
    @ud_id,
    0.000,
    1.5,
    1,
    9.11,
    '1 unidad y media',
    2
),
-- 3. PIÑA EN SU JUGO LATA 3
(
    'PIÑA EN SU JUGO LATA 3',
    'KG (PE 1790GR)',
    @conserva_id,
    @lat_id,
    1,
    @lat_id,
    2.000,
    2,
    1,
    8.14,
    NULL,
    2
),
-- 4. SAL SOBRE 1GR ANAG. SOX
(
    'SAL SOBRE 1GR ANAG. SOX',
    'C 2000UD',
    @seco_id,
    @caj_id,
    2000,
    @ud_id,
    1.000,
    0.5,
    1,
    8.41,
    'Media caja',
    2
),
-- 5. TOMATE NATURAL 395GR
(
    'TOMATE NATURAL 395GR',
    'ORLANDO 1/6UNID.',
    @conserva_id,
    @ban_id,
    6,
    @ud_id,
    2.600,
    NULL,
    1,
    42.41,
    NULL,
    2
),
-- 6. ZANAHORIA RALLADA LATA
(
    'ZANAHORIA RALLADA LATA',
    '3KG/5 (PE 1500 G',
    @conserva_id,
    @lat_id,
    1,
    @lat_id,
    1.000,
    2,
    1,
    2.99,
    NULL,
    2
),
-- 7. AGUA PET 330 ML PAQ. 20
(
    'AGUA PET 330 ML PAQ. 20',
    'UDS',
    @bebidas_id,
    @paq_id,
    20,
    @ud_id,
    5.200,
    60,
    10,
    2.88,
    NULL,
    2
),
-- 8. AGUA PLÁSTICO PET 1,5LT.
(
    'AGUA PLÁSTICO PET 1,5LT.',
    'PAQ.6 BOTELLA',
    @bebidas_id,
    @paq_id,
    6,
    @ud_id,
    86.000,
    24,
    12,
    2.16,
    NULL,
    2
),
-- 9. LECHE REF. MELOCOTÓN
(
    'LECHE REF. MELOCOTÓN',
    'BRIK 1L CJ 12BRK',
    @bebidas_id,
    @caj_id,
    12,
    @ud_id,
    0.300,
    5,
    3,
    12.50,
    NULL,
    2
),
-- 10. NÉCTAR S&Z
(
    'NÉCTAR S&Z',
    'MANZANA/NARANJ D.SIMON',
    @bebidas_id,
    @caj_id,
    1,
    @caj_id,
    0.000,
    NULL,
    1,
    10.13,
    NULL,
    2
),
-- 11. NÉCTAR S&Z MELOCOTÓN
(
    'NÉCTAR S&Z MELOCOTÓN',
    'D.SIMON BOT.1L',
    @bebidas_id,
    @caj_id,
    1,
    @caj_id,
    1.000,
    5,
    2,
    10.79,
    NULL,
    2
),
-- 12. NÉCTAR S&Z NARANJA
(
    'NÉCTAR S&Z NARANJA',
    'BOT.1,5L DON SIMÓN-',
    @bebidas_id,
    @caj_id,
    1,
    @caj_id,
    1.000,
    8,
    2,
    12.39,
    NULL,
    2
),
-- 13. ZUMO MANZANA BRIK 1L
(
    'ZUMO MANZANA BRIK 1L',
    'CAJA 12 BRIKS',
    @bebidas_id,
    @caj_id,
    12,
    @ud_id,
    0.900,
    7,
    2,
    15.37,
    NULL,
    2
),
-- 14. ZUMO MELOCOTÓN UVA
(
    'ZUMO MELOCOTÓN UVA',
    'MANZANA BRIK 1L C-12',
    @bebidas_id,
    @caj_id,
    12,
    @ud_id,
    0.000,
    NULL,
    1,
    16.81,
    NULL,
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos adicionales (secos y bebidas) para la clínica Korian Ita insertados correctamente' AS mensaje;
