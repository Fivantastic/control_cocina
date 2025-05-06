-- Script para insertar pacientes de la clínica Korian Ita (ID 2)

-- Insertar pacientes
INSERT INTO patients (name, clinic_id, notes) VALUES
('ALAN', 2, 'Paciente con restricciones dietéticas específicas'),
('NENE', 2, 'Paciente con restricciones dietéticas específicas'),
('ANA', 2, 'Paciente con restricciones dietéticas específicas'),
('CAROLINA L', 2, 'Paciente con restricciones dietéticas específicas'),
('CAROLINA S', 2, 'Paciente con restricciones dietéticas específicas'),
('DANIELA', 2, 'Paciente con restricciones dietéticas específicas'),
('KIKI', 2, 'Paciente con restricciones dietéticas específicas'),
('LAURA B', 2, 'Paciente con restricciones dietéticas específicas'),
('LAURA E', 2, 'Paciente con restricciones dietéticas específicas'),
('MARIA', 2, 'Paciente con restricciones dietéticas específicas'),
('NIEVES', 2, 'Paciente con restricciones dietéticas específicas'),
('PAULA T', 2, 'Paciente con restricciones dietéticas específicas');

-- Obtener IDs de los colores de pan
SET @rojo_id = (SELECT id FROM bread_color_codes WHERE color_name = 'Rojo' AND clinic_id = 2 LIMIT 1);
SET @amarillo_id = (SELECT id FROM bread_color_codes WHERE color_name = 'Amarillo' AND clinic_id = 2 LIMIT 1);
SET @azul_id = (SELECT id FROM bread_color_codes WHERE color_name = 'Azul' AND clinic_id = 2 LIMIT 1);
SET @marron_id = (SELECT id FROM bread_color_codes WHERE color_name = 'Marrón' AND clinic_id = 2 LIMIT 1);
SET @extra_rojo_id = (SELECT id FROM bread_color_codes WHERE color_name = 'Extra Rojo' AND clinic_id = 2 LIMIT 1);

-- Obtener IDs de las categorías dietéticas
SET @tea_id = (SELECT id FROM dietary_categories WHERE name = 'TEA' AND clinic_id = 2 LIMIT 1);
SET @sin_gluten_id = (SELECT id FROM dietary_categories WHERE name = 'SIN GLUTEN' AND clinic_id = 2 LIMIT 1);
SET @alan_cat_id = (SELECT id FROM dietary_categories WHERE name = 'ALAN' AND clinic_id = 2 LIMIT 1);
SET @nene_cat_id = (SELECT id FROM dietary_categories WHERE name = 'NENE' AND clinic_id = 2 LIMIT 1);
SET @maria_cat_id = (SELECT id FROM dietary_categories WHERE name = 'MARIA' AND clinic_id = 2 LIMIT 1);

-- Insertar restricciones dietéticas para cada paciente
-- ALAN
SET @alan_id = (SELECT id FROM patients WHERE name = 'ALAN' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@alan_id, 'ALERGIAS', 'No calabacín, guisantes, judías, brócoli, berenjenas, setas'),
(@alan_id, 'ALERGIAS', 'No melón, piña'),
(@alan_id, 'PREFERENCIAS', 'No picante');

-- NENE
SET @nene_id = (SELECT id FROM patients WHERE name = 'NENE' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@nene_id, 'ALERGIAS', 'No aguacate, maíz, aceitunas'),
(@nene_id, 'ALERGIAS', 'No cebolla entera'),
(@nene_id, 'ALERGIAS', 'No champiñones'),
(@nene_id, 'ALERGIAS', 'No tortilla con cebolla');

-- ANA
SET @ana_id = (SELECT id FROM patients WHERE name = 'ANA' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@ana_id, 'INTOLERANCIAS', 'Sin lactosa'),
(@ana_id, 'PREFERENCIAS', 'No pescado, sí atún lata');

-- LAURA B
SET @laura_b_id = (SELECT id FROM patients WHERE name = 'LAURA B' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@laura_b_id, 'ALERGIAS', 'No berenjenas, guisantes, bonito, queso fresco, kiwi'),
(@laura_b_id, 'PREFERENCIAS', 'No kiwi');

-- LAURA E
SET @laura_e_id = (SELECT id FROM patients WHERE name = 'LAURA E' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@laura_e_id, 'PREFERENCIAS', 'No pescado, sí atún en lata');

-- MARIA
SET @maria_id = (SELECT id FROM patients WHERE name = 'MARIA' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@maria_id, 'INTOLERANCIAS', 'Sin lactosa, fría'),
(@maria_id, 'ALERGIAS', 'Cebolla, ajo, pimiento, chorizo, bacon, coliflor'),
(@maria_id, 'ALERGIAS', 'Pasas, dátiles');

-- NIEVES
SET @nieves_id = (SELECT id FROM patients WHERE name = 'NIEVES' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@nieves_id, 'PREFERENCIAS', 'Limpiar fecha caducidad'),
(@nieves_id, 'ALERGIAS', 'No naranja'),
(@nieves_id, 'ALERGIAS', 'Alergia piel kiwi');

-- PAULA T
SET @paula_t_id = (SELECT id FROM patients WHERE name = 'PAULA T' AND clinic_id = 2 LIMIT 1);
INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES
(@paula_t_id, 'PREFERENCIAS', 'No picante, irritantes o cítricos');

-- Asignar pacientes a categorías dietéticas
INSERT INTO patient_dietary_categories (patient_id, category_id) VALUES
(@alan_id, @tea_id),
(@alan_id, @alan_cat_id),
(@nene_id, @nene_cat_id),
(@maria_id, @maria_cat_id);

-- Asignar a KIKI a la categoría SIN GLUTEN
SET @kiki_id = (SELECT id FROM patients WHERE name = 'KIKI' AND clinic_id = 2 LIMIT 1);
INSERT INTO patient_dietary_categories (patient_id, category_id) VALUES
(@kiki_id, @sin_gluten_id);

-- Insertar asignaciones de pan para cada comida del paciente según la imagen
-- ALAN
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@alan_id, 'breakfast', @rojo_id, FALSE),
(@alan_id, 'morning_snack', @rojo_id, FALSE),
(@alan_id, 'lunch', @rojo_id, FALSE),
(@alan_id, 'afternoon_snack', @rojo_id, FALSE),
(@alan_id, 'dinner', @rojo_id, FALSE);

-- NENE
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@nene_id, 'breakfast', @rojo_id, FALSE),
(@nene_id, 'morning_snack', @rojo_id, FALSE),
(@nene_id, 'lunch', @rojo_id, FALSE),
(@nene_id, 'afternoon_snack', @rojo_id, FALSE),
(@nene_id, 'dinner', @rojo_id, FALSE);

-- ANA
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@ana_id, 'breakfast', @amarillo_id, FALSE),
(@ana_id, 'morning_snack', @amarillo_id, FALSE),
(@ana_id, 'lunch', @azul_id, FALSE),
(@ana_id, 'afternoon_snack', @amarillo_id, FALSE),
(@ana_id, 'dinner', @amarillo_id, FALSE);

-- CAROLINA L
SET @carolina_l_id = (SELECT id FROM patients WHERE name = 'CAROLINA L' AND clinic_id = 2 LIMIT 1);
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@carolina_l_id, 'breakfast', @marron_id, FALSE),
(@carolina_l_id, 'morning_snack', @marron_id, FALSE),
(@carolina_l_id, 'lunch', @amarillo_id, FALSE),
(@carolina_l_id, 'afternoon_snack', @amarillo_id, FALSE),
(@carolina_l_id, 'dinner', @amarillo_id, FALSE);

-- CAROLINA S
SET @carolina_s_id = (SELECT id FROM patients WHERE name = 'CAROLINA S' AND clinic_id = 2 LIMIT 1);
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@carolina_s_id, 'breakfast', @extra_rojo_id, TRUE),
(@carolina_s_id, 'morning_snack', @extra_rojo_id, TRUE),
(@carolina_s_id, 'lunch', @rojo_id, FALSE),
(@carolina_s_id, 'afternoon_snack', @rojo_id, FALSE),
(@carolina_s_id, 'dinner', @extra_rojo_id, TRUE);

-- DANIELA
SET @daniela_id = (SELECT id FROM patients WHERE name = 'DANIELA' AND clinic_id = 2 LIMIT 1);
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@daniela_id, 'breakfast', @rojo_id, FALSE),
(@daniela_id, 'morning_snack', @marron_id, FALSE),
(@daniela_id, 'lunch', @amarillo_id, FALSE),
(@daniela_id, 'afternoon_snack', @amarillo_id, FALSE),
(@daniela_id, 'dinner', @amarillo_id, FALSE);

-- KIKI
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@kiki_id, 'breakfast', @extra_rojo_id, TRUE),
(@kiki_id, 'morning_snack', @extra_rojo_id, TRUE),
(@kiki_id, 'lunch', @extra_rojo_id, TRUE),
(@kiki_id, 'afternoon_snack', @extra_rojo_id, TRUE),
(@kiki_id, 'dinner', @extra_rojo_id, TRUE);

-- LAURA B
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@laura_b_id, 'breakfast', @azul_id, FALSE),
(@laura_b_id, 'morning_snack', @marron_id, FALSE),
(@laura_b_id, 'lunch', @marron_id, FALSE),
(@laura_b_id, 'afternoon_snack', @azul_id, FALSE),
(@laura_b_id, 'dinner', @amarillo_id, FALSE);

-- LAURA E
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@laura_e_id, 'breakfast', @rojo_id, FALSE),
(@laura_e_id, 'morning_snack', @rojo_id, FALSE),
(@laura_e_id, 'lunch', @rojo_id, FALSE),
(@laura_e_id, 'afternoon_snack', @rojo_id, FALSE),
(@laura_e_id, 'dinner', @rojo_id, FALSE);

-- MARIA
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@maria_id, 'breakfast', @marron_id, FALSE),
(@maria_id, 'morning_snack', @marron_id, FALSE),
(@maria_id, 'lunch', @marron_id, FALSE),
(@maria_id, 'afternoon_snack', @marron_id, FALSE),
(@maria_id, 'dinner', @rojo_id, FALSE);

-- NIEVES
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@nieves_id, 'breakfast', @rojo_id, FALSE),
(@nieves_id, 'morning_snack', @rojo_id, FALSE),
(@nieves_id, 'lunch', @rojo_id, FALSE),
(@nieves_id, 'afternoon_snack', @marron_id, FALSE),
(@nieves_id, 'dinner', @rojo_id, FALSE);

-- PAULA T
INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra) VALUES
(@paula_t_id, 'breakfast', @marron_id, FALSE),
(@paula_t_id, 'morning_snack', @marron_id, FALSE),
(@paula_t_id, 'lunch', @marron_id, FALSE),
(@paula_t_id, 'afternoon_snack', @marron_id, FALSE),
(@paula_t_id, 'dinner', @marron_id, FALSE);

-- Mostrar mensaje de confirmación
SELECT 'Pacientes de la clínica Korian Ita y sus restricciones dietéticas insertados correctamente' AS mensaje;
