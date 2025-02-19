-- Insertar productos de la sexta página
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
    'NUEZ MOSCADA MOLIDA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    51.53
),
(
    'OREGANO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'PALITOS CANGREJO 1KG',
    (SELECT id FROM product_types WHERE name = 'FRESCO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'PAN RALLADO 5KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    11.90
),
(
    'PASTA BRICK 250GR',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    0.25,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    0.250,
    NULL,
    4.91
),
(
    'PIMENTON DULCE 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'PIMENTON PICANTE 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'PIMIENTA BLANCA MOLIDA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    51.53
),
(
    'PIMIENTA NEGRA GRANO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    51.53
),
(
    'PIMIENTA NEGRA MOLIDA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    51.53
),
(
    'PIÑA RODAJAS 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    8.63
),
(
    'PURE PATATA COPOS 5KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    19.81
),
(
    'QUESO RALLADO 1KG',
    (SELECT id FROM product_types WHERE name = 'FRESCO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'ROMERO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'SAL FINA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    0.70
),
(
    'SAL GORDA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    0.70
),
(
    'SALSA BARBACOA 2L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    11.90
),
(
    'SALSA BECHAMEL 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    4.91
),
(
    'SALSA BRAVA 2L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    11.90
),
(
    'SALSA CESAR 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    8.63
),
(
    'SALSA COCKTAIL 2L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    11.90
),
(
    'SALSA CURRY 2L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    11.90
),
(
    'SALSA ESPAÑOLA 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    4.91
),
(
    'SALSA KETCHUP 2L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    8.63
),
(
    'SALSA ROQUEFORT 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    8.63
),
(
    'SALSA TARTARA 2L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    11.90
);
