const express = require('express');
const app = express();
const Producto = require('../../models/ProductoModel');
const { validaAdministrador } = require('../../middlewares/administracion');

//============================================
// Crear producto
//============================================

app.post('/producto', [validaAdministrador], (req, res) => {

    let nombre = req.body.nombre;
    let categoria = req.body.categoria;

    if (!nombre || !categoria) {
        return res.status(500).json({
            ok: false,
            message: 'El nombre y la categoria del producto son requeridos'
        });
    };

    let producto = new Producto({
        nombre: nombre,
        categoria: categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error creando el producto',
                err
            });
        };
        res.json({
            ok: true,
            message: 'Producto creado exitosamente'
        });
    });
});



//============================================
//  Ver productos
//============================================

app.get('/producto', [], (req, res) => {

    Producto.find({ estado: true })
        .populate('categoria', 'nombre')
        .exec((err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error buscando los productos',
                    err
                });
            };
            if (productosDB.length <= 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'No hay productos registrados'
                });
            };
            res.json({
                ok: true,
                message: 'Lista de productos activos',
                productos: productosDB
            });
        })
});






//============================================
// Ver productos por categoria 
//============================================

app.get('/producto/:categoria', [], (req, res) => {

    let categoria = req.params.categoria;

    if (!categoria) {
        return res.status(500).json({
            ok: false,
            message: 'La categoria del producto es requerida'
        });
    };

    Producto.find({ categoria }).select('-categoria')
        .exec((err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error buscando los productos',
                    err
                });
            };
            if (productosDB.length <= 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'No hay productos registrados'
                });
            };
            res.json({
                ok: true,
                message: 'Lista de productos activos',
                productos: productosDB
            });
        })

});

module.exports = app;