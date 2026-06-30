const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

// Ruta protegida por el middleware
router.get('/datos', verificarToken, (req, res) => {
    res.json({
        mensaje: 'Bienvenido al sistema ERP SIMI',
        datos: [
            { sucursal: 'Centro', ventas: 1500 },
            { sucursal: 'Norte', ventas: 800 }
        ],
        usuarioAuth: req.usuario
    });
});

module.exports = router;