-- Insertar productos de la cuarta página
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
    'ALCAPARRAS 1KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'ALMIDON MAIZ 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    4.91
),
(
    'ANCHOA SALADA 1KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    51.53
),
(
    'ARROZ BOMBA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    4.91
),
(
    'ARROZ LARGO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    2.45
),
(
    'ATUN ACEITE RO-1000',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'AZUCAR BLANCO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    1.75
),
(
    'AZUCAR MORENO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    2.45
),
(
    'BACALAO DESMIGADO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'BICARBONATO SODICO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    3.50
),
(
    'CALDO CARNE POLVO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'CALDO PESCADO POLVO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'CALDO POLLO POLVO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'CANELA MOLIDA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'CANELA RAMA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    51.53
),
(
    'CEBOLLA FRITA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    8.63
),
(
    'CHAMPIÑON LAMINADO 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    11.90
),
(
    'CHOCOLATE COBERTURA 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    11.90
),
(
    'CHOCOLATE POSTRES 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    8.63
),
(
    'CLAVO ENTERO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    51.53
),
(
    'COLORANTE ALIMENTARIO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'COMINO MOLIDO 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'CURRY 1KG',
    (SELECT id FROM product_types WHERE name = 'SECO'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    1.000,
    NULL,
    19.81
),
(
    'ESPARRAGOS BLANCOS 6/9 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    19.81
),
(
    'ESPARRAGOS BLANCOS 9/12 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    19.81
),
(
    'ESPARRAGOS TROZOS 3KG',
    (SELECT id FROM product_types WHERE name = 'CONSERVA'),
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    11.90
);
