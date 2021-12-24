const fs = require("fs")
var path = require('path');
const ServiceException = require("../exceptions/ServiceException")
var fileName = path.join(__dirname, '../persistence/products.json');


class ProductService {
    constructor() {
        this.products = []
        this.lastId = 0
        this.init()
    }

    init() {
        let list = this.getAll()
        this.products = JSON.parse(list)
        if (this.products.length > 0) {
            this.lastId = this.products[this.products.length - 1].id + 1;
        }
    }

    getAll() {
        try {
            return fs.readFileSync(fileName, 'utf-8')
        }
        catch (e) {
            console.error(e)
            throw new ServiceException(500, "No se pudieron traer los productos")
        }
    }

    getById(id) {
        if (this.products.length) {
            let product = this.products.find(product => product.id == id)
            if (product) {
                console.log("Se encontro el producto: ", product)
                return product;
            }
            else {
                console.log(`No existe el producto con id: ${id}`)
                throw new ServiceException(409, `No existe el producto con id: ${id}`)
            }
        }
        else {
            console.log(`El archivo está vacio`)
            throw new ServiceException(409, `El archivo está vacio`)
        }
    }

    save(product) {
        product.id = this.lastId
        this.price = +this.price
        this.products.push(product)
        try {
            fs.writeFileSync(fileName, JSON.stringify(this.products, null, 2))
            this.lastId++
            console.log("Se guardo el producto con exito")
            return { message: "Se guardo el producto con exito" }
        } catch (error) {
            console.error(error)
            throw new ServiceException(500, "No se pudo guardar el producto")
        }
    }

    update(updateProduct) {
        let index = this.products.findIndex(product => product.id == updateProduct.id);
        if (index != -1) {
            this.products[index] = updateProduct;
            try {
                fs.writeFileSync(fileName, JSON.stringify(this.products, null, 2))
                console.log(`Se actualizo correctamente el producto con id: ${updateProduct.id}`)
                return { message: `Se actualizo correctamente el producto con id: ${updateProduct.id}` }
            } catch (error) {
                console.error(error)
                throw new ServiceException(500, "No se pudo actualizar el producto")
            }
        }
        else {
            console.log(`No existe el product con id: ${updateProduct.id}`)
            throw new ServiceException(500, `No existe el product con id: ${updateProduct.id}`)
        }
    }

    deleteById(id) {
        if (this.products.length) {
            let index = this.products.findIndex(product => product.id == id);
            if (index != -1) {
                this.products.splice(index, 1);
                try {
                    fs.writeFileSync(fileName, JSON.stringify(this.products, null, 2))
                    console.log(`Se borro correctamente el product con id: ${id}`)
                    return { message: `Se borro correctamente el product con id: ${id}` }
                } catch (error) {
                    console.error(error)
                    throw new ServiceException(500, "No se pudo eliminar el producto")
                }
            }
            else {
                console.error(`No existe el product con id: ${id}`)
                throw new ServiceException(409, `No existe el product con id: ${id}`)
            }
        }
        else {
            console.log(`El archivo está vacio`)
            throw new ServiceException(409, `El archivo está vacio`)
        }
    }
    deleteAll() {

    }
}
module.exports = new ProductService()