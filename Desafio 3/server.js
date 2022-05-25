const Container = require('../Desafio 2/container.js');
const express = require('express');
const app = express();
const PORT = 8080;
const productos = new Container('productos.txt');

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
    console.log(err);
});

app.get('/productos', (request, response) => {
    response.send(productos.getAll());
});

app.get('/productoRandom', (request, response) => {
    const producto = productos.getById(Math.floor(Math.random() * productos.getAll().length));
    response.send(producto);
});