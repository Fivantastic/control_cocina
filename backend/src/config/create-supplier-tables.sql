-- Tabla de proveedores
CREATE TABLE IF NOT EXISTS suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20),                    -- Código interno del proveedor
    name VARCHAR(100) NOT NULL,          -- Nombre del proveedor
    tax_id VARCHAR(20),                  -- CIF/NIF
    address TEXT,                        -- Dirección completa
    contact_phone VARCHAR(20),           -- Teléfono de contacto
    type VARCHAR(20),                    -- Tipo de productos principales
    delivery_schedule TEXT,              -- Horario de entrega
    temperature_requirements TEXT,        -- Requisitos de temperatura
    sales_rep_name VARCHAR(100),         -- Nombre del comercial
    sales_rep_id VARCHAR(20),            -- ID del comercial
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de albaranes
CREATE TABLE IF NOT EXISTS delivery_notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    supplier_delivery_note_number VARCHAR(20),  -- Número de albarán del proveedor
    external_reference VARCHAR(50),             -- Referencia externa
    expedition_number VARCHAR(50),              -- Número de expedición
    client_number VARCHAR(20),                  -- Número de cliente
    delivery_date DATE NOT NULL,                -- Fecha de entrega
    delivery_location TEXT,                     -- Lugar de entrega
    total_packages INT,                         -- Número total de bultos
    total_weight DECIMAL(10,2),                 -- Peso total
    temperature_zone VARCHAR(20),               -- Zona de temperatura
    delivery_schedule VARCHAR(100),             -- Horario de entrega específico
    payment_method VARCHAR(50),                 -- Forma de pago
    sales_rep_id VARCHAR(20),                   -- ID del comercial
    total_net_amount DECIMAL(10,2),            -- Importe neto
    total_tax_amount DECIMAL(10,2),            -- Importe IVA
    total_mer_amount DECIMAL(10,2),            -- Importe M.E.R.
    total_amount DECIMAL(10,2),                -- Importe total
    notes TEXT,                                -- Observaciones
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Tabla de líneas de albarán
CREATE TABLE IF NOT EXISTS delivery_note_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    delivery_note_id INT NOT NULL,
    product_id INT,                            -- Referencia al producto en nuestra base de datos
    supplier_product_code VARCHAR(50),         -- Código del producto del proveedor
    product_family VARCHAR(20),               -- Familia del producto (SURG, FRA-3, etc.)
    product_category VARCHAR(50),             -- Categoría (ALIMENTACIÓN, etc.)
    description TEXT,                         -- Descripción del producto
    unit_type VARCHAR(10),                    -- Tipo de unidad (C/N, UNI, etc.)
    quantity DECIMAL(10,3),                   -- Cantidad
    weight_per_unit DECIMAL(10,3),           -- Peso por unidad
    total_weight DECIMAL(10,3),              -- Peso total
    unit_price DECIMAL(10,4),                -- Precio unitario
    net_price DECIMAL(10,2),                 -- Precio neto
    tax_rate DECIMAL(5,2),                   -- Tasa de IVA
    mer_rate DECIMAL(5,2),                   -- Tasa M.E.R.
    total_price DECIMAL(10,2),               -- Precio total
    batch_number VARCHAR(50),                -- Número de lote
    expiry_date DATE,                        -- Fecha de caducidad
    ean13_code VARCHAR(13),                  -- Código EAN13
    temperature_requirements TEXT,            -- Requisitos de temperatura
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_note_id) REFERENCES delivery_notes(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla de resumen de impuestos por albarán
CREATE TABLE IF NOT EXISTS tax_summary (
    id INT PRIMARY KEY AUTO_INCREMENT,
    delivery_note_id INT NOT NULL,
    tax_base DECIMAL(10,2),                  -- Base imponible
    tax_rate DECIMAL(5,2),                   -- Tasa de IVA
    tax_amount DECIMAL(10,2),                -- Importe IVA
    mer_amount DECIMAL(10,2),                -- Importe M.E.R.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_note_id) REFERENCES delivery_notes(id)
);

-- Tabla de registro de temperaturas
CREATE TABLE IF NOT EXISTS temperature_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    delivery_note_id INT NOT NULL,
    temperature DECIMAL(5,2),                -- Temperatura registrada
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_note_id) REFERENCES delivery_notes(id)
);

-- Insertar proveedores iniciales
INSERT INTO suppliers (name, type) VALUES
('DISBESA', 'SECO'),
('LOGIFREST', 'CONGELADO'),
('ABASTHOSUR', 'FRESCO');
