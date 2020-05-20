require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Direccionamiento de peticiones
app.use(require('../server/routes/index'));


app.get('/', (req, res) => {
    res.json('iPronect');
});

mongoose.connect('mongodb://localhost:27017/iPronect', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) {
        throw (err)
    } else { console.log('Base de datos correctamente conectada'); }
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});