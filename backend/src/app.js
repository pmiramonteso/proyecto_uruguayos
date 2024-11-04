const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const usuarios = require('./modulos/usuarios/rutas');
const eventos = require('./modulos/eventos/rutas');
const error = require('./red/errors');

const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Configuracion
app.set('port', config.app.port);

//Rutas
app.use('/api/usuarios', usuarios);
app.use('/api/eventos', eventos);
app.use(error);

module.exports = app;