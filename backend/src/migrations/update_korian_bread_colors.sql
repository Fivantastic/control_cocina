-- Script para actualizar los códigos de colores para el pan en la clínica Korian Ita (ID 2)

-- Obtener el ID del color marrón y amarillo
SET @marron_id = (SELECT id FROM bread_color_codes WHERE color_name = 'Marrón' AND clinic_id = 2 LIMIT 1);
SET @amarillo_id = (SELECT id FROM bread_color_codes WHERE color_name = 'Amarillo' AND clinic_id = 2 LIMIT 1);

-- Actualizar todas las asignaciones de pan que usan marrón para que usen amarillo
UPDATE patient_meal_bread 
SET bread_color_id = @amarillo_id 
WHERE bread_color_id = @marron_id;

-- Eliminar el color marrón de la tabla de códigos de colores
DELETE FROM bread_color_codes 
WHERE color_name = 'Marrón' AND clinic_id = 2;

-- Actualizar la descripción del color amarillo para ser más precisa
UPDATE bread_color_codes 
SET description = 'Medio bollo o porción especial según necesidades del paciente' 
WHERE color_name = 'Amarillo' AND clinic_id = 2;

-- Mostrar mensaje de confirmación
SELECT 'Códigos de colores para el pan actualizados correctamente' AS mensaje;
