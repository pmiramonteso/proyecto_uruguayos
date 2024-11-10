const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');


const usuarios = require('./modulos/usuarios/rutas');
const eventos = require('./modulos/eventos/rutas');
const auth = require('./modulos/auth/rutas');
const error = require('./red/errors');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Configuracion
app.set('port', config.app.port);

//Rutas
app.use('/api/usuarios', usuarios);
app.use('/api/eventos', eventos);
app.use('/api/auth', auth);

app.use(error);

module.exports = app;