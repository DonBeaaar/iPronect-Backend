const express = require('express');
const app = express();
const Favorito = require('../models/FavoritoModel');
const Publicacion = require('../models/PublicacionModel');
const Empresa = require('../models/EmpresaModel');
const { validaToken } = require('../middlewares/autenticacion');
const { validaPublicacion } = require('../middlewares/validacion/publicacion');
const publicacion = require('../middlewares/validacion/publicacion');

//============================================
// guardar publicacion como favorito
//============================================
app.post('/favorito', [validaToken, validaPublicacion], (req, res) => {

    let empresa = req.empresa;
    let publicacion = req.publicacion;
    let estado = req.body.estado;
    let vendedor = publicacion.empresa;
    
    let favorito = new Favorito({
        publicacion,
        empresa,
        estado,
        vendedor
    });
    
    favorito.save((err, favoritoDB) => {
        publicacion.save((err, publicacionDB) => {
            res.json({
                ok: true,
                message: `Publicacion guardada`,
                favoritoDB
            });
        });
    });
  
});

//============================================
// Mostrar publicacion como favorito
//============================================

app.get('/favorito/:empresa', [validaToken], (req, res) => {

    let empresa = req.empresa;
    if (!empresa) {
        return res.status(400).json({
            ok: 'false',
            message: 'La empresa es requerido'
        });
    };
    Empresa.findById(empresa, (err, empresaDB) => {
        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                message: 'La empresa que estas intentando buscar no existe'
            })
        };    
        Favorito.find({empresa})
        .populate('publicacion')
        .populate('vendedor')
            .exec((err, favoritoDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error mostrando favoritos'
                    });
                };
                if (favoritoDB.length <= 0) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No se encuentran favoritos asociados a esta empresa'
                    })
                };
    
                res.json({
                    ok: true,
                    message: `Favoritos asociadas a la empresa ${empresaDB.nombre}`,
                    favoritos: favoritoDB,                 
                });
            });
    });
});

module.exports = app;