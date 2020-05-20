const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let observacionModel = new Schema({
    observador: { type: Schema.Types.ObjectId, ref: 'Administrador', required: true },
    publicacion: { type: Schema.Types.ObjectId, ref: 'Publicacion', required: true },
    observacion: { type: String, required: true }
});

module.exports = mongoose.model('Observacion', observacionModel);