const express = require('express');
const app = express();
const Empresa = require('../models/EmpresaModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/////////////////////////////////////////////
// Login de empresa
/////////////////////////////////////////////

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
            let token = jwt.sign({ empresa: empresaDB }, 'semilla-desarrollo-ipronect', { expiresIn: '2h' });

            res.json({
                ok: true,
                message: 'Autenticación exitosa',
                token
            });

        });

});



module.exports = app;