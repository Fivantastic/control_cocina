-- Script para insertar productos secos para la clínica Korian Ita (ID 2)

-- Obtener los IDs de los tipos de productos para Korian Ita
SET @congelado_id = (SELECT id FROM product_types WHERE name = 'CONGELADO' AND clinic_id = 2);
SET @fresco_id = (SELECT id FROM product_types WHERE name = 'FRESCO' AND clinic_id = 2);
SET @seco_id = (SELECT id FROM product_types WHERE name = 'SECO' AND clinic_id = 2);
SET @conserva_id = (SELECT id FROM product_types WHERE name = 'CONSERVA' AND clinic_id = 2);
SET @lacteos_id = (SELECT id FROM product_types WHERE name = 'LÁCTEOS' AND clinic_id = 2);

-- Obtener los IDs de las unidades para Korian Ita
SET @kg_id = (SELECT id FROM units WHERE abbreviation = 'KG' AND clinic_id = 2);
SET @caj_id = (SELECT id FROM units WHERE abbreviation = 'CAJ' AND clinic_id = 2);
SET @ud_id = (SELECT id FROM units WHERE abbreviation = 'UD' AND clinic_id = 2);
SET @rac_id = (SELECT id FROM units WHERE abbreviation = 'UN' AND clinic_id = 2);
SET @bol_id = (SELECT id FROM units WHERE abbreviation = 'BOL' AND clinic_id = 2);
SET @gar_id = (SELECT id FROM units WHERE abbreviation = 'GAR' AND clinic_id = 2);
SET @bte_id = (SELECT id FROM units WHERE abbreviation = 'BTE' AND clinic_id = 2);
SET @pza_id = (SELECT id FROM units WHERE abbreviation = 'PZA' AND clinic_id = 2);
SET @lat_id = (SELECT id FROM units WHERE abbreviation = 'LAT' AND clinic_id = 2);
SET @paq_id = (SELECT id FROM units WHERE abbreviation = 'PAQ' AND clinic_id = 2);

-- Insertar productos secos del inventario de Korian Ita
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
-- 1. ACEITE OLIVA VE 5L
(
    'ACEITE OLIVA VE 5L',
    NULL,
    @seco_id,
    @gar_id,
    1,
    @gar_id,
    1.000,
    0.5,
    1,
    42.07,
    'Media garrafa',
    2
),
-- 2. ACEITE OLIVA VE MO 10ML
(
    'ACEITE OLIVA VE MO 10ML',
    'CJ 250UD',
    @seco_id,
    @caj_id,
    250,
    @ud_id,
    2.000,
    1,
    1,
    22.86,
    NULL,
    2
),
-- 3. ACEITUNA RELLENA PN
(
    'ACEITUNA RELLENA PN',
    '450 GAJA 24UDS',
    @conserva_id,
    @caj_id,
    24,
    @ud_id,
    0.000,
    2,
    1,
    27.43,
    'Stock en botes',
    2
),
-- 4. AGRIO LIMÓN BOTE 500
(
    'AGRIO LIMÓN BOTE 500',
    'ML 12 UDS',
    @conserva_id,
    @bte_id,
    12,
    @ud_id,
    0.800,
    NULL,
    1,
    0.57,
    NULL,
    2
),
-- 5. ARTICULO REGULARIZACIÓN IVA 4%
(
    'ARTICULO REGULARIZACIÓN IVA 4%',
    NULL,
    @seco_id,
    @kg_id,
    1,
    @kg_id,
    9.490,
    NULL,
    0,
    1.00,
    NULL,
    2
),
-- 6. ATÚN ACEITE GIRASOL
(
    'ATÚN ACEITE GIRASOL',
    'RO-1000 C6',
    @conserva_id,
    @pza_id,
    6,
    @ud_id,
    0.000,
    NULL,
    1,
    8.26,
    NULL,
    2
),
-- 7. CACAO PORCIÓN SOBRE
(
    'CACAO PORCIÓN SOBRE',
    '18GR C 50UD',
    @seco_id,
    @caj_id,
    50,
    @ud_id,
    2.000,
    2,
    1,
    10.45,
    NULL,
    2
),
-- 8. CAFÉ DESCAFEINADO
(
    'CAFÉ DESCAFEINADO',
    'SOBRE 2GR CJ 600UD',
    @seco_id,
    @caj_id,
    600,
    @ud_id,
    0.500,
    0.5,
    1,
    38.41,
    'Media caja',
    2
),
-- 9. CEREALES FROSTIES
(
    'CEREALES FROSTIES',
    '500GR C12',
    @seco_id,
    @caj_id,
    12,
    @ud_id,
    1.200,
    10,
    1,
    30.03,
    NULL,
    2
),
-- 10. CEREALES SPECIAL K
(
    'CEREALES SPECIAL K',
    '500 GRS C4UD',
    @seco_id,
    @caj_id,
    4,
    @ud_id,
    0.800,
    5,
    1,
    29.96,
    NULL,
    2
),
-- 11. CHAMPIÑÓN LAMINADO
(
    'CHAMPIÑÓN LAMINADO',
    '3KG PE 1.156KG',
    @conserva_id,
    @lat_id,
    1,
    @lat_id,
    2.000,
    3,
    1,
    8.24,
    NULL,
    2
),
-- 12. COPOS DE AVENA 500 GRS
(
    'COPOS DE AVENA 500 GRS',
    NULL,
    @seco_id,
    @paq_id,
    1,
    @paq_id,
    7.000,
    6,
    2,
    2.35,
    'Stock en cajas',
    2
),
-- 13. CROISSANT CHOCO 45GR
(
    'CROISSANT CHOCO 45GR',
    'CJ 144UD',
    @seco_id,
    @caj_id,
    144,
    @ud_id,
    2.500,
    25,
    1,
    7.94,
    'Stock en bolsas pequeñas',
    2
),
-- 14. GARBANZOS COCIDOS LATA
(
    'GARBANZOS COCIDOS LATA',
    '3 KG 1.850GR',
    @conserva_id,
    @lat_id,
    1,
    @lat_id,
    1.000,
    2,
    1,
    3.45,
    NULL,
    2
),
-- 15. MAGDALENA REDONDA
(
    'MAGDALENA REDONDA',
    '55GR CAJ 144UD',
    @seco_id,
    @caj_id,
    144,
    @ud_id,
    1.600,
    5,
    1,
    6.43,
    'Stock en bolsas',
    2
),
-- 16. MAIZ BTE 500 GR PNE
(
    'MAIZ BTE 500 GR PNE',
    '285GR CJ 12UD',
    @conserva_id,
    @caj_id,
    12,
    @ud_id,
    1.500,
    2,
    1,
    14.19,
    'Stock en latas',
    2
),
-- 17. MERMELADA PORCIÓN 20
(
    'MERMELADA PORCIÓN 20',
    NULL,
    @seco_id,
    @caj_id,
    1,
    @caj_id,
    0.400,
    0.5,
    1,
    24.73,
    'Media caja',
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos secos para la clínica Korian Ita insertados correctamente' AS mensaje;
