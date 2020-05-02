const express = require('express');
const app = express();
const Empresa = require('../models/EmpresaModel');
const bcrypt = require('bcrypt');
const Publicacion = require('../models/PublicacionModel')


/////////////////////////////////////////////
// Registro de empresa
/////////////////////////////////////////////

app.post('/registro', (req, res) => {

    let body = req.body;
    let empresa = new Empresa({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //encriptar
        telefono: body.telefono,
        direccion: body.direccion,
        patente: body.patente, // puede o no venir
        tipoEmpresa: body.tipoEmpresa
    });

    empresa.save((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error registrando el usuario',
                error: err
            });
        };

        res.json({
            ok: true,
            message: 'Empresa registrada correctamente'
        })
    });

});

module.exports = app;