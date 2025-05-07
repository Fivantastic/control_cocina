-- Actualizar unidades de medida para platos específicos de la clínica Korian Ita (clinic_id = 2)
-- Basado exactamente en la imagen proporcionada (semana 1, comidas)

-- 1. Corregir el nombre de la ensalada mixta (de "con lechuga" a "sin lechuga")
UPDATE kitchen_manager.dishes 
SET name = 'Ensalada mixta sin lechuga' 
WHERE name = 'Ensalada mixta con lechuga' AND clinic_id = 2;

-- 2. Actualizar unidades de medida para platos que se miden en unidades (u) según la imagen

-- Miércoles: Jamoncitos de pollos asados AP (2u - 1u - 1u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Jamoncitos de pollos asados AP' AND clinic_id = 2;

-- Jueves: Pavo a la plancha (2u - 1u - 1u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Pavo a la plancha' AND clinic_id = 2;

-- Viernes: Hamburguesa completa (1u - 1u - 1u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Hamburguesa completa' AND clinic_id = 2;

-- Sábado: Salchichas de ave (5u - 3u - 3u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Salchichas de ave' AND clinic_id = 2;

-- Martes: Salchichas (no especifica unidades en la imagen, pero es similar)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Salchichas' AND clinic_id = 2;

-- 3. Asegurarse de que el resto de platos usen gramos (gr)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'gr' 
WHERE name IN (
  'Crema de calabaza',
  'Arroz tres delicias',
  'Lentejas con verduras',
  'Garbanzos guisados con judías verdes',
  'Espinacas a la crema',
  'Ñoquis con vegetales y albahaca',
  'Paella de Marisco',
  'Tortilla calabacín y patata',
  'Pavo con verduras en salsa',
  'Ensalada mixta sin lechuga',
  'Zanahoria salteada',
  'Ensalada Mixta',
  'Berenjena Grill',
  'Patatas fritas',
  'Judías verdes y espárragos'
) AND clinic_id = 2;

-- 4. Para cualquier plato que no hayamos especificado explícitamente
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'gr' 
WHERE (measurement_unit IS NULL OR measurement_unit = '') AND clinic_id = 2;
