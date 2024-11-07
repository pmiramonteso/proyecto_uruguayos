const auth = require("../../auth");

module.exports = function chequearAuth () {

    function middleware(req, res, siguiente) {
        const id = req.body.id;
        auth.chequearToken.confirmarToken(req, id)
        siguiente();
    }
    return middleware
}