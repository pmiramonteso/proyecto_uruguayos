const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middleware/error');
const secret = config.jwt.secret;

function asignarToken(data) {
    const payload = {
        id: data.id,
        rol: data.rol
    };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function verificarToken(token) {
    return jwt.verify(token, secret);
}

const chequearToken = {
    confirmarToken: function(req, id) {
        const decodificado = decodificarCabecera(req);

        if(decodificado.id !== id) {
            throw error("No tienes permisos para hacer esto", 401);
        }
    },
    confirmarRolAdmin: function(req) {
        const decodificado = decodificarCabecera(req);

        if (decodificado.rol !== 'admin') {
            throw error("Acceso denegado. No eres administrador.", 403);
        }
    }
};

function obtenerToken(autorizacion) {
    if (!autorizacion) {
        throw error('No viene token', 401);
    }

    if(autorizacion.indexOf('Bearer') === -1) {
        throw error('Formato inválido', 401)
    }

    let token = autorizacion.replace('Bearer ', '')
    return token;
}
function decodificarCabecera(req) {
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
}
module.exports = {
    asignarToken,
    chequearToken
}