const express = require('express');
const app = express();

app.use(require('../routes/empresa'));
app.use(require('../routes/autenticacion'));
app.use(require('../routes/publicacion'));




//===========================================
//Rutas administrador
//===========================================;
app.use(require('./administracion/administrador'));
app.use(require('./administracion/publicacion'));

module.exports = app;