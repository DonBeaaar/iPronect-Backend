const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let comentarioSchema = new Schema({

    comentario: { type: String, required: true },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
    publicacion: { type: Schema.Types.ObjectId, ref: 'Publicacion', required: true }



});

module.exports = mongoose.model('Comentario', comentarioSchema);