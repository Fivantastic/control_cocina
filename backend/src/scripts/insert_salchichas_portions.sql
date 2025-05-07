-- Insertar porciones específicas para las salchichas del martes (semana 1, comida)
-- IDs de los colores verificados en la base de datos
-- Rojo (1), Amarillo (2), Azul (3), Extra Rojo (5)

-- Insertar porción para el color Rojo (140 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(1, '2ndo', 140, 'gr', 'Martes', 'Comida', 1, 2);

-- Insertar porción para el color Amarillo (140 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(2, '2ndo', 140, 'gr', 'Martes', 'Comida', 1, 2);

-- Insertar porción para el color Azul (200 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(3, '2ndo', 200, 'gr', 'Martes', 'Comida', 1, 2);

-- Insertar porción para el color Extra Rojo (140 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(5, '2ndo', 140, 'gr', 'Martes', 'Comida', 1, 2);

-- Insertar porciones específicas para el pavo del domingo (semana 1, comida)
-- Con las mismas cantidades que las salchichas del martes

-- Insertar porción para el color Rojo (140 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(1, '2ndo', 140, 'gr', 'Domingo', 'Comida', 1, 2);

-- Insertar porción para el color Amarillo (140 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(2, '2ndo', 140, 'gr', 'Domingo', 'Comida', 1, 2);

-- Insertar porción para el color Azul (200 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(3, '2ndo', 200, 'gr', 'Domingo', 'Comida', 1, 2);

-- Insertar porción para el color Extra Rojo (140 gr)
INSERT INTO kitchen_manager.food_portions 
(color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
(5, '2ndo', 140, 'gr', 'Domingo', 'Comida', 1, 2);
