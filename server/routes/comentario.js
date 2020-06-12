const express = require('express');
const app = express();
const Publicacion = require('../models/PublicacionModel');
const Comentario = require('../models/ComentarioModel');
const { validaToken } = require('../middlewares/autenticacion');


//============================================
// Crear comentario
//============================================

app.post('/comentario', [validaToken], (req, res) => {

    let body = req.body;

    let comentario = new Comentario({
        empresa: req.empresa,
        publicacion: body.publicacion,
        comentario: body.comentario
    });

    comentario.save((err, comentarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al crear comentario',
                err
            });
        };

        res.json({
            ok: true,
            message: 'Comentario publicado'
        });
    });

});


//============================================
// Ver comentarios por publicacion
//============================================


app.get('/comentario/publicacion/:publicacion', [validaToken], (req, res) => {


let publicacion = req.params.publicacion;
if (!publicacion) {
    return res.status(400).json({
        ok: 'false',
        message: 'La publicacion es requerido'
    });
};
Publicacion.findById(publicacion, (err, PublicacionDB) => {
    if (!PublicacionDB) {
        return res.status(400).json({
            ok: false,
            message: 'La publicacion que estas intentando buscar no existe'
        })
    };

    Comentario.find({publicacion})
        .populate('empresa' , 'nombre')
        .exec((err, comentariosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error mostrando las comentarios'
                });
            };
            if (comentariosDB.length <= 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'No se encuentran comentarios asociados a esta publicacion'
                })
            };

            res.json({
                ok: true,
                message: `Comentarios de la publicacion ${PublicacionDB.titulo}`,
                comentarios: comentariosDB,
                
            });

        });
});
});

module.exports = app;