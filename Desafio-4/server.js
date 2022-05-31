const express = require('express');
const app = express();
const PORT = 8080;
const Container = require('./contenedor.js');
const container = new Container('productos.txt');

app.use(express.static('public'));

const router = express.Router();

app.use('/api/productos', router);

//GET/api/productos
router.get('/', async (req, res) => {
    const todos = await container.getAll();
    if (todos) {
        res.send(todos);
    } else {
        res.status(500).send('No se encontraron productos');
    }
});

//GET/api/productos/:id
router.get('/:id', async (req, res) => {
    const productoCualq = await container.getById(req.params.id);
    if (productoCualq) {
        res.send(productoCualq);
    } else {
        res.status(500).send('No se encontró el producto');
    }
});

//POST /api/productos
router.post('/', async (req,res) => {
    const {body} = req;
    const newProductId = await container.save(body);
    res.status(200).send(`Producto agregado con el ID: ${newProductId}`);
});

//PUT /api/productos/:id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const actualiza = await container.updateById(id,body);
    if(actualiza){
        res.status(200).send(`El producto con ID: ${id} fue actualizado`);
    }else{
        res.status(404).send(`El producto no fue actualizado porque no se encontró el ID: ${id}`);
    }
})

//DELETE /api/productos/:id
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const borra = await container.deleteById(id);
    if(borra){
        res.status(200).send(`El producto con ID: ${id} fue borrado`);
    }else{
        res.status(404).send(`El producto no fue borrado porque no se encontró el ID: ${id}`);
    }
})

const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));