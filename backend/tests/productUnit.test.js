const Product = require('../models/Product');

describe('Modelo de Producto - Método hasSufficientStock', () => {
    it('Debería devolver true si el stock es suficiente', () => {
        const product = new Product({
            nombre: 'Producto Prueba',
            descripcion: 'Descripción del producto',
            precio: 100,
            stock: 10,
        });

        const result = product.hasSufficientStock(5); // Solicita 5 unidades
        expect(result).toBe(true); // El stock es suficiente
    });

    it('Debería devolver false si el stock no es suficiente', () => {
        const product = new Product({
            nombre: 'Producto Prueba',
            descripcion: 'Descripción del producto',
            precio: 100,
            stock: 10,
        });

        const result = product.hasSufficientStock(15); // Solicita 15 unidades
        expect(result).toBe(false); // El stock no es suficiente
    });

    it('Debería lanzar un error si la cantidad solicitada es 0 o negativa', () => {
        const product = new Product({
            nombre: 'Producto Prueba',
            descripcion: 'Descripción del producto',
            precio: 100,
            stock: 10,
        });

        expect(() => product.hasSufficientStock(0)).toThrow('La cantidad debe ser mayor a 0');
        expect(() => product.hasSufficientStock(-5)).toThrow('La cantidad debe ser mayor a 0');
    });
});
