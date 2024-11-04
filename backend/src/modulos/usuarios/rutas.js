const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);

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
    try {
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Usuario guardado';
        } else {
            mensaje = ' Usuario actualizado';
        }
        respuesta.success(req, res, mensaje, 201);  
    } catch (err){
        siguiente(err);
    }
};

async function eliminar (req, res, siguiente) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado', 200);  
    } catch (err){
        siguiente(err);
    }
};


module.exports = router;