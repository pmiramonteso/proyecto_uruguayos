const express = require('express');

const seguridad = require('./seguridad')
const { chequearToken } = require('../auth');
const respuesta = require('../../red/respuestas')
const controlador = require('./index');

const router = express.Router();

router.get('/', seguridad(), (req, res, siguiente) => {
    try {
        chequearToken.confirmarRolAdmin(req);
        todos(req, res, siguiente); // Solo se ejecuta si es admin
    } catch (error) {
        respuesta.error(req, res, error.message, error.status || 403);
    }
});

router.get('/:id', seguridad(), (req, res, siguiente) => {
    try {
        const userId = req.params.id;
        if (req.user.id === parseInt(userId) || req.user.role === 'admin') { //Que el usuario y el admin vean este perfil
            uno(req, res, siguiente);
        } else {
            respuesta.error(req, res, 'No tienes permiso para ver este usuario', 403);
        }
    } catch (error) {
        respuesta.error(req, res, error.message, error.status || 403);
    }
});

router.post('/', agregar);

router.put('/', seguridad(), (req, res, siguiente) => {
    try {
        chequearToken.confirmarRolAdmin(req);
        eliminar(req, res, siguiente);
    } catch (error) {
        respuesta.error(req, res, error.message, error.status || 403);
    }
});

async function todos (req, res, siguiente) {
    try {
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);  
    } catch (err){
        siguiente(err);
    }
  
};

async function uno (req, res, siguiente) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);  
    } catch (err){
        siguiente(err);
    }
      
};

async function agregar (req, res, siguiente) {
    console.log("Datos recibidos en agregar:", req.body); // Revisar datos recibidos
    try {
        const items = await controlador.agregar(req.body);
        const mensaje = req.body.id == 0 ? 'Usuario guardado' : 'Usuario actualizado';
        console.log("Mensaje:", mensaje); // Verificar msj
        respuesta.success(req, res, mensaje, 201);  
    } catch (err){
        console.error("Error en agregar:", err); // Verificar error capturado
        siguiente(err);
    }
};


async function eliminar (req, res, siguiente) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Usuario eliminado', 200);  
    } catch (err){
        siguiente(err);
    }
};


module.exports = router;