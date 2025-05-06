-- Script para insertar productos frescos (frutas y verduras) para la clínica Korian Ita (ID 2)

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

-- Insertar productos frescos (frutas y verduras) del inventario de Korian Ita
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
-- 1. KIWI 1ª (70 A 90 GR)
(
    'KIWI 1ª (70 A 90 GR)',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    3.000,
    11,
    1,
    3.21,
    NULL,
    2
),
-- 2. LECHUGA ICEBERG 1ª
(
    'LECHUGA ICEBERG 1ª',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    6.100,
    NULL,
    2,
    2.28,
    NULL,
    2
),
-- 3. LIMÓN 1ª Nº 4/5
(
    'LIMÓN 1ª Nº 4/5',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    0.000,
    NULL,
    1,
    1.36,
    NULL,
    2
),
-- 4. MANDARINA 1ª Nº 3/4
(
    'MANDARINA 1ª Nº 3/4',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    8.000,
    NULL,
    2,
    1.86,
    NULL,
    2
),
-- 5. MANZANA GOLDEN 1ª Nº 26
(
    'MANZANA GOLDEN 1ª Nº 26',
    '80/70',
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    10.200,
    2,
    3,
    1.57,
    NULL,
    2
),
-- 6. NARANJA MESA 1ª Nº 5
(
    'NARANJA MESA 1ª Nº 5',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    7.800,
    16,
    5,
    1.29,
    NULL,
    2
),
-- 7. PERA CONFERENCIA 1ª Nº
(
    'PERA CONFERENCIA 1ª Nº',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    12.200,
    5,
    3,
    2.43,
    NULL,
    2
),
-- 8. PIÑA 1ª
(
    'PIÑA 1ª',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    3.300,
    NULL,
    1,
    3.22,
    NULL,
    2
),
-- 9. TOMATE ENSALADA 1ª G
(
    'TOMATE ENSALADA 1ª G',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    5.300,
    NULL,
    2,
    2.50,
    NULL,
    2
),
-- 10. UVA ROJA 1ª
(
    'UVA ROJA 1ª',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    8.000,
    1,
    1,
    5.00,
    'Stock en bolsas',
    2
),
-- 11. ZANAHORIA 1ª
(
    'ZANAHORIA 1ª',
    NULL,
    @fresco_id,
    @kg_id,
    1,
    @kg_id,
    0.000,
    1,
    1,
    1.07,
    'Stock en bolsas',
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos frescos (frutas y verduras) para la clínica Korian Ita insertados correctamente' AS mensaje;
