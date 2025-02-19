-- Crear una tabla temporal para guardar los IDs únicos de cada plato
CREATE TEMPORARY TABLE unique_dish_ids AS
SELECT MIN(id) as keep_id, name
FROM dishes
GROUP BY name;

-- Actualizar las referencias en menu_dishes para usar los IDs únicos
UPDATE menu_dishes md
JOIN dishes d ON md.dish_id = d.id
JOIN unique_dish_ids u ON d.name = u.name
SET md.dish_id = u.keep_id
WHERE md.dish_id != u.keep_id;

-- Eliminar los duplicados en menu_dishes
DELETE m1 FROM menu_dishes m1
INNER JOIN menu_dishes m2
WHERE m1.id > m2.id
  AND m1.menu_id = m2.menu_id
  AND m1.dish_id = m2.dish_id
  AND m1.week_number = m2.week_number
  AND m1.day_of_week = m2.day_of_week
  AND m1.dish_order = m2.dish_order;

-- Eliminar los platos duplicados en dishes, manteniendo los que tienen el ID más bajo
DELETE d FROM dishes d
JOIN unique_dish_ids u ON d.name = u.name
WHERE d.id != u.keep_id;
