const Product = require('../models/Product'); // Importar el modelo

describe('Modelo de Producto - Método calculateTotalPrice', () => {
    it('Debería calcular el precio total correctamente', () => {
        const product = new Product({
            nombre: 'Producto Prueba',
            descripcion: 'Descripción de prueba',
            precio: 100,
            stock: 10,
        });

        const totalPrice = product.calculateTotalPrice(5); // 5 unidades
        console.log("Total calculado: ", totalPrice);
        expect(totalPrice).toBe(500); // 100 * 5 = 500
    });

    it('Debería lanzar un error si la cantidad es 0 o negativa', () => {
        const product = new Product({
            nombre: 'Producto Prueba',
            descripcion: 'Descripción de prueba',
            precio: 100,
            stock: 10,
        });

        expect(() => product.calculateTotalPrice(0)).toThrow('La cantidad debe ser mayor a 0');
        expect(() => product.calculateTotalPrice(-1)).toThrow('La cantidad debe ser mayor a 0');
    });
});
