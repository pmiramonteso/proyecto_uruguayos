const TABLA = 'usuarios';
const auth = require('../auth')

module.exports = function(dbInyectada){
    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    function todos() {
        return db.todos(TABLA);
    }
    
    function uno(id) {
        return db.uno(TABLA, id);
    }
    async function verificarEmailExistente(email) {
        const resultado = await db.consultar(TABLA, { email: email });
      
        if (resultado.length > 0) {
            throw new Error('El correo ya está registrado');
        }
        return true;
    }
    async function agregar(body) {

        await verificarEmailExistente(body.email);
        
        const usuario = {
            nombre: body.nombre,
            apellidos: body.apellidos,
            email: body.email,
        }
        const respuesta = await db.agregar(TABLA, usuario);
        let insertId = respuesta.insertId || body.id;

        if (insertId && (body.email || body.password)) {
            await auth.agregar({
                id: insertId,
                email: body.email,
                password: body.password,
            });
        }
        return respuesta;
    }
    
    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }

    return {
    todos,
    uno,
    agregar,
    eliminar
    }
};