-- Script para actualizar las descripciones de los códigos de colores para el pan según la comida

-- Actualizar la descripción del color rojo para reflejar las diferentes cantidades según la comida
UPDATE bread_color_codes 
SET description = 'Desayuno: 1 bollo | Merienda: Medio bollo | Almuerzo/Cena: Un poco menos de la mitad del bollo' 
WHERE color_name = 'Rojo' AND clinic_id = 2;

-- Actualizar la descripción del color amarillo
UPDATE bread_color_codes 
SET description = 'Desayuno: 1 bollo y 1/2 | Merienda: Un poco más de la mitad del bollo | Almuerzo/Cena: Medio bollo' 
WHERE color_name = 'Amarillo' AND clinic_id = 2;

-- Actualizar la descripción del color azul
UPDATE bread_color_codes 
SET description = 'Desayuno: 2 bollos | Merienda: 1 bollo | Almuerzo/Cena: 1 bollo' 
WHERE color_name = 'Azul' AND clinic_id = 2;

-- Actualizar la descripción del color extra rojo
UPDATE bread_color_codes 
SET description = 'No lleva pan ni en almuerzo ni cena' 
WHERE color_name = 'Extra Rojo' AND clinic_id = 2;

-- Mostrar mensaje de confirmación
SELECT 'Descripciones de códigos de colores para el pan actualizadas correctamente' AS mensaje;
