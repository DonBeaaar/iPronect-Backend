const Publicacion = require('../../models/PublicacionModel');

let validaPublicacion = (req, res, next) => {

    let publicacion = req.body.publicacion;
    let cantidad = req.body.cantidad;

    Publicacion.findById(publicacion, ((err, publicacionDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: `La publicacion ingresada no es valida`
            });
        };
        if (!publicacionDB) {
            return res.status(400).json({
                ok: false,
                message: `No se encuentra la publicacion solicitada`
            });
        };

        /* if (empresa._id.toString() == publicacionDB.empresa.toString()) {
            return res.status(400).json({
                ok: false,
                message: `No te puedes reservar a ti mismo`
            });
        } */

        if (publicacionDB.stock < cantidad) {
            return res.status(400).json({
                ok: false,
                message: `La cantidad de reserva no puede ser mayor al stock del producto`
            });
        };

        req.publicacion = publicacionDB;
        next();
    }));

};

module.exports = { validaPublicacion }