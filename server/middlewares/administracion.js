const jwt = require('jsonwebtoken');

let validaAdministrador = (req, res, next) => {

    let token = req.get('tokenAdministrador');
    if (!token) {
        return res.status(400).json({
            ok: false,
            message: 'El token es requerido'
        });
    };

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'No estas autorizado, solo administradores del sistema'
            });
        };
        //console.log(decoded.administrador);
        req.administrador = decoded.administrador;
        next();
    });

};

module.exports = { validaAdministrador }