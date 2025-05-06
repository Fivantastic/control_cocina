-- Script para insertar productos frescos para la clínica Korian Ita (ID 2)

-- Obtener los IDs de los tipos de productos para Korian Ita
SET @congelado_id = (SELECT id FROM product_types WHERE name = 'CONGELADO' AND clinic_id = 2);
SET @fresco_id = (SELECT id FROM product_types WHERE name = 'FRESCO' AND clinic_id = 2);
SET @seco_id = (SELECT id FROM product_types WHERE name = 'SECO' AND clinic_id = 2);
SET @conserva_id = (SELECT id FROM product_types WHERE name = 'CONSERVA' AND clinic_id = 2);
SET @lacteos_id = (SELECT id FROM product_types WHERE name = 'LÁCTEOS' AND clinic_id = 2);

-- Obtener los IDs de las unidades para Korian Ita
SET @kg_id = (SELECT id FROM units WHERE abbreviation = 'KG' AND clinic_id = 2);
SET @caj_id = (SELECT id FROM units WHERE abbreviation = 'CAJ' AND clinic_id = 2);
SET @ud_id = (SELECT id FROM units WHERE abbreviation = 'UD' AND clinic_id = 2);
SET @rac_id = (SELECT id FROM units WHERE abbreviation = 'UN' AND clinic_id = 2);
SET @bol_id = (SELECT id FROM units WHERE abbreviation = 'BOL' AND clinic_id = 2);

-- Insertar productos frescos del inventario de Korian Ita
INSERT INTO products (
    name,
    code,
    type_id,
    purchase_unit_id,
    unit_quantity,
    base_unit_id,
    theoretical_stock,
    actual_stock,
    minimum_stock,
    price,
    notes,
    clinic_id
) VALUES
-- 1. PAN SALVADO 54 GR
(
    'PAN SALVADO 54 GR',
    'C3 13/40/3 DP4C V1 (B1)',
    @fresco_id,
    @caj_id,
    1,
    @ud_id,
    3.000,
    4.004,
    1,
    17.97,
    NULL,
    2
),
-- 2. PAN GALLO SIN GLUTEN
(
    'PAN GALLO SIN GLUTEN',
    'RUSTICO 80G FINASAD',
    @fresco_id,
    @caj_id,
    1,
    @ud_id,
    1.000,
    4.5,
    1,
    16.37,
    NULL,
    2
),
-- 3. ARTICULO REGULARIZACIÓN IVA 10%
(
    'ARTICULO REGULARIZACIÓN IVA 10%',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    0.000,
    NULL,
    0,
    0.00,
    NULL,
    2
),
-- 4. FIAMBRE CERDO ALJAMA
(
    'FIAMBRE CERDO ALJAMA',
    'LONCHAS 300GR C2 AUT',
    @fresco_id,
    @caj_id,
    1,
    @ud_id,
    2.000,
    7,
    2,
    14.96,
    NULL,
    2
),
-- 5. PAVO PECHUGA COCIDA
(
    'PAVO PECHUGA COCIDA',
    'LONCHAS 300GR C2 AUT',
    @fresco_id,
    @caj_id,
    1,
    @ud_id,
    1.000,
    3,
    1,
    20.75,
    NULL,
    2
),
-- 6. QUESO VACA EDAM
(
    'QUESO VACA EDAM',
    'LONCHAS 1KG C2 AUT',
    @fresco_id,
    @caj_id,
    1,
    @ud_id,
    1.200,
    6,
    2,
    53.40,
    NULL,
    2
),
-- 7. YOGUR GRIEGO NATURAL
(
    'YOGUR GRIEGO NATURAL',
    '125G C24 U',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    2.500,
    25,
    12,
    7.14,
    NULL,
    2
),
-- 8. ACTIMEL NATURAL
(
    'ACTIMEL NATURAL',
    'MULTIPACK DOBLE C2 24UD',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    0.000,
    NULL,
    6,
    11.66,
    NULL,
    2
),
-- 9. FLAN DE VAINILLA 100G
(
    'FLAN DE VAINILLA 100G',
    'CAJA 24 UDS',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    1.000,
    NULL,
    6,
    8.00,
    NULL,
    2
),
-- 10. LECHE SEMIDESNATADA 1
(
    'LECHE SEMIDESNATADA 1',
    'C12 6 UDS',
    @lacteos_id,
    @caj_id,
    6,
    @ud_id,
    13.000,
    15,
    6,
    7.80,
    NULL,
    2
),
-- 11. LECHE SEMI S/LACTOSA 1L
(
    'LECHE SEMI S/LACTOSA 1L',
    'C12 6UD',
    @lacteos_id,
    @caj_id,
    6,
    @ud_id,
    2.000,
    NULL,
    3,
    8.40,
    NULL,
    2
),
-- 12. MARGARINA PORCIÓN 10GR
(
    'MARGARINA PORCIÓN 10GR',
    'C12/240 VALLE DE',
    @fresco_id,
    @caj_id,
    240,
    @ud_id,
    0.000,
    60,
    24,
    20.71,
    NULL,
    2
),
-- 13. NATILLAS CHOCOLATE
(
    'NATILLAS CHOCOLATE',
    '120G CAJA 12 UDS',
    @lacteos_id,
    @caj_id,
    12,
    @ud_id,
    0.500,
    13,
    6,
    11.71,
    NULL,
    2
),
-- 14. NATILLAS VAINILLA 120G
(
    'NATILLAS VAINILLA 120G',
    'CAJA 12 UDS',
    @lacteos_id,
    @caj_id,
    12,
    @ud_id,
    1.500,
    20,
    6,
    11.71,
    NULL,
    2
),
-- 15. POSTRE VEGETAL CHOCO
(
    'POSTRE VEGETAL CHOCO',
    'REIG 125G*24U ALPRO',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    1.000,
    NULL,
    1,
    12.00,
    NULL,
    2
),
-- 16. POSTRE LECHE CARAMELO
(
    'POSTRE LECHE CARAMELO',
    '12U FH R',
    @lacteos_id,
    @caj_id,
    12,
    @ud_id,
    0.600,
    NULL,
    1,
    12.00,
    NULL,
    2
),
-- 17. POSTRE LECHE DE COCO
(
    'POSTRE LECHE DE COCO',
    '12U FHAMA',
    @lacteos_id,
    @caj_id,
    12,
    @ud_id,
    0.000,
    NULL,
    1,
    12.00,
    NULL,
    2
),
-- 18. YOGUR FRESA 125G
(
    'YOGUR FRESA 125G',
    'CAJA 24 UDS',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    0.000,
    NULL,
    1,
    5.98,
    NULL,
    2
),
-- 19. YOGUR FRESA 125G (duplicado)
(
    'YOGUR FRESA 125G',
    'CAJA 24 UDS (2)',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    1.000,
    NULL,
    1,
    5.98,
    NULL,
    2
),
-- 20. YOGUR GRIEGO NATURAL
(
    'YOGUR GRIEGO NATURAL',
    '115G C 24 U',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    0.000,
    35,
    5,
    11.43,
    NULL,
    2
),
-- 21. YOGUR LIMON 125G
(
    'YOGUR LIMON 125G',
    'CAJA 24 UDS',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    0.000,
    NULL,
    1,
    5.98,
    NULL,
    2
),
-- 22. YOGUR MACEDONIA 125G
(
    'YOGUR MACEDONIA 125G',
    'CAJA 24 UDS',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    1.000,
    NULL,
    1,
    5.98,
    NULL,
    2
),
-- 23. YOGUR NATURAL 125G
(
    'YOGUR NATURAL 125G',
    'CAJA 24 UDS',
    @lacteos_id,
    @caj_id,
    24,
    @ud_id,
    6.500,
    17,
    6,
    5.98,
    NULL,
    2
),
-- 24. BANANA 1ª CA BRE 14-16
(
    'BANANA 1ª CA BRE 14-16',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    2.000,
    NULL,
    1,
    0.00,
    NULL,
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos frescos para la clínica Korian Ita insertados correctamente' AS mensaje;
