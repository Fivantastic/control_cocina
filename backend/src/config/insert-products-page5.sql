-- Insertar productos de la quinta página
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
    'FIDEOS 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    2.45
),
(
    'FLAN HUEVO POLVO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    8.63
),
(
    'GALLETA MARIA 5KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    19.81
),
(
    'GARBANZOS COCIDOS 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    6.95
),
(
    'GUISANTES MUY FINOS 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    6.95
),
(
    'HARINA TRIGO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    1.75
),
(
    'HIERBAS PROVENZA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'HUEVO LIQUIDO 2L',
    (SELECT id FROM product_types WHERE name = 'FRESCO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    2.000,
    NULL,
    8.63
),
(
    'JUDIAS BLANCAS COCIDAS 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    6.95
),
(
    'LAUREL HOJA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'LECHE ENTERA 1L',
    (SELECT id FROM product_types WHERE name = 'FRESCO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    1.75
),
(
    'LECHE UHT ENTERA 1L',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    1.75
),
(
    'LENTEJAS COCIDAS 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    6.95
),
(
    'LEVADURA POLVO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    4.91
),
(
    'MACARRONES 5KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    14.03
),
(
    'MAICENA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    4.91
),
(
    'MAIZ DULCE 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    6.95
),
(
    'MANTEQUILLA 1KG',
    (SELECT id FROM product_types WHERE name = 'FRESCO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'MARGARINA VEGETAL 1KG',
    (SELECT id FROM product_types WHERE name = 'FRESCO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    4.91
),
(
    'MAYONESA 3.6KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.60,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.600,
    NULL,
    19.81
),
(
    'MELOCOTON ALMIBAR 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    8.63
),
(
    'MERMELADA FRESA 3.8KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.80,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.800,
    NULL,
    19.81
),
(
    'MERMELADA MELOCOTON 3.8KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.80,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.800,
    NULL,
    19.81
),
(
    'MOSTAZA 1KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    4.91
),
(
    'NATA LIQUIDA 1L',
    (SELECT id FROM product_types WHERE name = 'FRESCO'),
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'L'),
    1.000,
    NULL,
    4.91
);
