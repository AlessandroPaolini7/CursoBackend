const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.arr = [];
    }

    async getData() {
        const data = await fs.promises.readFile(this._filename, "utf-8");
        return data;
    }


    async save(producto) {
        try {
            const arregloProd = await this.getData();
            const arregloParseado = JSON.parse(arregloProd);
            producto.id = arregloParseado.length + 1;
            arregloParseado.push(producto);
            await fs.promises.writeFile(this._filename, JSON.stringify(arregloParseado));
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

    async updateById(id, newData) {
        try {
            id = Number(id);
            const data = await this.getData();
            const parsedData = JSON.parse(data);
            const objectIdToBeUpdated = parsedData.find(
            (producto) => producto.id === id
        );
        if (objectIdToBeUpdated) {
            const index = parsedData.indexOf(objectIdToBeUpdated);
            const {title, price} = newData;
            parsedData[index]['title'] = title;
            parsedData[index]['price'] = price;
            await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
            return true;
            } else {
            console.log(`ID ${id} does not exist in the file`);
            return null;
        }
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = Contenedor;
