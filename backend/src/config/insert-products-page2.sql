-- Insertar productos de la segunda página
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
    'GAMBA PELADA 60/80 CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    17.34
),
(
    'GUISANTE CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    5.91
),
(
    'HAMBURGUESA MIXTA 100GR CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    14.03
),
(
    'HAMBURGUESA POLLO 100GR CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    14.03
),
(
    'HAMBURGUESA TERNERA 100GR CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    17.34
),
(
    'JUDIAS VERDES PLANAS CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    5.91
),
(
    'LANGOSTINO 40/60 CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    51.53
),
(
    'LANGOSTINO COCIDO 40/60 CONG C-3KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    51.53
),
(
    'MEDALLONES MERLUZA CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    19.81
),
(
    'MENESTRA VERDURAS CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    5.91
),
(
    'MERLUZA FILETE S/P 100/120 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    19.81
),
(
    'MERLUZA FILETE S/P 120/160 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    19.81
),
(
    'MERLUZA FILETE S/P 160/200 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    19.81
),
(
    'MERLUZA LOMO 120/160 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    19.81
),
(
    'MERLUZA TRONCO S/C 1500/2500 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    19.81
),
(
    'MIXTO PAELLA CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    19.81
),
(
    'PATATA CORTE CASERO CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    4.91
),
(
    'PATATA GAJOS CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    4.91
),
(
    'PAVO RAGOUT CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    14.03
),
(
    'PECHUGA POLLO FILETEADA CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    14.03
),
(
    'PESCADILLA S/C 2 CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    14.03
),
(
    'PIMIENTO ROJO TIRAS CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    6.95
),
(
    'PIMIENTO TRICOLOR CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    6.95
),
(
    'PIMIENTO VERDE TIRAS CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    6.95
),
(
    'POLLO TROCEADO CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    8.63
);
