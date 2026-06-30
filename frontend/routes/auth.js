const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validación básica de entrada
    if (!username || !password) {
        return res.status(400).json({ mensaje: 'Usuario y contraseña requeridos' });
    }

    try {
        // Solo busca por username, NUNCA por password en la query
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE username = $1 AND activo = true',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const usuario = result.rows[0];

        // Comparar contraseña ingresada con hash almacenado
        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Generar JWT
        const token = jwt.sign(
            { 
                id: usuario.id, 
                username: usuario.username,
                rol: usuario.rol 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            token,
            usuario: {
                username: usuario.username,
                rol: usuario.rol
            },
            mensaje: 'Autenticación exitosa' 
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// POST /api/auth/logout (invalida token en cliente)
router.post('/logout', (req, res) => {
    res.json({ mensaje: 'Sesión cerrada exitosamente' });
});

module.exports = router;