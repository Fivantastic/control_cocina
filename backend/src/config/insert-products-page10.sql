-- Insertar productos de la décima página
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
    'PAPEL FILM 300M',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    19.81
),
(
    'PAPEL HIGIENICO',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    0.42
),
(
    'PAPEL HORNO 40X60',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    11.90
),
(
    'PAPEL MANOS',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    1.75
),
(
    'PASTILLA LAVAVAJILLAS',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    0.21
),
(
    'QUITAGRASAS 750ML',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.75,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    0.750,
    NULL,
    4.91
),
(
    'ROLLO COCINA',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    1.000,
    NULL,
    2.45
),
(
    'SAL LAVAVAJILLAS 2KG',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.000,
    NULL,
    2.45
),
(
    'SERVILLETA 30X30',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.00,
    (SELECT id FROM units WHERE abbreviation = 'UN'),
    100.000,
    NULL,
    2.45
),
(
    'SUAVIZANTE 5L',
    (SELECT id FROM product_types WHERE name = 'LIMPIEZA'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    5.000,
    NULL,
    11.90
);
