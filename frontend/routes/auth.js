const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE username = $1 AND password = $2', [username, password]);
        
        if (result.rows.length > 0) {
            const usuario = result.rows[0];
            const token = jwt.sign(
                { id: usuario.id, rol: usuario.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.json({ token, mensaje: 'Autenticación exitosa' });
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

module.exports = router;