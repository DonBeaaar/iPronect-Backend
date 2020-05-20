const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({

    nombre: { type: String, unique: true, required: [true, 'El nombre es requerido'] },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: [true, 'La categoria es requerida'] }
});

module.exports = mongoose.model('Producto', productoSchema);