-- Insertar datos iniciales en la tabla food_portions para la Semana 1
-- IDs de los colores según la base de datos:
-- 3 = Azul
-- 2 = Amarillo
-- 1 = Rojo

-- ================ SEMANA 1 - COMIDAS ================

-- Primer plato (1ro) - Todos los días tienen el mismo gramaje
INSERT INTO food_portions (color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
-- Lunes
(3, '1ro', 300, 'gr', 'Lunes', 'Comida', 1, 1),
(2, '1ro', 250, 'gr', 'Lunes', 'Comida', 1, 1),
(1, '1ro', 200, 'gr', 'Lunes', 'Comida', 1, 1),
-- Martes
(3, '1ro', 300, 'gr', 'Martes', 'Comida', 1, 1),
(2, '1ro', 250, 'gr', 'Martes', 'Comida', 1, 1),
(1, '1ro', 200, 'gr', 'Martes', 'Comida', 1, 1),
-- Miércoles
(3, '1ro', 300, 'gr', 'Miércoles', 'Comida', 1, 1),
(2, '1ro', 250, 'gr', 'Miércoles', 'Comida', 1, 1),
(1, '1ro', 200, 'gr', 'Miércoles', 'Comida', 1, 1),
-- Jueves
(3, '1ro', 300, 'gr', 'Jueves', 'Comida', 1, 1),
(2, '1ro', 250, 'gr', 'Jueves', 'Comida', 1, 1),
(1, '1ro', 200, 'gr', 'Jueves', 'Comida', 1, 1),
-- Viernes
(3, '1ro', 300, 'gr', 'Viernes', 'Comida', 1, 1),
(2, '1ro', 250, 'gr', 'Viernes', 'Comida', 1, 1),
(1, '1ro', 200, 'gr', 'Viernes', 'Comida', 1, 1),
-- Sábado
(3, '1ro', 300, 'gr', 'Sábado', 'Comida', 1, 1),
(2, '1ro', 250, 'gr', 'Sábado', 'Comida', 1, 1),
(1, '1ro', 200, 'gr', 'Sábado', 'Comida', 1, 1),
-- Domingo
(3, '1ro', 300, 'gr', 'Domingo', 'Comida', 1, 1),
(2, '1ro', 250, 'gr', 'Domingo', 'Comida', 1, 1),
(1, '1ro', 200, 'gr', 'Domingo', 'Comida', 1, 1);

-- Segundo plato (2ndo) - Varía según el día
INSERT INTO food_portions (color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
-- Lunes (Tortilla calabacín y patata)
(3, '2ndo', 300, 'gr', 'Lunes', 'Comida', 1, 1),
(2, '2ndo', 250, 'gr', 'Lunes', 'Comida', 1, 1),
(1, '2ndo', 200, 'gr', 'Lunes', 'Comida', 1, 1),
-- Martes (Salchichas)
(3, '2ndo', 200, 'gr', 'Martes', 'Comida', 1, 1),
(2, '2ndo', 140, 'gr', 'Martes', 'Comida', 1, 1),
(1, '2ndo', 140, 'gr', 'Martes', 'Comida', 1, 1),
-- Miércoles (Jamoncitos de pollos asados)
(3, '2ndo', 2, 'u', 'Miércoles', 'Comida', 1, 1),
(2, '2ndo', 1, 'u', 'Miércoles', 'Comida', 1, 1),
(1, '2ndo', 1, 'u', 'Miércoles', 'Comida', 1, 1),
-- Jueves (Pavo a la plancha)
(3, '2ndo', 2, 'u', 'Jueves', 'Comida', 1, 1),
(2, '2ndo', 1, 'u', 'Jueves', 'Comida', 1, 1),
(1, '2ndo', 1, 'u', 'Jueves', 'Comida', 1, 1),
-- Viernes (Hamburguesa completa)
(3, '2ndo', 1, 'u', 'Viernes', 'Comida', 1, 1),
(2, '2ndo', 1, 'u', 'Viernes', 'Comida', 1, 1),
(1, '2ndo', 1, 'u', 'Viernes', 'Comida', 1, 1),
-- Sábado (Salchichas de ave)
(3, '2ndo', 5, 'u', 'Sábado', 'Comida', 1, 1),
(2, '2ndo', 3, 'u', 'Sábado', 'Comida', 1, 1),
(1, '2ndo', 3, 'u', 'Sábado', 'Comida', 1, 1),
-- Domingo (Pavo con verduras en salsa)
(3, '2ndo', 200, 'gr', 'Domingo', 'Comida', 1, 1),
(2, '2ndo', 140, 'gr', 'Domingo', 'Comida', 1, 1),
(1, '2ndo', 140, 'gr', 'Domingo', 'Comida', 1, 1);

-- Acompañamiento (Acomp) - Todos los días tienen el mismo gramaje
INSERT INTO food_portions (color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
-- Lunes
(3, 'Acomp', 150, 'gr', 'Lunes', 'Comida', 1, 1),
(2, 'Acomp', 100, 'gr', 'Lunes', 'Comida', 1, 1),
(1, 'Acomp', 50, 'gr', 'Lunes', 'Comida', 1, 1),
-- Martes
(3, 'Acomp', 150, 'gr', 'Martes', 'Comida', 1, 1),
(2, 'Acomp', 100, 'gr', 'Martes', 'Comida', 1, 1),
(1, 'Acomp', 50, 'gr', 'Martes', 'Comida', 1, 1),
-- Miércoles
(3, 'Acomp', 150, 'gr', 'Miércoles', 'Comida', 1, 1),
(2, 'Acomp', 100, 'gr', 'Miércoles', 'Comida', 1, 1),
(1, 'Acomp', 50, 'gr', 'Miércoles', 'Comida', 1, 1),
-- Jueves (Berenjena Grill - usando los mismos gramajes)
(3, 'Acomp', 150, 'gr', 'Jueves', 'Comida', 1, 1),
(2, 'Acomp', 100, 'gr', 'Jueves', 'Comida', 1, 1),
(1, 'Acomp', 50, 'gr', 'Jueves', 'Comida', 1, 1),
-- Viernes
(3, 'Acomp', 150, 'gr', 'Viernes', 'Comida', 1, 1),
(2, 'Acomp', 100, 'gr', 'Viernes', 'Comida', 1, 1),
(1, 'Acomp', 50, 'gr', 'Viernes', 'Comida', 1, 1),
-- Sábado
(3, 'Acomp', 150, 'gr', 'Sábado', 'Comida', 1, 1),
(2, 'Acomp', 100, 'gr', 'Sábado', 'Comida', 1, 1),
(1, 'Acomp', 50, 'gr', 'Sábado', 'Comida', 1, 1),
-- Domingo
(3, 'Acomp', 150, 'gr', 'Domingo', 'Comida', 1, 1),
(2, 'Acomp', 100, 'gr', 'Domingo', 'Comida', 1, 1),
(1, 'Acomp', 50, 'gr', 'Domingo', 'Comida', 1, 1);

-- ================ SEMANA 1 - CENAS ================

-- Primer plato (1ro) - Todos los días tienen el mismo gramaje
INSERT INTO food_portions (color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
-- Lunes
(3, '1ro', 300, 'gr', 'Lunes', 'Cena', 1, 1),
(2, '1ro', 250, 'gr', 'Lunes', 'Cena', 1, 1),
(1, '1ro', 200, 'gr', 'Lunes', 'Cena', 1, 1),
-- Martes
(3, '1ro', 300, 'gr', 'Martes', 'Cena', 1, 1),
(2, '1ro', 250, 'gr', 'Martes', 'Cena', 1, 1),
(1, '1ro', 200, 'gr', 'Martes', 'Cena', 1, 1),
-- Miércoles
(3, '1ro', 300, 'gr', 'Miércoles', 'Cena', 1, 1),
(2, '1ro', 250, 'gr', 'Miércoles', 'Cena', 1, 1),
(1, '1ro', 200, 'gr', 'Miércoles', 'Cena', 1, 1),
-- Jueves
(3, '1ro', 300, 'gr', 'Jueves', 'Cena', 1, 1),
(2, '1ro', 250, 'gr', 'Jueves', 'Cena', 1, 1),
(1, '1ro', 200, 'gr', 'Jueves', 'Cena', 1, 1),
-- Viernes
(3, '1ro', 300, 'gr', 'Viernes', 'Cena', 1, 1),
(2, '1ro', 250, 'gr', 'Viernes', 'Cena', 1, 1),
(1, '1ro', 200, 'gr', 'Viernes', 'Cena', 1, 1),
-- Sábado
(3, '1ro', 300, 'gr', 'Sábado', 'Cena', 1, 1),
(2, '1ro', 250, 'gr', 'Sábado', 'Cena', 1, 1),
(1, '1ro', 200, 'gr', 'Sábado', 'Cena', 1, 1),
-- Domingo
(3, '1ro', 300, 'gr', 'Domingo', 'Cena', 1, 1),
(2, '1ro', 250, 'gr', 'Domingo', 'Cena', 1, 1),
(1, '1ro', 200, 'gr', 'Domingo', 'Cena', 1, 1);

-- Segundo plato (2ndo) - Varía según el día
INSERT INTO food_portions (color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
-- Lunes (Abadejo relleno mostaza y miel)
(3, '2ndo', 2, 'u', 'Lunes', 'Cena', 1, 1),
(2, '2ndo', 1, 'u', 'Lunes', 'Cena', 1, 1),
(1, '2ndo', 1, 'u', 'Lunes', 'Cena', 1, 1),
-- Martes (Pavo a la plancha)
(3, '2ndo', 2, 'u', 'Martes', 'Cena', 1, 1),
(2, '2ndo', 1, 'u', 'Martes', 'Cena', 1, 1),
(1, '2ndo', 1, 'u', 'Martes', 'Cena', 1, 1),
-- Miércoles (Bacalao empanado)
(3, '2ndo', 2, 'u', 'Miércoles', 'Cena', 1, 1),
(2, '2ndo', 1, 'u', 'Miércoles', 'Cena', 1, 1),
(1, '2ndo', 1, 'u', 'Miércoles', 'Cena', 1, 1),
-- Jueves (Tortilla francesa)
(3, '2ndo', 1, 'u', 'Jueves', 'Cena', 1, 1),
(2, '2ndo', 1, 'u', 'Jueves', 'Cena', 1, 1),
(1, '2ndo', 1, 'u', 'Jueves', 'Cena', 1, 1),
-- Viernes (Tortilla de calabacín y patatas)
(3, '2ndo', 300, 'gr', 'Viernes', 'Cena', 1, 1),
(2, '2ndo', 250, 'gr', 'Viernes', 'Cena', 1, 1),
(1, '2ndo', 200, 'gr', 'Viernes', 'Cena', 1, 1),
-- Sábado (Triángulo de patata y queso)
(3, '2ndo', 2, 'u', 'Sábado', 'Cena', 1, 1),
(2, '2ndo', 1, 'u', 'Sábado', 'Cena', 1, 1),
(1, '2ndo', 1, 'u', 'Sábado', 'Cena', 1, 1),
-- Domingo (Pizza tres quesos)
(3, '2ndo', 300, 'gr', 'Domingo', 'Cena', 1, 1),
(2, '2ndo', 250, 'gr', 'Domingo', 'Cena', 1, 1),
(1, '2ndo', 200, 'gr', 'Domingo', 'Cena', 1, 1);

-- Acompañamiento (Acomp) - Todos los días tienen el mismo gramaje
INSERT INTO food_portions (color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id)
VALUES 
-- Lunes
(3, 'Acomp', 150, 'gr', 'Lunes', 'Cena', 1, 1),
(2, 'Acomp', 100, 'gr', 'Lunes', 'Cena', 1, 1),
(1, 'Acomp', 50, 'gr', 'Lunes', 'Cena', 1, 1),
-- Martes
(3, 'Acomp', 150, 'gr', 'Martes', 'Cena', 1, 1),
(2, 'Acomp', 100, 'gr', 'Martes', 'Cena', 1, 1),
(1, 'Acomp', 50, 'gr', 'Martes', 'Cena', 1, 1),
-- Miércoles
(3, 'Acomp', 150, 'gr', 'Miércoles', 'Cena', 1, 1),
(2, 'Acomp', 100, 'gr', 'Miércoles', 'Cena', 1, 1),
(1, 'Acomp', 50, 'gr', 'Miércoles', 'Cena', 1, 1),
-- Jueves
(3, 'Acomp', 150, 'gr', 'Jueves', 'Cena', 1, 1),
(2, 'Acomp', 100, 'gr', 'Jueves', 'Cena', 1, 1),
(1, 'Acomp', 50, 'gr', 'Jueves', 'Cena', 1, 1),
-- Viernes
(3, 'Acomp', 150, 'gr', 'Viernes', 'Cena', 1, 1),
(2, 'Acomp', 100, 'gr', 'Viernes', 'Cena', 1, 1),
(1, 'Acomp', 50, 'gr', 'Viernes', 'Cena', 1, 1),
-- Sábado
(3, 'Acomp', 150, 'gr', 'Sábado', 'Cena', 1, 1),
(2, 'Acomp', 100, 'gr', 'Sábado', 'Cena', 1, 1),
(1, 'Acomp', 50, 'gr', 'Sábado', 'Cena', 1, 1),
-- Domingo
(3, 'Acomp', 150, 'gr', 'Domingo', 'Cena', 1, 1),
(2, 'Acomp', 100, 'gr', 'Domingo', 'Cena', 1, 1),
(1, 'Acomp', 50, 'gr', 'Domingo', 'Cena', 1, 1);
