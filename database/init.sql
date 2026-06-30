-- ============================================
-- SIMI ERP - Script de inicialización BD
-- ============================================

-- Tabla de usuarios del sistema
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- almacena hash bcrypt
    rol VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos (ERP básico)
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    stock INTEGER DEFAULT 0,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    total DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de detalle ventas
CREATE TABLE IF NOT EXISTS detalle_ventas (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER REFERENCES ventas(id),
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
);

-- ============================================
-- Contraseña 'admin123' hasheada con bcrypt
-- ============================================
INSERT INTO usuarios (username, password, rol) VALUES 
('admin', '$2b$10$kH.R7i4ydDC9V1U4sHjh0ePAaCjwop9xpE5l.BKk7tMPA01Zo.o16', 'gerente_ti'),
('operador', '$2b$10$kH.R7i4ydDC9V1U4sHjh0ePAaCjwop9xpE5l.BKk7tMPA01Zo.o16', 'operador')
ON CONFLICT (username) DO NOTHING;

-- Productos de ejemplo (farmacia SIMI)
INSERT INTO productos (nombre, descripcion, stock, precio, categoria) VALUES
('Paracetamol 500mg', 'Analgésico y antipirético', 100, 990, 'Medicamentos'),
('Ibuprofeno 400mg', 'Antiinflamatorio', 80, 1290, 'Medicamentos'),
('Alcohol gel 500ml', 'Antiséptico de manos', 50, 2490, 'Higiene'),
('Mascarilla KN95', 'Protección respiratoria', 200, 1990, 'Protección')
ON CONFLICT DO NOTHING;