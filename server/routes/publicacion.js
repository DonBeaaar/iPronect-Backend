const express = require('express');
const app = express();
const Publicacion = require('../models/PublicacionModel');
const Producto = require('../models/ProductoModel');
const { validaToken } = require('../middlewares/autenticacion');

//===========================================
// Creacion de publicacion
//===========================================

app.post('/publicacion', [validaToken], (req, res) => {

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
            return res.status(500).json({
                ok: false,
                message: 'Error registrando la publicacion',
                err
            });
        };

        res.json({
            ok: true,
            message: 'Publicacion registrada exitosamente'
        });
    });

});


//============================================
// Ver publicaciones activas
//============================================

app.get('/publicacion', [validaToken], (req, res) => {

    Publicacion.find({ estadoPublicacion: 'Aprobada' }).select('-estadoPublicacion')
        .exec((err, publicacionesDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error mostrando las publicaciones'
                });
            };
            Publicacion.countDocuments({ estadoPublicacion: 'Aprobada' }, (err, cantidad) => {
                if (cantidad <= 0) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No hay publicaciones registradas'
                    });
                };
                res.json({
                    ok: true,
                    message: 'Lista de publicaciones',
                    cantidad,
                    publicaciones: publicacionesDB
                });
            });
        });
});


//============================================
// Ver publicaciones por producto
//============================================

app.get('/publicacion/producto/:producto', [validaToken], (req, res) => {

    let producto = req.params.producto;
    if (!producto) {
        return res.status(400).json({
            ok: 'false',
            message: 'El producto es requerido'
        });
    };
    Producto.findById(producto, (err, productoDB) => {
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: 'El producto que estas intentando buscar no existe'
            })
        };

        Publicacion.find({ producto }).select('-producto')
            .populate('empresa')
            .exec((err, publicacionesDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error mostrando las publicaciones'
                    });
                };
                if (publicacionesDB.length <= 0) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No se encuentran publicaciones asociadas a este producto'
                    })
                };

                res.json({
                    ok: true,
                    message: `Publicaciones del producto ${productoDB.nombre}`,
                    publicaciones: publicacionesDB
                });

            });
    });
});


//============================================
// Ver publicaciones por categoria
//============================================

app.get('/publicacion/categoria/:categoria', [validaToken], (req, res) => {

    let categoria = req.params.categoria;
    if (!categoria) {
        return res.status(400).json({
            ok: 'false',
            message: 'La categoria es requerido'
        });
    };

    Producto.find({ categoria })
        .exec((err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error encontrando los productos ',
                    err
                });
            };
            if (productosDB.length <= 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'No se encuentran publicaciones asociados a esta categoria'
                })
            };

            Publicacion.find({ producto: productosDB })
                .populate({
                    path: 'producto',
                    populate: { path: 'categoria' }
                })
                .exec((err, publicacionesDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Error mostrando las publicaciones'
                        });
                    };
                    if (publicacionesDB.length <= 0) {
                        return res.status(400).json({
                            ok: false,
                            message: 'No se encuentran publicaciones asociadas a esta producto'
                        })
                    };

                    res.json({
                        ok: true,
                        message: 'Publicaciones asociadas a la categoria',
                        publicaciones: publicacionesDB
                    });
                })


        });

});

//============================================
// Ver Detalled de publicacion
//============================================

    
app.get('/publicacion/:publicacion', [validaToken], (req, res) => {


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
            message: 'La publicacion que selecciono ya no se encuentra disponible'
        })
    };

            res.json({
                ok: true,
                message: `Detalle de publicacion ${PublicacionDB.titulo}`,
                publicacion: PublicacionDB,
                
            });

        });
});

//============================================
// Ver perfil de empresa con sus productos
//============================================


app.get('/publicaciones/:empresa', [validaToken], (req, res) => {


    let empresa = req.params.empresa;
    if (!empresa) {
        return res.status(400).json({
            ok: 'false',
            message: 'La empresa es requerida'
        });
    };
    Empresa.findById(empresa, (err, empresaDB) => {
        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                message: 'La empresa que estas intentando buscar no existe'
            })
        };
    
        Publicacion.find({empresa})
            .exec((err, publicacionesDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error mostrando las pubicaciones'
                    });
                };
                if (publicacionesDB.length <= 0) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No se encuentran publicaciones asocadas a esa empresa'
                    })
                };
    
                res.json({
                    ok: true,
                    message: `Publicaciones asociadas a la empresa ${empresaDB.nombre}`,
                    pulicaciones: publicacionesDB,
                    
                });
    
            });
    });
    });




module.exports = app;