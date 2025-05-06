-- Script para insertar productos de la cuarta página para la clínica Korian Ita (ID 2)

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

-- Insertar productos del inventario de Korian Ita (cuarta página)
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
-- 1. NUGGETS DE POLLO (ELABORADO A PARTIR DE PIEZAS DE CARNE) APETITO
(
    'NUGGETS DE POLLO APETITO',
    '7003470',
    @congelado_id,
    @caj_id,
    6,
    @bol_id,
    NULL,
    0.2,
    1,
    NULL,
    'Elaborado a partir de piezas de carne, Caja 6 KG (300)',
    2
),
-- 2. NOODLES CON VERDURAS Y ALBAHACA APETITO
(
    'NOODLES CON VERDURAS Y ALBAHACA APETITO',
    '7003468',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    NULL,
    1,
    NULL,
    'Caja 6,00 KG (4 bolsa x 1,5 kg)',
    2
),
-- 3. PAELLA DE MARISCO APETITO
(
    'PAELLA DE MARISCO APETITO',
    '7004448',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    NULL,
    1,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5KG)',
    2
),
-- 4. PASTEL DE CARNE CON PURÉ DE PATATA APETITO
(
    'PASTEL DE CARNE CON PURÉ DE PATATA APETITO',
    '7003482',
    @congelado_id,
    @caj_id,
    6.4,
    @rac_id,
    NULL,
    NULL,
    1,
    NULL,
    'Caja 6,40 KG (16x400g)',
    2
),
-- 5. PATATA HERVIDA APETITO
(
    'PATATA HERVIDA APETITO',
    '7003480',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    NULL,
    1,
    NULL,
    '4 bolsas x 1,5 kg',
    2
),
-- 6. PATATA HERVIDA SIN SAL AÑADIDA APETITO
(
    'PATATA HERVIDA SIN SAL AÑADIDA APETITO',
    '7003490',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    2.1,
    1,
    NULL,
    'Caja 6 KG (4 bolsas x 1,5 kg)',
    2
),
-- 7. PATATA Y ZANAHORIA ESTOFADAS APETITO
(
    'PATATA Y ZANAHORIA ESTOFADAS APETITO',
    '7003502',
    @congelado_id,
    @caj_id,
    4.32,
    @kg_id,
    NULL,
    2.1,
    1,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 8. PATATAS ASADAS CON ESPECIAS
(
    'PATATAS ASADAS CON ESPECIAS',
    '7003582',
    @congelado_id,
    @caj_id,
    6,
    @kg_id,
    NULL,
    1.1,
    1,
    NULL,
    'Caja 6,00 KG (4 bolsas x 1,5 kg)',
    2
),
-- 9. PATATAS FRITAS SIN SAL AÑADIDA APETITO
(
    'PATATAS FRITAS SIN SAL AÑADIDA APETITO',
    '7005837',
    @congelado_id,
    @caj_id,
    6,
    @rac_id,
    NULL,
    3.17,
    1,
    NULL,
    'Caja 6 KG',
    2
),
-- 10. PAVO A LA PLANCHA (ELABORADO A PARTIR DE PIEZAS DE CARNE) APETITO
(
    'PAVO A LA PLANCHA APETITO',
    '7003400',
    @congelado_id,
    @caj_id,
    2.56,
    @rac_id,
    NULL,
    1.25,
    1,
    NULL,
    'Elaborado a partir de piezas de carne, Caja 2,56 KG',
    2
),
-- 11. PECHUGA DE POLLO CON VEGETALES AL ESTILO MEDITERRÁNEO
(
    'PECHUGA DE POLLO CON VEGETALES AL ESTILO MEDITERRÁNEO',
    '7003422',
    @congelado_id,
    @caj_id,
    4,
    @rac_id,
    NULL,
    0.5,
    1,
    NULL,
    'C4 kg (16x250g)',
    2
),
-- 12. PESCADO EMPANADO RELLENO DE MOSTAZA Y MIEL APETITO
(
    'PESCADO EMPANADO RELLENO DE MOSTAZA Y MIEL APETITO',
    '7006483',
    @congelado_id,
    @caj_id,
    3.6,
    @ud_id,
    NULL,
    NULL,
    1,
    NULL,
    'Caja 3,60 KG (36x100g)',
    2
),
-- 13. PIZZA ARTESANA ATÚN 30x40CM
(
    'PIZZA ARTESANA ATÚN 30x40CM',
    '7100055',
    @congelado_id,
    @caj_id,
    10,
    @ud_id,
    NULL,
    NULL,
    1,
    NULL,
    '10 X 1KG',
    2
),
-- 14. PIZZA ARTESANA QUESOS 30x40CM
(
    'PIZZA ARTESANA QUESOS 30x40CM',
    '7100056',
    @congelado_id,
    @caj_id,
    10,
    @ud_id,
    NULL,
    4,
    1,
    NULL,
    '10 X 1KG, CAJA UND 8 RACO AMARILLA',
    2
),
-- 15. PIZZA REDONDA SIN GLUTEN
(
    'PIZZA REDONDA SIN GLUTEN',
    'MERCADO NA',
    @congelado_id,
    @ud_id,
    1,
    @ud_id,
    NULL,
    3.5,
    1,
    NULL,
    NULL,
    2
),
-- 16. PORRUGSALSA - GUISO DE PUERRO Y PATATA APETITO
(
    'PORRUGSALSA - GUISO DE PUERRO Y PATATA APETITO',
    '7004462',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    14,
    5,
    NULL,
    'Caja 4,32 KG (16x270 g)',
    2
),
-- 17. PURÉ DE CALABAZA APETITO
(
    'PURÉ DE CALABAZA APETITO',
    '7004423',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    2,
    1,
    NULL,
    'Caja 4,32 KG (16x270GR)',
    2
),
-- 18. PURÉ DE PATATA Y COL
(
    'PURÉ DE PATATA Y COL',
    '7004458',
    @congelado_id,
    @caj_id,
    4.32,
    @rac_id,
    NULL,
    NULL,
    1,
    NULL,
    'Caja 4,32KG (16x270g)',
    2
),
-- 19. PURÉ DE PATATA
(
    'PURÉ DE PATATA',
    NULL,
    @congelado_id,
    @caj_id,
    6.4,
    @rac_id,
    NULL,
    11,
    5,
    NULL,
    '6,4 KG (16 X 400 GR)',
    2
),
-- 20. RIGATONI GORGONZOLA
(
    'RIGATONI GORGONZOLA',
    NULL,
    @congelado_id,
    @caj_id,
    4.8,
    @ud_id,
    NULL,
    6,
    2,
    NULL,
    NULL,
    2
),
-- 21. RIGATONI CON VERDURAS EN SALSA DE TOMATE Y SALVIA APETITO
(
    'RIGATONI CON VERDURAS EN SALSA DE TOMATE Y SALVIA APETITO',
    '7005376',
    @congelado_id,
    @caj_id,
    4.8,
    @bol_id,
    NULL,
    3.19,
    1,
    NULL,
    'Caja 4,8KG (16x300g)',
    2
),
-- 22. RUSTIDO DE POLLO CON FRUTOS SECOS BOCATTO DI CARDINALE
(
    'RUSTIDO DE POLLO CON FRUTOS SECOS BOCATTO DI CARDINALE',
    '7000024',
    @congelado_id,
    @caj_id,
    5,
    @kg_id,
    NULL,
    NULL,
    1,
    NULL,
    '4 BOLSAS X 1,25 KG',
    2
),
-- 23. SALCHICHA DE AVE A LA PLANCHA APETITO
(
    'SALCHICHA DE AVE A LA PLANCHA APETITO',
    '7003474',
    @congelado_id,
    @caj_id,
    4.12,
    @ud_id,
    NULL,
    3.02,
    1,
    NULL,
    'Caja 4,120 KG (4x1,28 kg) (128uni x 40g)',
    2
);

-- Mostrar mensaje de confirmación
SELECT 'Productos de la cuarta página para la clínica Korian Ita insertados correctamente' AS mensaje;
