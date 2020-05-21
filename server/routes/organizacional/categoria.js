const express = require('express');
const app = express();
const { validaAdministrador } = require('../../middlewares/administracion');
const Categoria = require('../../models/CategoriaModel');

//============================================
// Crear categoria
//============================================

app.post('/categoria', [validaAdministrador], (req, res) => {

    let nombre = req.body.nombre;

    if (!nombre) {
        return res.status(500).json({
            ok: false,
            message: 'El nombre de la categoria es requerido'
        });
    };
    /* nombre: nombre
    modelo: lo que viene  */
    let categoria = new Categoria({
        nombre: nombre
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error creando la categoria',
                err
            });
        };
        res.json({
            ok: true,
            message: 'Categoria creada exitosamente'
        });

    });


});



module.exports = app;