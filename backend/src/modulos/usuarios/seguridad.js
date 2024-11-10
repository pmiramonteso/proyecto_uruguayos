const auth = require("../../auth");

module.exports = function chequearAuth () {
    return function (req, res, siguiente) {
        try {
            const id = req.body.id;
            auth.chequearToken.confirmarToken(req, id)
            siguiente();
        } catch (error) {
            respuesta.error(req, res, error.message, error.status || 401);
        }
        
    }
}