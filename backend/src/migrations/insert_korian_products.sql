-- Script para insertar productos para la clínica Korian Ita (ID 2)

-- Obtener los IDs de los tipos de productos para Korian Ita
SET @congelado_id = (SELECT id FROM product_types WHERE name = 'CONGELADO' AND clinic_id = 2);
SET @fresco_id = (SELECT id FROM product_types WHERE name = 'FRESCO' AND clinic_id = 2);
SET @seco_id = (SELECT id FROM product_types WHERE name = 'SECO' AND clinic_id = 2);
SET @conserva_id = (SELECT id FROM product_types WHERE name = 'CONSERVA' AND clinic_id = 2);

-- Obtener los IDs de las unidades para Korian Ita
SET @kg_id = (SELECT id FROM units WHERE abbreviation = 'KG' AND clinic_id = 2);
SET @caj_id = (SELECT id FROM units WHERE abbreviation = 'CAJ' AND clinic_id = 2);
SET @ud_id = (SELECT id FROM units WHERE abbreviation = 'UD' AND clinic_id = 2);
SET @rac_id = (SELECT id FROM units WHERE abbreviation = 'UN' AND clinic_id = 2);
SET @bol_id = (SELECT id FROM units WHERE abbreviation = 'BOL' AND clinic_id = 2);

-- Insertar productos del inventario de Korian Ita
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
-- 1. ABADEJO DE ALASKA A LA TOSCANA
(
    'ABADEJO DE ALASKA A LA TOSCANA APETITO',
    '7002641',
    @congelado_id,
    @caj_id,
    4.32,
    @kg_id,
    NULL,
    24,
    10,
    NULL,
    'Caja 4,32KG (24x180 g)',
    2
),
-- 2. ABADEJO DE ALASKA EN SALSA DE TOMATE
(
    'ABADEJO DE ALASKA EN SALSA DE TOMATE',
    '7002643',
    @congelado_id,
    @caj_id,
    4.32,
    @kg_id,
    NULL,
    NULL,
    10,
    NULL,
    'Elaborado a partir de piezas de pescado',
    2
),
-- 3. ALBÓNDIGAS DE CARNE DE VACUNO EN SALSA DE TOMATE
(
    'ALBÓNDIGAS DE CARNE DE VACUNO EN SALSA DE TOMATE APETITO',
    '7002612',
    @congelado_id,
    @caj_id,
    4.8,
    @kg_id,
    NULL,
    NULL,
    10,
    NULL,
    'Caja 4,8KG (16x300g)',
    2
),
-- 4. ARROZ 3 DELICIAS CON TORTILLA FRIPOZO
(
    'ARROZ 3 DELICIAS CON TORTILLA FRIPOZO',
    '7000308',
    @congelado_id,
    @caj_id,
    4,
    @kg_id,
    NULL,
    4.25,
    2,
    NULL,
    'Cajas de 4 bolsas x 1 kg',
    2
),
-- 5. ARROZ A LA MILANESA
(
    'ARROZ A LA MILANESA',
    '7004410',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    0.5,
    2,
    NULL,
    'Elaborado con jamón de pavo, pimiento y guisantes',
    2
),
-- 6. ARROZ CALDOSO DE POLLO Y VERDURAS
(
    'ARROZ CALDOSO DE POLLO Y VERDURAS APETITO',
    '7002603',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    34,
    10,
    NULL,
    'Caja 4,32KG (16x270 g)',
    2
),
-- 7. ARROZ HERVIDO APETITO
(
    'ARROZ HERVIDO APETITO',
    '7002634',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    4.5,
    2,
    NULL,
    'Caja 6 KG (3 bolsas x 2kg)',
    2
),
-- 8. BERENJENA AL GRILL
(
    'BERENJENA AL GRILL',
    '7004714',
    @congelado_id,
    @caj_id,
    3,
    @kg_id,
    NULL,
    6.1,
    2,
    NULL,
    'Caja 3KG (2X1,5KG)',
    2
),
-- 9. BONIATO VAPOR
(
    'BONIATO VAPOR',
    NULL,
    @congelado_id,
    @bol_id,
    1,
    @kg_id,
    NULL,
    2,
    1,
    NULL,
    NULL,
    2
),
-- 10. BRÓCOLI AL VAPOR SIN SAL
(
    'BRÓCOLI AL VAPOR SIN SAL APETITO',
    '7003218',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    5.5,
    2,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5kg)',
    2
),
-- 11. BRÓCOLI/ZANAHORIA Y COLIFLOR AL VAPOR
(
    'BRÓCOLI/ZANAHORIA Y COLIFLOR AL VAPOR APETITO',
    '7003009',
    @congelado_id,
    @caj_id,
    6,
    @bol_id,
    NULL,
    2,
    1,
    NULL,
    'Sin sal añadida',
    2
),
-- 12. BUTIFARRA A LA PLANCHA
(
    'BUTIFARRA A LA PLANCHA APETITO',
    '7004861',
    @congelado_id,
    @caj_id,
    4,
    @bol_id,
    NULL,
    2,
    1,
    NULL,
    'Caja 4 KG (50x80g)',
    2
),
-- 13. CALABACÍN PLANCHA
(
    'CALABACÍN PLANCHA',
    NULL,
    @congelado_id,
    @bol_id,
    1,
    @kg_id,
    NULL,
    2.5,
    1,
    NULL,
    NULL,
    2
),
-- 14. CARNE DE CERDO PLANCHA
(
    'CARNE DE CERDO PLANCHA',
    NULL,
    @congelado_id,
    @kg_id,
    1,
    @kg_id,
    NULL,
    NULL,
    1,
    NULL,
    NULL,
    2
),
-- 15. CARNE DE VACUNO ASADA CON CHAMPIÑONES
(
    'CARNE DE VACUNO ASADA CON CHAMPIÑONES APETITO',
    '7004200',
    @congelado_id,
    @caj_id,
    4,
    @rac_id,
    NULL,
    23,
    10,
    NULL,
    'Caja 4 KG (16 X 250 GR)',
    2
),
-- 16. CARNE DE VACUNO EN SALSA DE CHAMPIÑONES
(
    'CARNE DE VACUNO EN SALSA DE CHAMPIÑONES APETITO',
    '7023328',
    @congelado_id,
    @caj_id,
    3.2,
    @rac_id,
    NULL,
    23,
    10,
    NULL,
    'Caja 3,20 KG (16x200 g)',
    2
),
-- 17. CAZUELA DE RAPE A LA MARINERA
(
    'CAZUELA DE RAPE A LA MARINERA BOCATTO DI CARDINALE',
    '7000889',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    NULL,
    2,
    NULL,
    '4 BOLSAS x 1,5 KG',
    2
),
-- 18. COLIFLOR A LA CREMA
(
    'COLIFLOR A LA CREMA APETITO',
    '7003731',
    @congelado_id,
    @caj_id,
    4,
    @bol_id,
    NULL,
    3.5,
    1,
    NULL,
    'Caja 4 KG (4 bolsas x 1 KG)',
    2
),
-- 19. COLIFLOR CON PIMENTÓN AL VAPOR
(
    'COLIFLOR CON PIMENTÓN AL VAPOR APETITO',
    '7008414',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    3.5,
    2,
    NULL,
    'Caja 6,00 KG (4x1500g)',
    2
),
-- 20. CREMA DE CALABAZA
(
    'CREMA DE CALABAZA',
    '7004458',
    @congelado_id,
    @caj_id,
    4.4,
    @rac_id,
    NULL,
    NULL,
    10,
    NULL,
    'C# 32 kg (16x275 g)',
    2
),
-- 21. CREMA DE CHAMPIÑONES
(
    'CREMA DE CHAMPIÑONES APETITO',
    '7004497',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    1.3,
    1,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 22. ARROZ VERDURAS (de la nota al final)
(
    'ARROZ VERDURAS',
    NULL,
    @congelado_id,
    @rac_id,
    1,
    @rac_id,
    NULL,
    16,
    5,
    NULL,
    NULL,
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos para la clínica Korian Ita insertados correctamente' AS mensaje;
