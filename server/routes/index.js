const express = require('express');
const app = express();

app.use(require('../routes/empresa'));
app.use(require('../routes/autenticacion'));
app.use(require('../routes/publicacion'));
app.use(require('../routes/comentario'));
app.use(require('../routes/reserva'));



//============================================
// Organizacionales
//============================================
app.use(require('./organizacional/categoria'));
app.use(require('./organizacional/producto'));



//===========================================
//Rutas administrador
//===========================================;
app.use(require('./administracion/administrador'));
app.use(require('./administracion/publicacion'));

module.exports = app;