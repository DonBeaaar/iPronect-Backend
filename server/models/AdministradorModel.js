const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let administradorSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'], unique: true },
    email: { type: String, required: [true, 'El email es requerido'], unique: true },
    password: { type: String, required: [true, 'La contraseña es requerida'] }
})

module.exports = mongoose.model('Administrador', administradorSchema);