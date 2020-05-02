const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tipoSolicitud = { values: ['Vendedor', 'Comprador'] };

let empresaSchema = new Schema({
    nombre: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    telefono: { type: String },
    direccion: { type: String, required: [true, 'La dirección es requerida'] },
    patente: { type: String },
    tipoEmpresa: { type: String, enum: tipoSolicitud },
    //Recibir pagos por la aplicacion ?
    recibePago: { type: Boolean, default: false },
    numeroCuenta: { type: String },
    tipoCuenta: { type: String },
    banco: { type: String },
    rut: { type: String },
    dv: { type: String }
});

module.exports = mongoose.model('Empresa', empresaSchema);