const jwt = require('jsonwebtoken');
const Empresa = require('../models/EmpresaModel');

// ====================================
// Validar token
// ====================================

let validaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, 'semilla-desarrollo-ipronect', (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Token no valido'
            });
        };
        req.empresa = decoded.empresa;
        next();
    });
};


/**
// ====================================
// Validar token
// ====================================
let validaToken = (req, res, next) => {

    let token = req.get('token');
    //console.log(token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        //console.log(decoded.usuario);

        req.usuario = decoded.usuario;
        //console.log(req.usuario.empresa);
        //console.log(req.usuario);
        next();

    });

} */

module.exports = { validaToken };