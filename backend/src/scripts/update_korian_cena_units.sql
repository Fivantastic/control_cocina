-- Actualizar unidades de medida para platos específicos de cenas de la clínica Korian Ita (clinic_id = 2)
-- Basado exactamente en la imagen proporcionada (semana 1, cenas)

-- 1. Actualizar unidades de medida para platos que se miden en unidades (u) según la imagen

-- Lunes: Abadejo relleno mostaza y miel (2u - 1u - 1u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Abadejo relleno mostaza y miel' AND clinic_id = 2;

-- Martes: Pavo a la plancha (2u - 1u - 1u)
-- Ya actualizado en el script anterior

-- Miércoles: Bacalao empanado (2u - 1u - 1u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Bacalao empanado' AND clinic_id = 2;

-- Jueves: Tortilla francesa (2u - 1u - 1u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Tortilla francesa' AND clinic_id = 2;

-- Sábado: Triángulo de patata y queso (2u - 1u - 1u)
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'u' 
WHERE name = 'Triángulo de patata y queso' AND clinic_id = 2;

-- 2. Asegurarse de que los platos que se miden en gramos tengan la unidad correcta
UPDATE kitchen_manager.dishes 
SET measurement_unit = 'gr' 
WHERE name IN (
  'Judías verdes con patatas',
  'Verduras al grill',
  'Porrusalda',
  'Ensalada',
  'Gratén de patatas y espinacas',
  'Zanahoria',
  'Puré de patatas y col',
  'Tomate natural',
  'Guisantes con jamón de pavo',
  'Tortilla de calabacín y patatas patatas',
  'Ensalada mixta',
  'Sopa de fideos y carne ave',
  'Macedonia de verduras',
  'Pizza tres quesos'
) AND clinic_id = 2;
