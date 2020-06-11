'use strict'
const express = require('express');
const app = express();
const moment = require('moment');
const Reserva = require('../models/ReservaModel');
const Publicacion = require('../models/PublicacionModel');
const { validaToken } = require('../middlewares/autenticacion');
const { validaPublicacion } = require('../middlewares/validacion/publicacion');


app.post('/reserva', [validaToken, validaPublicacion], (req, res) => {

    let empresa = req.empresa;
    let publicacion = req.publicacion;
    let cantidad = req.body.cantidad;
    let vendedor = publicacion.empresa;

    let reserva = new Reserva({
        publicacion,
        comprador: empresa,
        vendedor,
        cantidad,
        fecha: moment().format("DD-MM-YYYY")
    });

    reserva.save((err, reservaDB) => {
        publicacion.stock = (publicacion.stock - cantidad);
        publicacion.save((err, publicacionDB) => {
            res.json({
                ok: true,
                message: ``,
                reservaDB
            });
        });
    });
});



module.exports = app;