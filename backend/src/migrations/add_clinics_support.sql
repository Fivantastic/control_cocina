-- Crear tabla de clínicas
CREATE TABLE IF NOT EXISTS clinics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    address TEXT,
    contact_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar las clínicas iniciales si no existen
INSERT IGNORE INTO clinics (name, code, address) VALUES 
('Clínica El Seranil', 'seranil', 'Carretera de Ronda, km 3, 29400 Ronda, Málaga'),
('Clínica Korian Ita', 'korian', 'Av. de la Constitución, s/n, 29631 Benalmádena, Málaga');

-- Añadir columna clinic_id a las tablas existentes

-- Tabla products
-- Verificar si la columna ya existe antes de añadirla
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'products' 
        AND COLUMN_NAME = 'clinic_id'
    ),
    'SELECT "Column clinic_id already exists in products"',
    'ALTER TABLE products ADD COLUMN clinic_id INT NOT NULL DEFAULT 1'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Añadir clave foránea si no existe
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'products' 
        AND CONSTRAINT_NAME = 'fk_products_clinic'
    ),
    'SELECT "Foreign key fk_products_clinic already exists"',
    'ALTER TABLE products ADD CONSTRAINT fk_products_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id)'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tabla product_types
-- Verificar si la columna ya existe antes de añadirla
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'product_types' 
        AND COLUMN_NAME = 'clinic_id'
    ),
    'SELECT "Column clinic_id already exists in product_types"',
    'ALTER TABLE product_types ADD COLUMN clinic_id INT NOT NULL DEFAULT 1'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Añadir clave foránea si no existe
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'product_types' 
        AND CONSTRAINT_NAME = 'fk_product_types_clinic'
    ),
    'SELECT "Foreign key fk_product_types_clinic already exists"',
    'ALTER TABLE product_types ADD CONSTRAINT fk_product_types_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id)'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tabla units
-- Verificar si la columna ya existe antes de añadirla
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'units' 
        AND COLUMN_NAME = 'clinic_id'
    ),
    'SELECT "Column clinic_id already exists in units"',
    'ALTER TABLE units ADD COLUMN clinic_id INT NOT NULL DEFAULT 1'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Añadir clave foránea si no existe
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'units' 
        AND CONSTRAINT_NAME = 'fk_units_clinic'
    ),
    'SELECT "Foreign key fk_units_clinic already exists"',
    'ALTER TABLE units ADD CONSTRAINT fk_units_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id)'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tabla suppliers
-- Verificar si la columna ya existe antes de añadirla
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'suppliers' 
        AND COLUMN_NAME = 'clinic_id'
    ),
    'SELECT "Column clinic_id already exists in suppliers"',
    'ALTER TABLE suppliers ADD COLUMN clinic_id INT NOT NULL DEFAULT 1'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Añadir clave foránea si no existe
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'suppliers' 
        AND CONSTRAINT_NAME = 'fk_suppliers_clinic'
    ),
    'SELECT "Foreign key fk_suppliers_clinic already exists"',
    'ALTER TABLE suppliers ADD CONSTRAINT fk_suppliers_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id)'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tabla menus
-- Verificar si la columna ya existe antes de añadirla
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'menus' 
        AND COLUMN_NAME = 'clinic_id'
    ),
    'SELECT "Column clinic_id already exists in menus"',
    'ALTER TABLE menus ADD COLUMN clinic_id INT NOT NULL DEFAULT 1'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Añadir clave foránea si no existe
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'menus' 
        AND CONSTRAINT_NAME = 'fk_menus_clinic'
    ),
    'SELECT "Foreign key fk_menus_clinic already exists"',
    'ALTER TABLE menus ADD CONSTRAINT fk_menus_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id)'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tabla dishes
-- Verificar si la columna ya existe antes de añadirla
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'dishes' 
        AND COLUMN_NAME = 'clinic_id'
    ),
    'SELECT "Column clinic_id already exists in dishes"',
    'ALTER TABLE dishes ADD COLUMN clinic_id INT NOT NULL DEFAULT 1'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Añadir clave foránea si no existe
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'dishes' 
        AND CONSTRAINT_NAME = 'fk_dishes_clinic'
    ),
    'SELECT "Foreign key fk_dishes_clinic already exists"',
    'ALTER TABLE dishes ADD CONSTRAINT fk_dishes_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id)'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Tabla delivery_notes
-- Verificar si la columna ya existe antes de añadirla
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'delivery_notes' 
        AND COLUMN_NAME = 'clinic_id'
    ),
    'SELECT "Column clinic_id already exists in delivery_notes"',
    'ALTER TABLE delivery_notes ADD COLUMN clinic_id INT NOT NULL DEFAULT 1'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Añadir clave foránea si no existe
SET @s = (SELECT IF(
    EXISTS(
        SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'delivery_notes' 
        AND CONSTRAINT_NAME = 'fk_delivery_notes_clinic'
    ),
    'SELECT "Foreign key fk_delivery_notes_clinic already exists"',
    'ALTER TABLE delivery_notes ADD CONSTRAINT fk_delivery_notes_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id)'
));
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
