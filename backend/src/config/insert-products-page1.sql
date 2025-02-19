-- Insertar todos los productos de la primera página
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
),
(
    'BACALAO LOMO CONGELADO 600/800 C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    14.54
),
(
    'BACALAO PUNTO SAL 300/500 C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    18.07
),
(
    'BACALAO PUNTO SAL 500/800 C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    73.80
),
(
    'BERENJENA PLANCHA CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    14.03
),
(
    'BOCADITOS MERLUZA CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    19.81
),
(
    'BROCOLI CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    4.91
),
(
    'CALABACIN RODAJAS CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    6.95
),
(
    'CALAMAR PATAGONICA LIMPIO CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    7.07
),
(
    'CALAMAR PLANCHA CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    8.63
),
(
    'CALAMAR ROMANA CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    19.14
),
(
    'CARDO CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    11.90
),
(
    'CARRILLADA CERDO S/H CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    23.67
),
(
    'CEBOLLA JULIANA CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    19.29
),
(
    'CERDO RAGOUT CONG C-5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    5.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    5.000,
    NULL,
    20.34
),
(
    'CHOCO LIMPIO CONG C-7KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    7.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    7.000,
    NULL,
    22.91
),
(
    'COLIFLOR CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    6.61
),
(
    'CROQUETAS BACALAO 40GR CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    51.53
),
(
    'CROQUETAS JAMON 35GR CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    20.96
),
(
    'EMPANADILLAS ATUN 85GR CONG C-3KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    3.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    3.000,
    NULL,
    15.82
),
(
    'ESPINACAS HOJA CONG C-2.5KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    2.50,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    2.500,
    NULL,
    5.91
),
(
    'GAMBA PELADA 40/60 CONG C-6KG',
    (SELECT id FROM product_types WHERE name = 'CONGELADO'),
    (SELECT id FROM units WHERE abbreviation = 'CAJ'),
    6.00,
    (SELECT id FROM units WHERE abbreviation = 'KG'),
    6.000,
    NULL,
    18.47
);
