-- Script para crear tabla de porciones de comida según colores

-- Tabla para almacenar las cantidades de comida según el color
CREATE TABLE IF NOT EXISTS food_portions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    color_id INT NOT NULL,
    portion_type ENUM('1ro', '2ndo', 'Acomp', 'Postre') NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(10) DEFAULT 'gr',
    day_of_week ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    meal_type ENUM('Comida', 'Cena') NOT NULL,
    week_number INT NOT NULL DEFAULT 1,
    clinic_id INT NOT NULL,
    FOREIGN KEY (color_id) REFERENCES bread_color_codes(id) ON DELETE CASCADE,
    FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);
