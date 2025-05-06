-- Script para crear tablas de pacientes para la clínica Korian Ita (ID 2)

-- Tabla para almacenar los pacientes
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    clinic_id INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE,
    UNIQUE KEY unique_patient_clinic (name, clinic_id)
);

-- Tabla para almacenar las restricciones dietéticas de los pacientes
CREATE TABLE IF NOT EXISTS dietary_restrictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    restriction_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Tabla para almacenar los códigos de colores para el pan
CREATE TABLE IF NOT EXISTS bread_color_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    color_name VARCHAR(50) NOT NULL,
    color_code VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    clinic_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

-- Tabla para almacenar las asignaciones de pan para cada comida del paciente
CREATE TABLE IF NOT EXISTS patient_meal_bread (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    meal_type ENUM('breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner') NOT NULL,
    bread_color_id INT,
    is_extra BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (bread_color_id) REFERENCES bread_color_codes(id) ON DELETE SET NULL
);

-- Tabla para almacenar categorías dietéticas especiales
CREATE TABLE IF NOT EXISTS dietary_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    clinic_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

-- Tabla para asignar pacientes a categorías dietéticas
CREATE TABLE IF NOT EXISTS patient_dietary_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES dietary_categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_patient_category (patient_id, category_id)
);

-- Mostrar mensaje de confirmación
SELECT 'Tablas para pacientes de la clínica Korian Ita creadas correctamente' AS mensaje;
