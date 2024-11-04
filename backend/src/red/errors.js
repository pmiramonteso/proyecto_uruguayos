const respuesta = require('./respuestas');

function errors (err, req, res, siguiente) {
    console.error('[error]', err);

    const mensaje = err.mensaje || 'Error interno';
    const status = err.statusCodigo || 500;

    respuesta.error(req, res, mensaje, status);
}

module.exports = errors;