const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verificar que exista el header
    if (!authHeader) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    // Verificar formato "Bearer <token>"
    const partes = authHeader.split(' ');
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(403).json({ mensaje: 'Formato de token inválido. Use: Bearer <token>' });
    }

    const token = partes[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        // Distinguir tipo de error
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: 'Token expirado, inicia sesión nuevamente' });
        }
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};

module.exports = verificarToken;