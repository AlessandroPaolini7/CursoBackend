const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.arr = [];
    }

    async generateId() {
        try {
            this.arr = await this.getAll() || [];
            let maxId = this.arr.length;
            this.arr.forEach(producto => {
                producto.id > maxId ? maxId = producto.id : maxId
            })
            return maxId++;
        } catch (err) {
            console.log(err);
        }
    }


    async save(producto) {
        try {
            const readFile = await this.getAll();
            if (!readFile) {
                producto.id = await this.generateId();
                this.arr.push(producto);
                fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
                return producto.id;
            }
            this.arr = readFile;
            producto.id = await this.generateId();
            this.arr.push(producto);
            fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
            return producto.id;
        } catch (err) {
            console.log(err);
        }
    }


    async getById(id) {
        try {
            this.arr = await this.getAll();
            const prod = this.arr.find(producto => producto.id === Number(id));
            return prod ? prod : null;
        } catch (err) {
            console.log(err);
        }
    }


    async getAll() {
        try {
            const arr = await fs.promises.readFile(this.fileName, 'utf-8');
            //Acá hago el parseo del JSON, y no en el constructor porque sino no funciona.
            const arregloParseado = JSON.parse(arr);
            return arregloParseado;
        } catch (err) {
            console.log(err);
        }
    }


    async deleteById(id) {
        try {
            this.arr = await this.getAll();
            this.arr = this.arr.filter(producto => producto.id != id);
            fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
        } catch (err) {
            console.log(err);
        }
    }


    async deleteAll() {
        try {
            this.arr = await this.getAll();
            this.arr = [];
            fs.promises.writeFile(this.fileName, JSON.stringify(this.arr, null, 2));
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = Contenedor;
