-- Insertar productos de la novena página
INSERT INTO products (
    name,
    type_id,
    purchase_unit_id,
    unit_quantity,
    base_unit_id,
    theoretical_stock,
    actual_stock,
    price
) VALUES
(
    'ABRILLANTADOR LAVAVAJILLAS 10L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    10.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    10.000,
    NULL,
    51.53
),
(
    'ALCOHOL 96º 1L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    4.91
),
(
    'AMBIENTADOR SPRAY 750ML',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.75,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.750,
    NULL,
    4.91
),
(
    'AMONIACO PERFUMADO 2L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    3.50
),
(
    'BAYETA AMARILLA',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    1.05
),
(
    'BAYETA AZUL',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    1.05
),
(
    'BAYETA VERDE',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    1.05
),
(
    'BOBINA INDUSTRIAL',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    19.81
),
(
    'BOLSA BASURA 52X60',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    2.45
),
(
    'BOLSA BASURA 85X105',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    4.91
),
(
    'DESENGRASANTE 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    19.81
),
(
    'DETERGENTE LAVADORA 10KG',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    10.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    10.000,
    NULL,
    51.53
),
(
    'DETERGENTE LAVAVAJILLAS 12KG',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    12.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    12.000,
    NULL,
    51.53
),
(
    'ESTROPAJO VERDE',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    0.70
),
(
    'FREGASUELOS 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    11.90
),
(
    'GEL HIDROALCOHOLICO 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    19.81
),
(
    'GEL LAVAMANOS 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    11.90
),
(
    'GUANTES LATEX TALLA L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.000,
    NULL,
    11.90
),
(
    'GUANTES LATEX TALLA M',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.000,
    NULL,
    11.90
),
(
    'GUANTES NITRILO TALLA L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.000,
    NULL,
    14.03
),
(
    'GUANTES NITRILO TALLA M',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.000,
    NULL,
    14.03
),
(
    'JABON LAVAVAJILLAS 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    11.90
),
(
    'LAVAVAJILLAS MANUAL 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    11.90
),
(
    'LEJIA 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    6.95
),
(
    'LIMPIADOR MULTIUSOS 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    11.90
),
(
    'PAPEL ALUMINIO 300M',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    51.53
);
