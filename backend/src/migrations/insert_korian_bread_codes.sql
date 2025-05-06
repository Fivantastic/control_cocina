-- Script para insertar códigos de colores para el pan en la clínica Korian Ita (ID 2)

-- Insertar códigos de colores para el pan
INSERT INTO bread_color_codes (color_name, color_code, description, clinic_id) VALUES
('Rojo', '#FF0000', '1 bollo para desayuno, o un poco más de la mitad de 1 bollo para merienda/almuerzo/cena', 2),
('Amarillo', '#FFFF00', 'Medio bollo o un poco más de la mitad de 1 bollo', 2),
('Azul', '#0000FF', '1 bollo completo', 2),
('Marrón', '#8B4513', 'Porción especial según necesidades del paciente', 2),
('Extra Rojo', '#FF0000', 'No lleva pan en esta comida', 2);

-- Insertar categorías dietéticas especiales
INSERT INTO dietary_categories (name, description, clinic_id) VALUES
('TEA', 'Trastorno del espectro autista - Necesidades dietéticas especiales', 2),
('SIN GLUTEN', 'Dieta libre de gluten', 2),
('ALAN', 'Restricciones dietéticas específicas para Alan', 2),
('NENE', 'Restricciones dietéticas específicas para Nene', 2),
('MARIA', 'Restricciones dietéticas específicas para Maria', 2);

-- Mostrar mensaje de confirmación
SELECT 'Códigos de colores para el pan y categorías dietéticas insertados correctamente' AS mensaje;
