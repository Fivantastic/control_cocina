-- Script para insertar datos básicos para la clínica Korian Ita (ID 2)

-- Primero, copiamos las unidades de medida de El Seranil a Korian Ita
INSERT INTO units (name, abbreviation, clinic_id)
SELECT name, abbreviation, 2
FROM units
WHERE clinic_id = 1
AND NOT EXISTS (
    SELECT 1 FROM units WHERE clinic_id = 2 AND name = units.name
);

-- Copiamos los tipos de productos de El Seranil a Korian Ita
INSERT INTO product_types (name, clinic_id)
SELECT name, 2
FROM product_types
WHERE clinic_id = 1
AND NOT EXISTS (
    SELECT 1 FROM product_types WHERE clinic_id = 2 AND name = product_types.name
);

-- Insertamos algunos proveedores específicos para Korian Ita
INSERT INTO suppliers (name, contact_name, phone, email, address, notes, clinic_id)
VALUES 
('Frutas Benalmádena', 'Carlos Ruiz', '952123456', 'info@frutasbenalmadena.com', 'Av. Juan Luis Peralta 45, Benalmádena', 'Proveedor local de frutas y verduras', 2),
('Carnicería Costa del Sol', 'María López', '952789012', 'pedidos@carniceriacostadelsol.es', 'C/ Las Flores 12, Benalmádena', 'Especialistas en carnes de primera calidad', 2),
('Pescados Mediterráneo', 'Antonio Fernández', '952345678', 'ventas@pescadosmediterraneo.com', 'Puerto Deportivo, Local 8, Benalmádena', 'Pescado fresco diario', 2),
('Distribuciones Málaga', 'Laura Martín', '952567890', 'distribuciones@malagafood.com', 'Polígono Industrial La Vega, Nave 23, Málaga', 'Distribuidor general de alimentación', 2);

-- Insertamos algunos productos básicos para Korian Ita
-- Primero obtenemos los IDs de los tipos de productos y unidades
SET @FRUTAS_ID = (SELECT id FROM product_types WHERE name = 'Frutas y Verduras' AND clinic_id = 2 LIMIT 1);
SET @CARNES_ID = (SELECT id FROM product_types WHERE name = 'Carnes' AND clinic_id = 2 LIMIT 1);
SET @PESCADOS_ID = (SELECT id FROM product_types WHERE name = 'Pescados' AND clinic_id = 2 LIMIT 1);
SET @LACTEOS_ID = (SELECT id FROM product_types WHERE name = 'Lácteos' AND clinic_id = 2 LIMIT 1);
SET @SECOS_ID = (SELECT id FROM product_types WHERE name = 'Productos Secos' AND clinic_id = 2 LIMIT 1);

SET @KG_ID = (SELECT id FROM units WHERE abbreviation = 'kg' AND clinic_id = 2 LIMIT 1);
SET @UNIDAD_ID = (SELECT id FROM units WHERE abbreviation = 'ud' AND clinic_id = 2 LIMIT 1);
SET @LITRO_ID = (SELECT id FROM units WHERE abbreviation = 'l' AND clinic_id = 2 LIMIT 1);

-- Insertamos productos para Korian Ita
INSERT INTO products (
    name, 
    description, 
    product_type_id, 
    unit_id, 
    price, 
    stock, 
    minimum_stock, 
    supplier_id, 
    clinic_id
)
VALUES
-- Frutas y verduras
('Manzana Golden', 'Manzanas Golden de primera calidad', @FRUTAS_ID, @KG_ID, 2.45, 15, 5, 
    (SELECT id FROM suppliers WHERE name = 'Frutas Benalmádena' AND clinic_id = 2), 2),
('Plátano de Canarias', 'Plátanos de Canarias', @FRUTAS_ID, @KG_ID, 1.95, 12, 4, 
    (SELECT id FROM suppliers WHERE name = 'Frutas Benalmádena' AND clinic_id = 2), 2),
('Naranja de zumo', 'Naranjas para zumo', @FRUTAS_ID, @KG_ID, 1.75, 20, 8, 
    (SELECT id FROM suppliers WHERE name = 'Frutas Benalmádena' AND clinic_id = 2), 2),
('Lechuga romana', 'Lechuga romana fresca', @FRUTAS_ID, @UNIDAD_ID, 0.95, 10, 3, 
    (SELECT id FROM suppliers WHERE name = 'Frutas Benalmádena' AND clinic_id = 2), 2),
('Tomate', 'Tomate para ensalada', @FRUTAS_ID, @KG_ID, 2.25, 8, 3, 
    (SELECT id FROM suppliers WHERE name = 'Frutas Benalmádena' AND clinic_id = 2), 2),

-- Carnes
('Pechuga de pollo', 'Pechuga de pollo fresca', @CARNES_ID, @KG_ID, 6.95, 10, 3, 
    (SELECT id FROM suppliers WHERE name = 'Carnicería Costa del Sol' AND clinic_id = 2), 2),
('Carne picada mixta', 'Carne picada de ternera y cerdo', @CARNES_ID, @KG_ID, 8.50, 5, 2, 
    (SELECT id FROM suppliers WHERE name = 'Carnicería Costa del Sol' AND clinic_id = 2), 2),
('Lomo de cerdo', 'Lomo de cerdo fresco', @CARNES_ID, @KG_ID, 7.95, 6, 2, 
    (SELECT id FROM suppliers WHERE name = 'Carnicería Costa del Sol' AND clinic_id = 2), 2),

-- Pescados
('Merluza', 'Merluza fresca', @PESCADOS_ID, @KG_ID, 12.95, 5, 2, 
    (SELECT id FROM suppliers WHERE name = 'Pescados Mediterráneo' AND clinic_id = 2), 2),
('Dorada', 'Dorada fresca', @PESCADOS_ID, @KG_ID, 14.50, 4, 1, 
    (SELECT id FROM suppliers WHERE name = 'Pescados Mediterráneo' AND clinic_id = 2), 2),
('Boquerones', 'Boquerones frescos', @PESCADOS_ID, @KG_ID, 8.75, 3, 1, 
    (SELECT id FROM suppliers WHERE name = 'Pescados Mediterráneo' AND clinic_id = 2), 2),

-- Lácteos
('Leche entera', 'Leche entera', @LACTEOS_ID, @LITRO_ID, 0.95, 24, 12, 
    (SELECT id FROM suppliers WHERE name = 'Distribuciones Málaga' AND clinic_id = 2), 2),
('Yogur natural', 'Yogur natural pack 4 unidades', @LACTEOS_ID, @UNIDAD_ID, 1.75, 20, 10, 
    (SELECT id FROM suppliers WHERE name = 'Distribuciones Málaga' AND clinic_id = 2), 2),
('Queso semicurado', 'Queso semicurado', @LACTEOS_ID, @KG_ID, 9.95, 3, 1, 
    (SELECT id FROM suppliers WHERE name = 'Distribuciones Málaga' AND clinic_id = 2), 2),

-- Productos secos
('Arroz', 'Arroz redondo', @SECOS_ID, @KG_ID, 1.25, 15, 5, 
    (SELECT id FROM suppliers WHERE name = 'Distribuciones Málaga' AND clinic_id = 2), 2),
('Pasta macarrones', 'Pasta macarrones', @SECOS_ID, @KG_ID, 1.15, 10, 4, 
    (SELECT id FROM suppliers WHERE name = 'Distribuciones Málaga' AND clinic_id = 2), 2),
('Lentejas', 'Lentejas', @SECOS_ID, @KG_ID, 1.85, 8, 3, 
    (SELECT id FROM suppliers WHERE name = 'Distribuciones Málaga' AND clinic_id = 2), 2),
('Garbanzos', 'Garbanzos', @SECOS_ID, @KG_ID, 1.95, 8, 3, 
    (SELECT id FROM suppliers WHERE name = 'Distribuciones Málaga' AND clinic_id = 2), 2);

-- Insertamos un menú básico para la semana 1 en Korian Ita
INSERT INTO dishes (name, description, clinic_id)
VALUES 
('Ensalada mixta', 'Ensalada con lechuga, tomate y cebolla', 2),
('Sopa de verduras', 'Sopa casera de verduras', 2),
('Pechuga de pollo a la plancha', 'Pechuga de pollo a la plancha con guarnición', 2),
('Merluza al horno', 'Merluza al horno con patatas', 2),
('Arroz con verduras', 'Arroz salteado con verduras', 2),
('Fruta del tiempo', 'Selección de fruta fresca', 2),
('Yogur natural', 'Yogur natural', 2);

-- Insertamos el menú de la semana 1
INSERT INTO menus (week_number, day_of_week, meal_type, dish_id, clinic_id)
VALUES
-- Lunes
(1, 'Lunes', 'Comida', (SELECT id FROM dishes WHERE name = 'Sopa de verduras' AND clinic_id = 2), 2),
(1, 'Lunes', 'Comida', (SELECT id FROM dishes WHERE name = 'Pechuga de pollo a la plancha' AND clinic_id = 2), 2),
(1, 'Lunes', 'Comida', (SELECT id FROM dishes WHERE name = 'Fruta del tiempo' AND clinic_id = 2), 2),
(1, 'Lunes', 'Cena', (SELECT id FROM dishes WHERE name = 'Ensalada mixta' AND clinic_id = 2), 2),
(1, 'Lunes', 'Cena', (SELECT id FROM dishes WHERE name = 'Merluza al horno' AND clinic_id = 2), 2),
(1, 'Lunes', 'Cena', (SELECT id FROM dishes WHERE name = 'Yogur natural' AND clinic_id = 2), 2),

-- Martes
(1, 'Martes', 'Comida', (SELECT id FROM dishes WHERE name = 'Ensalada mixta' AND clinic_id = 2), 2),
(1, 'Martes', 'Comida', (SELECT id FROM dishes WHERE name = 'Arroz con verduras' AND clinic_id = 2), 2),
(1, 'Martes', 'Comida', (SELECT id FROM dishes WHERE name = 'Yogur natural' AND clinic_id = 2), 2),
(1, 'Martes', 'Cena', (SELECT id FROM dishes WHERE name = 'Sopa de verduras' AND clinic_id = 2), 2),
(1, 'Martes', 'Cena', (SELECT id FROM dishes WHERE name = 'Pechuga de pollo a la plancha' AND clinic_id = 2), 2),
(1, 'Martes', 'Cena', (SELECT id FROM dishes WHERE name = 'Fruta del tiempo' AND clinic_id = 2), 2);
