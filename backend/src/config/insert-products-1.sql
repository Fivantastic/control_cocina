-- Insertar productos de la primera página
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
    'ALBONDIGAS AVE 25GR CONGELADO C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    9.500,
    NULL,
    22.56
),
(
    'ANILLA POTON ROMANA 40/60 CONG.C-6K',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.800,
    NULL,
    27.53
),
(
    'ARITOS POTA REBOZADOS 0% GLASEO CJ 4KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    4.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    8.000,
    NULL,
    23.24
),
(
    'AVE RAGOUT CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    8.000,
    NULL,
    23.67
);
