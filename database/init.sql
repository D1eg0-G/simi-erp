CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Nota: En un entorno real, usar bcrypt para hashear
    rol VARCHAR(50) NOT NULL
);

INSERT INTO usuarios (username, password, rol) VALUES ('admin', 'admin123', 'gerente_ti');