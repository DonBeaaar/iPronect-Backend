const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let favoritoSchema = new Schema({

    publicacion: { type: Schema.Types.ObjectId, ref: 'Publicacion', required: true },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
    vendedor: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
    estado: { type: Boolean, default: true },

});

module.exports = mongoose.model('Favorito', favoritoSchema);