-- Insertar platos del menú para el martes (semana 1, comida)
-- Primero obtenemos el ID del menú activo para comidas
SET @menu_id = (SELECT id FROM kitchen_manager.menus WHERE clinic_id = 2 AND service_type = 'comida' AND is_active = 1 LIMIT 1);

-- Insertar Arroz tres delicias como primer plato
INSERT INTO kitchen_manager.menu_dishes 
(menu_id, dish_id, day_of_week, week_number)
VALUES 
(@menu_id, 140, 'Martes', 1);

-- Insertar Salchichas como segundo plato (si no existe ya)
INSERT INTO kitchen_manager.menu_dishes 
(menu_id, dish_id, day_of_week, week_number)
VALUES 
(@menu_id, 147, 'Martes', 1);

-- Insertar Zanahoria salteada como acompañamiento
INSERT INTO kitchen_manager.menu_dishes 
(menu_id, dish_id, day_of_week, week_number)
VALUES 
(@menu_id, 154, 'Martes', 1);

-- También vamos a insertar los platos para el domingo (semana 1, comida)
-- Necesitamos identificar los IDs de los platos para el domingo
-- Asumiendo que el pavo con verduras en salsa es el segundo plato, necesitamos su ID
-- Vamos a usar un valor temporal y luego actualizarlo manualmente

-- Insertar platos del menú para el domingo (semana 1, comida)
-- Paella de Marisco como primer plato (asumiendo que existe, usamos un ID temporal)
SET @paella_id = (SELECT id FROM kitchen_manager.dishes WHERE name LIKE '%Paella%' AND clinic_id = 2 LIMIT 1);
IF @paella_id IS NOT NULL THEN
    INSERT INTO kitchen_manager.menu_dishes 
    (menu_id, dish_id, day_of_week, week_number)
    VALUES 
    (@menu_id, @paella_id, 'Domingo', 1);
END IF;

-- Pavo con verduras en salsa como segundo plato (asumiendo que existe, usamos un ID temporal)
SET @pavo_id = (SELECT id FROM kitchen_manager.dishes WHERE name LIKE '%Pavo%' AND clinic_id = 2 LIMIT 1);
IF @pavo_id IS NOT NULL THEN
    INSERT INTO kitchen_manager.menu_dishes 
    (menu_id, dish_id, day_of_week, week_number)
    VALUES 
    (@menu_id, @pavo_id, 'Domingo', 1);
END IF;
