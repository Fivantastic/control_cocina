-- Creación de nuevas tablas para el sistema de menús
-- Este script es seguro de ejecutar múltiples veces y no afecta a las tablas existentes

-- Tabla de menús
CREATE TABLE IF NOT EXISTS menus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,          -- Nombre del menú (ej: "Menú Invierno 2025")
    season VARCHAR(50) NOT NULL,         -- Temporada (Invierno, Verano, etc.)
    service_type ENUM('comida', 'cena') NOT NULL,  -- Tipo de servicio
    total_weeks INT DEFAULT 4,           -- Número total de semanas del menú
    start_date DATE,                     -- Fecha de inicio de vigencia
    end_date DATE,                       -- Fecha de fin de vigencia
    is_active BOOLEAN DEFAULT true,      -- Si el menú está activo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de platos
CREATE TABLE IF NOT EXISTS dishes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,          -- Nombre del plato
    category VARCHAR(50) NOT NULL,       -- Categoría (Primero, Segundo, Postre)
    description TEXT,                    -- Descripción o notas del plato
    allergens TEXT,                      -- Información de alérgenos
    is_suitable_cold BOOLEAN DEFAULT false, -- Si es apto para servir frío
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de relación menú-platos (para especificar qué platos van en qué día)
CREATE TABLE IF NOT EXISTS menu_dishes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    menu_id INT NOT NULL,
    dish_id INT NOT NULL,
    day_of_week INT NOT NULL,           -- 1-7 (Lunes a Domingo)
    week_number INT NOT NULL,           -- Número de semana del menú (1-4)
    dish_order INT NOT NULL,            -- Orden del plato en el servicio (1: primero, 2: segundo, 3: postre)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
    CHECK (week_number BETWEEN 1 AND 4),
    CHECK (day_of_week BETWEEN 1 AND 7),
    CHECK (dish_order BETWEEN 1 AND 3)
);

-- Tabla de ingredientes por plato (para futuras fichas técnicas y cálculo de costes)
CREATE TABLE IF NOT EXISTS dish_products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dish_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10,3) NOT NULL,     -- Cantidad necesaria del producto
    unit_id INT NOT NULL,                -- Unidad de medida
    batch_number VARCHAR(100),           -- Número de lote para trazabilidad
    notes TEXT,                          -- Notas de preparación específicas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE RESTRICT
);
