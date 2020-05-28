const express = require('express');
const app = express();
const Empresa = require('../models/EmpresaModel');
const Publicacion = require('../models/PublicacionModel');
const { validaToken } = require('../middlewares/autenticacion');


//============================================
// Ver publicaciones empresa TOKEN
//============================================

app.get('/publicacion/empresa', [validaToken], (req, res) => {

    let empresa = req.empresa;

    Publicacion.find({ empresa }).select('-empresa')
        .populate({
            path: 'producto',
            populate: { path: 'categoria' }
        })
        .exec((err, publicacionesDB) => {
            if (publicacionesDB.length <= 0) {
                return res.status(400).json({
                    ok: false,
                    message: `La empresa ${empresa.nombre} no registra publicaciones en la plataforma`
                });
            };
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error encontrando las publicaciones de la empresa',
                    err
                });
            };
            res.json({
                ok: true,
                message: `Publicaciones de la empresa ${empresa.nombre}`,
                publicaciones: publicacionesDB
            })
        })
});


//=====================================================
// Filtrar publicaciones empresa segun estado (TOKEN)
//=====================================================

app.get('/publicacion/empresa/estado/:estado', [validaToken], (req, res) => {

    let estado = req.params.estado;
    let empresa = req.empresa;
    let valida = verificarEstado(estado);
    if (!valida) {
        return res.status(500).json({
            ok: false,
            message: `Estado ingresado no es valido`
        });
    };

    Publicacion.find({ empresa, estadoPublicacion: estado })
        .populate({
            path: 'producto',
            populate: { path: 'categoria' }
        })
        .exec((err, publicacionesDB) => {
            if (publicacionesDB.length <= 0) {
                return res.status(400).json({
                    ok: false,
                    message: `La empresa ${empresa.nombre} no registra publicaciones en este estado ${estado}`
                });
            };
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error encontrando las publicaciones de la empresa',
                    err
                });
            };
            res.json({
                ok: true,
                message: `Publicaciones de la empresa ${empresa.nombre} en estado ${estado}`,
                publicaciones: publicacionesDB
            })
        });
});



//============================================
// Funciones
//============================================

function verificarEstado(estado, res) {
    let estadosPermitidos = ['Aprobada', 'Rechazada', 'En-evaluacion', 'Con-observacion', 'Inactiva'];
    if (estadosPermitidos.indexOf(estado) < 0) {
        return false;
    };
    return true;
};

module.exports = app;