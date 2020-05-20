const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administrador = require('../../models/AdministradorModel');
const Publicacion = require('../../models/PublicacionModel');
const Observacion = require('../../models/ObservacionModel');
const { validaAdministrador } = require('../../middlewares/administracion');

//============================================
// Ver las publicaciones segun su estado
//============================================

app.get('/publicacion-administrador', [validaAdministrador], (req, res) => {

    let estado = req.body.estado;
    verificarEstado(estado, res);
    Publicacion.find({ estadoPublicacion: estado })
        .exec((err, publicacionesDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error obteniendo las publicaciones',
                    err
                });
            };
            Publicacion.countDocuments({ estadoPublicacion: estado }, (err, cantidad) => {
                if (cantidad <= 0) {
                    return res.status(500).json({
                        ok: false,
                        message: 'No hay publicaciones registradas en ese estado'
                    });
                };
                res.json({
                    ok: true,
                    message: `Lista de publicaciones en estado ${estado}: `,
                    cantidad,
                    publicaciones: publicacionesDB
                })
            });
        });
});

//============================================
// Cambiar estado de publicacion 
//============================================

app.put('/publicacion-administrador/:publicacion', [validaAdministrador], (req, res) => {

    let publicacion = req.params.publicacion;
    let administrador = req.administrador;
    let estado = req.body.estado;
    verificarEstado(estado, res);

    if (estado == 'Rechazada' || estado == 'Con-observacion') {
        Publicacion.findByIdAndUpdate(publicacion, { estadoPublicacion: estado }, { useFindAndModify: false }, (err, publicacionDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error encontrando la publicacion',
                    err
                });
            };
            let observacion = new Observacion({
                observador: administrador,
                publicacion: publicacionDB,
                observacion: req.body.observacion
            });
            observacion.save((err, observacionDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error ingresando la observacion',
                        err
                    });
                };
                res.json({
                    ok: true,
                    message: 'Publicacion actualizada de estado y agregada de observaciones correctamente'
                });
            });
        });

    } else {
        Publicacion.findByIdAndUpdate(publicacion, { estadoPublicacion: estado }, { useFindAndModify: false }, (err, publicacionDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error encontrando la publicacion',
                    err
                });
            };
            res.json({
                ok: true,
                message: 'Publicacion actualizada de estado correctamente'
            });
        });
    };



});



//============================================
// Funciones
//============================================

function verificarEstado(estado, res) {
    let estadosPermitidos = ['Aprobada', 'Rechazada', 'Con-observacion'];
    if (estadosPermitidos.indexOf(estado) < 0) {
        return res.status(500).json({
            ok: false,
            message: `Estado ingresado no es valido, los estado validos son:  ${estadosPermitidos}`
        });
    };
};
module.exports = app;