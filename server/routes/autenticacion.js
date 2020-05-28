const express = require('express');
const app = express();
const Empresa = require('../models/EmpresaModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//============================================
// Registro Empresa
//============================================

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



//============================================
// Autenticacion empresa
//============================================

app.post('/autenticacion', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    Empresa.findOne({ email })
        .exec((err, empresaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error autenticando el usuario',
                    error: err
                });
            };
            if (!empresaDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Usuario o contraseña incorrecta'
                });
            };
            if (!bcrypt.compareSync(password, empresaDB.password)) {
                return res.status(400).json({
                    ok: false,
                    message: 'Usuario o contraseña incorrectos'
                });
            };

            // Generar token
            let token = jwt.sign({ empresa: empresaDB }, process.env.SEED, { expiresIn: '2h' });

            res.json({
                ok: true,
                message: 'Autenticación exitosa',
                token
            });

        });

});



module.exports = app;