-- Insertar productos de la tercera página
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
    'PULPO COCIDO CONG C-3KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    51.53
),
(
    'RAPE COLA CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    51.53
),
(
    'RAPE COLAS N3 300/500 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    51.53
),
(
    'ROSADA FILETE 170/220 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    19.81
),
(
    'SALMON FILETE C/P CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    23.67
),
(
    'SALMON SUPREMAS CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    23.67
),
(
    'SAN JACOBO 130GR CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    19.81
),
(
    'SEPIA LIMPIA CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    22.91
),
(
    'SOLOMILLO CERDO CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    19.81
),
(
    'SOPA JULIANA CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    5.91
),
(
    'SUPREMAS MERLUZA 170/220 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    19.81
),
(
    'TERNERA RAGOUT CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    23.67
),
(
    'ZANAHORIA BABY CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    5.91
),
(
    'ACEITE GIRASOL REFINADO 5L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    11.90
),
(
    'ACEITE OLIVA SUAVE 5L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    51.53
),
(
    'ACEITE OLIVA VIRGEN EXTRA 5L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    51.53
),
(
    'ACEITUNA NEGRA RODAJA 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    14.03
),
(
    'ACEITUNA RELLENA ANCHOA 1.9KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.90,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.900,
    NULL,
    11.90
),
(
    'ACEITUNA VERDE RODAJA 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    14.03
),
(
    'AGUA MINERAL 1.5L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.50,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.500,
    NULL,
    0.52
),
(
    'AGUA MINERAL 33CL',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.33,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.330,
    NULL,
    0.42
),
(
    'AGUA MINERAL 50CL',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.50,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.500,
    NULL,
    0.42
),
(
    'AGUA MINERAL 5L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    1.05
),
(
    'AGUA MINERAL CON GAS 1L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    1.05
),
(
    'AGUA MINERAL S/GAS 1L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    0.84
),
(
    'AJOS GRANULADO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
);
