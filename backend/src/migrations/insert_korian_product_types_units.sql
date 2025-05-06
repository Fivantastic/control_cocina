-- Script para insertar tipos de productos y unidades para la clínica Korian Ita (ID 2)

-- Insertar tipos de productos para Korian Ita
INSERT INTO product_types (name, clinic_id) VALUES 
('CONGELADO', 2),
('FRESCO', 2),
('SECO', 2),
('CONSERVA', 2),
('LIMPIEZA', 2),
('LÁCTEOS', 2),
('BEBIDAS', 2);

-- Insertar unidades para Korian Ita
INSERT INTO units (name, abbreviation, clinic_id) VALUES 
('Kilogramo', 'KG', 2),
('Caja', 'CAJ', 2),
('Litro', 'L', 2),
('Unidad', 'UD', 2),
('Bolsa', 'BOL', 2),
('Paquete', 'PAQ', 2),
('Unidad', 'UN', 2),
('Docena', 'DOC', 2),
('Botella', 'BOT', 2),
('Gramo', 'G', 2);

-- Mostrar mensaje de confirmación
SELECT 'Tipos de productos y unidades para la clínica Korian Ita insertados correctamente' AS mensaje;
