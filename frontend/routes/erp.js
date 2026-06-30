const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const verificarToken = require('../middlewares/verificarToken');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Middleware de rol — solo gerente_ti puede acceder
const soloGerente = (req, res, next) => {
    if (req.usuario.rol !== 'gerente_ti') {
        return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol gerente_ti' });
    }
    next();
};

// GET /api/erp/dashboard — resumen general (cualquier usuario autenticado)
router.get('/dashboard', verificarToken, (req, res) => {
    res.json({
        mensaje: `Bienvenido al ERP SIMI, ${req.usuario.username}`,
        rol: req.usuario.rol,
        timestamp: new Date().toISOString()
    });
});

// GET /api/erp/productos — lista productos desde BD
router.get('/productos', verificarToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, nombre, descripcion, stock, precio, categoria FROM productos ORDER BY nombre'
        );
        res.json({ productos: result.rows });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// GET /api/erp/usuarios — solo gerente_ti puede ver usuarios
router.get('/usuarios', verificarToken, soloGerente, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, rol, activo, created_at FROM usuarios ORDER BY id'
        );
        res.json({ usuarios: result.rows });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// GET /api/erp/ventas — historial de ventas
router.get('/ventas', verificarToken, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT v.id, u.username, v.total, v.fecha
            FROM ventas v
            JOIN usuarios u ON v.usuario_id = u.id
            ORDER BY v.fecha DESC
            LIMIT 50
        `);
        res.json({ ventas: result.rows });
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ error: 'Error al obtener ventas' });
    }
});

module.exports = router;