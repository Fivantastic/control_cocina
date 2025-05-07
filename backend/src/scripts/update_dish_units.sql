-- Actualizar unidades de medida para platos específicos
-- Platos que se miden en unidades (u) en lugar de gramos (gr)

-- Actualizar jamoncitos de pollo
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%jamoncito%' OR name LIKE '%Jamoncito%';

-- Actualizar pavo a la plancha
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%pavo a la plancha%' OR name LIKE '%Pavo a la plancha%';

-- Actualizar hamburguesas
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%hamburguesa%' OR name LIKE '%Hamburguesa%';

-- Actualizar salchichas
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%salchicha%' OR name LIKE '%Salchicha%';

-- Actualizar abadejo relleno
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%abadejo relleno%' OR name LIKE '%Abadejo relleno%';

-- Actualizar bacalao empanado
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%bacalao empanado%' OR name LIKE '%Bacalao empanado%';

-- Actualizar tortilla francesa
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%tortilla francesa%' OR name LIKE '%Tortilla francesa%';

-- Actualizar triángulo de patata y queso
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%triángulo de patata%' OR name LIKE '%Triángulo de patata%';

-- Actualizar huevos
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%huevo%' OR name LIKE '%Huevo%';

-- Actualizar filetes
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE name LIKE '%filete%' OR name LIKE '%Filete%';

-- Actualizar otros platos que se miden por unidades
UPDATE kitchen_manager.dishes SET measurement_unit = 'u' WHERE 
    name LIKE '%porción%' OR 
    name LIKE '%Porción%' OR
    name LIKE '%ración%' OR
    name LIKE '%Ración%' OR
    name LIKE '%unidad%' OR
    name LIKE '%Unidad%';
