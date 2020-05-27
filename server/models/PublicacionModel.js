const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let unidadesPublicacion = { values: ['KG', 'Caja', 'Litro', 'Unidad'] };
let tiposVenta = { values: ['Reserva', 'Compra'] };
let estadosPublicacion = { values: ['Aprobada', 'Rechazada', 'En-evaluacion', 'Con-observacion'] }

let publicacionSchema = new Schema({

    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
    titulo: { type: String, required: true },
    precio: { type: String, required: true },
    descripcion: { type: String, required: true },
    producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    stock: { type: Number, required: true },
    despachoDomicilio: { type: Boolean },
    unidad: { type: String, enum: unidadesPublicacion, required: true },
    tipoVenta: { type: String, enum: tiposVenta, required: true },
    diasRetiro: { type: Number },
    direccionRetiro: { type: Array },
    imagenes: { type: Array },
    estadoPublicacion: { type: String, enum: estadosPublicacion, default: 'En-evaluacion' },
    estado: { type: Boolean, default: true }
});


module.exports = mongoose.model('Publicacion', publicacionSchema);