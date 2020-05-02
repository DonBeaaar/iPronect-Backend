const express = require('express');
const app = express();

app.use(require('../routes/empresa'));
app.use(require('../routes/autenticacion'));
app.use(require('../routes/publicacion'));

module.exports = app;