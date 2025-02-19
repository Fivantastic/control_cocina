-- Insertar productos de la séptima página
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
    'SALSA TERIYAKI 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    8.63
),
(
    'SALSA TOMATE 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    6.95
),
(
    'SALSA WORCESTER 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    11.90
),
(
    'SETAS TROCEADAS 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    11.90
),
(
    'SOJA SALSA 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    4.91
),
(
    'SPAGHETTI 5KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    14.03
),
(
    'TABASCO 60ML',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.06,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.060,
    NULL,
    4.91
),
(
    'TALLARINES 5KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    14.03
),
(
    'TAPIOCA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    8.63
),
(
    'TOMILLO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'TOMATE FRITO 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    6.95
),
(
    'TOMATE NATURAL TRITURADO 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    4.91
),
(
    'TOMATE NATURAL TROCEADO 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    4.91
),
(
    'VINAGRE BALSAMICO 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    4.91
),
(
    'VINAGRE BLANCO 5L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    8.63
),
(
    'VINAGRE JEREZ 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    4.91
),
(
    'VINAGRE MODENA 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    8.63
),
(
    'VINO BLANCO COCINA 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    2.45
),
(
    'VINO TINTO COCINA 1L',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    2.45
);
