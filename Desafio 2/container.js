const fs = require ('fs');

class Container{
    static id = 0;
    productos = [];

    constructor(fileName){
        this.fileName = fileName;
        if(fs.existsSync(this.fileName)){
            fs.readFile(this.fileName,(err,file) => {
                this.productos = JSON.parse(file);
                if(err){
                    console.log(err);
                };
            });
            this.id = this.productos.length;
            console.log(this.id);
        }
    };
        
    
    save(producto){
        Container.id++;
        producto.id = Container.id;
        this.productos.push(producto);
        fs.promises.writeFile(this.fileName, JSON.stringify(this.productos));
        return producto.id;
    }

    getAll(){
        return this.productos;
    }

    getById(id){
        return this.productos.find(producto => producto.id == id);
    }

    delete(id){
        let index = this.productos.findIndex(producto => producto.id == id);
        this.productos.splice(index,1);
        fs.promises.writeFile(this.fileName, JSON.stringify(this.productos,null,2));
    }
}

const gestor = new Container('productos.txt');

const main = async () => {
    const id1 = await gestor.save({ "title": "Regla", "price": 60.00 });
    const id2 = await gestor.save({ "title": "Goma", "price": 35.00 });
    const id3 = await gestor.save({ "title": "Lapicera", "price": 50.00 });

    console.log(id1,id2,id3);
    //1, 2, 3

    const todos = await gestor.getAll();

    todos.forEach(producto => {
        console.log(producto.title, producto.price);
    });
    

    const productoPorId = await gestor.getById(id1);

    console.log(productoPorId);

    await gestor.delete(id2);

    const todosActualizado = await gestor.getAll();

    console.log(todosActualizado);

    todosActualizado.forEach(producto => {
        console.log(producto.title, producto.price);
    });
}

main();