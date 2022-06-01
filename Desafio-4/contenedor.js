const fs = require("fs");

class Contenedor {
    constructor(fileName) {
        this._filename = fileName;
    }



    async getById(id) {
    id = Number(id);
    try {
    const arreglo = await this.getData();
    const arregloParseado = JSON.parse(arreglo);

    return arregloParseado.find((producto) => producto.id === id);
    } catch (error) {
        console.log(error);
    }
}

    async deleteById(id) {
        try {
            id = Number(id);
            const arreglo = await this.getData();
            const arregloParseado = JSON.parse(arreglo);
            const objectIdToBeRemoved = arregloParseado.find(
                (producto) => producto.id === id
            );

            if (objectIdToBeRemoved) {
                const index = arregloParseado.indexOf(objectIdToBeRemoved);
                arregloParseado.splice(index, 1);
                await fs.promises.writeFile(this._filename, JSON.stringify(arregloParseado));
                return true;
            } else {
                console.log(`ID ${id} does not exist in the file`);
                return null;
            }
        } catch (error) {
        console.log(
            `Error Code: ${error.code} | There was an error when trying to delete an element by its ID (${id})`
        );
        }
    }

    async updateById(id, newData) {
    try {
        id = Number(id);
        const arreglo = await this.getData();
        const arregloParseado = JSON.parse(arreglo);
        const objectIdToBeUpdated = arregloParseado.find(
            (producto) => producto.id === id
        );
        if (objectIdToBeUpdated) {
            const index = arregloParseado.indexOf(objectIdToBeUpdated);
            const {title, price, thumbnail} = newData;

            arregloParseado[index]['title'] = title;
            arregloParseado[index]['price'] = price;
            arregloParseado[index]['thumbnail'] = thumbnail;
            await fs.promises.writeFile(this._filename, JSON.stringify(arregloParseado));
            return true;
        } else {
            console.log(`ID ${id} does not exist in the file`);
            return null;
        }

    } catch (error) {
        console.log(error)
    }
}

    async save(object) {
        try {
            const arreglo = await this.getData();
            const arregloParseado = JSON.parse(arreglo);

            object.id = arregloParseado.length + 1;
            arregloParseado.push(object);

            await fs.promises.writeFile(this._filename, JSON.stringify(arregloParseado));
            return object.id;
        } catch (error) {
        console.log(error);
        }
    }

    async deleteAll() {
        try {
            await this._createEmptyFile();
        } catch (error) {
            console.log(error);
        }
    }

    async getData() {
        const arreglo = await fs.promises.readFile(this._filename, "utf-8");
        return arreglo;
    }

    async getAll() {
        const arreglo = await this.getData();
        return JSON.parse(arreglo);
    }
}
module.exports = Contenedor;
