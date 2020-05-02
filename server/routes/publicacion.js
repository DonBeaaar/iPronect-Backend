const express = require('express');
const app = express();
const Publicacion = require('../models/PublicacionModel');
const { validaToken } = require('../middlewares/autenticacion');

//===========================================
// Creacion de publicacion
//===========================================

app.post('/ingresar-publicacion', [validaToken], (req, res) => {

    let body = req.body;
    let publicacion = new Publicacion({
        empresa: req.empresa,
        titulo: body.titulo,
        precio: body.precio,
        descripcion: body.descripcion,
        producto: body.producto,
        stock: body.stock,
        despachoDomicilio: body.despachoDomicilio,
        unidad: body.unidad,
        tipoVenta: body.tipoVenta,
        diasRetiro: body.diasRetiro,
        direccionRetiro: body.direccionRetiro,
        imagenes: body.imagenes
    });

    publicacion.save((err, publicacionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error registrando la publicacion'
            });
        };

        res.json({
            ok: true,
            message: 'Publicacion registrada exitosamente'
        });
    });

});






module.exports = app;