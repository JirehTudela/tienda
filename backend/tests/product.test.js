require('dotenv').config({ path: '.env' }); // Carga el archivo .env.test
const { app, server } = require('../server.test'); // Importar tu servidor Express
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { expect } = require('@jest/globals'); // Para usar las expectativas de Jest

// Generar un token JWT de prueba
const tokenDePrueba = jwt.sign(
    { id: '675926cc051aa573bc50503c', role: 'administrador' }, // Payload
    process.env.JWT_SECRET, // Clave secreta
    { expiresIn: '1h' } // Duración del token
);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI);
});

describe('API de Productos', () => {
    let productoId; // Guardará el ID del producto creado para pruebas

    

    it('Debería crear un nuevo producto', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                nombre: 'Producto Prueba',
                descripcion: 'Descripción de prueba',
                precio: 100,
                stock: 10,
            })
            .set('Authorization', `Bearer ${tokenDePrueba}`);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.nombre).toBe('Producto Prueba');
        productoId = response.body._id; // Guardar ID del producto para las siguientes pruebas
    });

    it('Debería obtener todos los productos', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Debería obtener un producto por ID', async () => {
        const response = await request(app).get(`/api/products/${productoId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(productoId);
        expect(response.body.nombre).toBe('Producto Prueba');
    });

    it('Debería actualizar un producto', async () => {
        const response = await request(app)
            .put(`/api/products/${productoId}`)
            .send({
                nombre: 'Producto Actualizado',
                descripcion: 'Descripción actualizada',
                precio: 150,
                stock: 5,
            })
            .set('Authorization', `Bearer ${tokenDePrueba}`);

        expect(response.status).toBe(200);
        expect(response.body.nombre).toBe('Producto Actualizado');
        expect(response.body.precio).toBe(150);
    });
});

afterAll(async () => {
    // Limpiar la base de datos y cerrar conexiones
    await mongoose.connection.dropDatabase(); // Elimina datos de prueba
    await mongoose.connection.close();
    server.close();
});