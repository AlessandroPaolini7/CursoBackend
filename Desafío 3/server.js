const Contenedor = require('./contenedor.js');
const express = require('express');

const PORT = 8080;
const app = express();
const server = app.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));
const productos = new Contenedor('productos.txt');

app.get('/', async (req, res) => {
    await res.send('Cambia la ruta por /productos o /productoRandom');
});


app.get('/productos', async (req, res) => {
    const todos = await productos.getAll();
    if (todos) { 
        res.send(todos);
    } else {
        res.status(500).send('No se encontraron productos');
    }
});

app.get('/productoRandom', async (req, res) => {
    const productoCualq = await productos.getById(Math.floor(Math.random() * productos.getAll().length));;
    if(productoCualq){
        res.send(productoCualq);
    }else {
        res.status(500).send('No se encontraron productos');
    }
})

