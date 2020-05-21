const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({

    nombre: { type: String, unique: true, required: true },
    estado: { type: Boolean, default: true }
});

module.exports = mongoose.model('Categoria', categoriaSchema);