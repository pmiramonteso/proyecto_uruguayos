const bcrypt = require('bcrypt');
const auth = require('../../auth');
const TABLA = 'auth';

module.exports = function(dbInyectada){
    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    async function login(email, password) {
        const data = await db.query(TABLA, {email: email});

        if (!data) {
            throw new Error('Usuario no encontrado');
        }
        const passwordValida = await bcrypt.compare(password, data.password);
        
            if(passwordValida) {
                return auth.asignarToken({ ...data})
            }else{
                throw new Error('Contraseña o usuario inválidos');
        }
    }
    async function agregar(data) {
        const hashedPassword = await bcrypt.hash(data.password.toString(), 5);
        const authData = {
            email: data.email,
            password: hashedPassword,
        }
        const resultado = db.agregar(TABLA, authData);
        if (resultado && resultado.insertId) {
            await db.query('UPDATE usuarios SET auth_id = ? WHERE id = ?', [resultado.insertId, data.id]);
    }
    return resultado;
}
 
    return {
    agregar,
    login
    }
}