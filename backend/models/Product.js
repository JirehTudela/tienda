const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String },
}, { timestamps: true });

productSchema.methods.hasSufficientStock = function (cantidad) {
    if (cantidad <= 0) {
        throw new Error('La cantidad debe ser mayor a 0');
    }
    return this.stock >= cantidad;
};


module.exports = mongoose.model('Product', productSchema);