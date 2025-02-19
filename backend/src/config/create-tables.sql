-- Tabla de tipos de producto
CREATE TABLE IF NOT EXISTS product_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,          -- Congelado, Fresco, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de unidades de medida
CREATE TABLE IF NOT EXISTS units (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,          -- Kilogramo, Caja, etc.
    abbreviation VARCHAR(10) NOT NULL,   -- KG, CAJ, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50),                   -- Código interno del producto
    name VARCHAR(200) NOT NULL,         -- Nombre/descripción del producto
    type_id INT,                        -- Tipo de producto (congelado, fresco, etc.)
    purchase_unit_id INT,               -- Unidad de compra (CAJ, KG, etc.)
    unit_quantity DECIMAL(10,2),        -- Cantidad por unidad (ej: 6 para cajas de 6KG)
    base_unit_id INT,                   -- Unidad base para el stock (KG, L, etc.)
    theoretical_stock DECIMAL(10,3),    -- Stock teórico
    actual_stock DECIMAL(10,3),         -- Stock real (contado)
    minimum_stock DECIMAL(10,3),        -- Stock mínimo
    price DECIMAL(10,2),                -- Precio por unidad
    last_count_date DATE,               -- Última fecha de conteo
    notes TEXT,                         -- Notas adicionales
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES product_types(id),
    FOREIGN KEY (purchase_unit_id) REFERENCES units(id),
    FOREIGN KEY (base_unit_id) REFERENCES units(id)
);

-- Insertar tipos de producto básicos
INSERT INTO product_types (name) VALUES
('CONGELADO'),
('FRESCO'),
('SECO'),
('CONSERVA');

-- Insertar unidades básicas
INSERT INTO units (name, abbreviation) VALUES
('Kilogramo', 'KG'),
('Caja', 'CAJ'),
('Litro', 'L'),
('Unidad', 'UD'),
('Bolsa', 'BOL'),
('Paquete', 'PAQ');
