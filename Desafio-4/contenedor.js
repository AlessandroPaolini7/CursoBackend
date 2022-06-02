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
            const productoABorrar = arregloParseado.find(
                (producto) => producto.id === id
            );

            if (productoABorrar) {
                const index = arregloParseado.indexOf(productoABorrar);
                arregloParseado.splice(index, 1);
                await fs.promises.writeFile(this._filename, JSON.stringify(arregloParseado));
                return true;
            } else {
                console.log(`El id no existe en el archivo`);
                return null;
            }
        } catch (error) {
        console.log(error);
        }
    }

    async updateById(id, newData) {
    try {
        id = Number(id);
        const arreglo = await this.getData();
        const arregloParseado = JSON.parse(arreglo);
        const productoAActualizar = arregloParseado.find(
            (producto) => producto.id === id
        );
        if (productoAActualizar) {
            const index = arregloParseado.indexOf(productoAActualizar);
            const {title, price} = newData;
            arregloParseado[index]['title'] = title;
            arregloParseado[index]['price'] = price;
            await fs.promises.writeFile(this._filename, JSON.stringify(arregloParseado));
            return true;
        } else {
            console.log(`El id no existe en el archivo`);
            return null;
        }

    } catch (error) {
        console.log(error)
    }
}

    async save(producto) {
        try {
            producto.id = 0;
            const arreglo = await this.getData();
            const arregloParseado = JSON.parse(arreglo);
            producto.id = arregloParseado.length + 1;
            arregloParseado.push(producto);
            await fs.promises.writeFile(this._filename, JSON.stringify(arregloParseado));
            return producto.id;
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
