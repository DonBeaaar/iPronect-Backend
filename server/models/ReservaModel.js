const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reservaSchema = new Schema({
    publicacion: { type: Schema.Types.ObjectId, ref: 'Publicacion', required: true },
    vendedor: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
    comprador: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: String, required: true },
    despacho: { type: Boolean},
    preciodespacho: { type: Number},
    preciofinal: {type: Number, required: true}

});

module.exports = mongoose.model('Reserva', reservaSchema)