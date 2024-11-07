const bcrypt = require('bcrypt');
const TABLA = 'auth';

module.exports = function(dbInyectada){
    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    async function agregar(data) {

        const authData = {
            id: data.id,
        }
        if(data.usuario){
            authData.usuario = data.usuario
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        return db.agregar(TABLA, authData);
    }
 
    return {
    agregar

    }
}