const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administrador = require('../../models/AdministradorModel');
const { validaAdministrador } = require('../../middlewares/administracion');

//===========================================
// Crear administrador 
//===========================================;

app.post('/administrador', [validaAdministrador], (req, res) => {

    let body = req.body;
    let administrador = new Administrador({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });
    administrador.save((err, administradorDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error registrando el administrador',
                err
            });
        };
        res.json({
            ok: true,
            message: 'Administrador registrado exitosamente'
        });
    });

});

//===========================================
//Login administrador
//===========================================;

app.post('/autenticacion-administrador', [], (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    Administrador.findOne({ email }, (err, administradorDB) => {
        if (!administradorDB) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });
        };
        if (!bcrypt.compareSync(password, administradorDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos'
            });
        };

        let tokenAdministrador = jwt.sign({ administrador: administradorDB }, process.env.SEED, { expiresIn: '1h' });

        res.json({
            ok: true,
            message: 'Login efectuado correctamente',
            tokenAdministrador
        })
    });
});

//
module.exports = app;