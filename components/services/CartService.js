const fs = require("fs")
var path = require('path');
const ServiceException = require("../exceptions/ServiceException")
const Cart = require('../models/Cart');
var fileName = path.join(__dirname, '../persistence/carts.json');


class CartService {
    constructor() {
        this.carts = []
        this.lastId = 0
        this.init()
    }

    init() {
        let list = this.getAll()
        this.carts = JSON.parse(list)
        if (this.carts.length > 0) {
            this.lastId = this.carts[this.carts.length - 1].id + 1;
        }
    }

    getAll() {
        try {
            return fs.readFileSync(fileName, 'utf-8')
        }
        catch (e) {
            console.error(e)
            throw new ServiceException(500, "No se pudieron traer los carritos")
        }
    }

    getById(id) {
        if (this.carts.length) {
            let cart = this.carts.find(cart => cart.id == id)
            if (cart) {
                console.log("Se encontro el carrito con id: ", cart)
                return cart;
            }
            else {
                console.log(`No existe el carrito con id: ${id}`)
                throw new ServiceException(409, `No existe el carrito con id: ${id}`)
            }
        }
        else {
            console.log(`El archivo está vacio`)
            throw new ServiceException(409, `El archivo está vacio`)
        }
    }

    save() {
        let cart = new Cart()
        cart.id = this.lastId
        console.log(this.carts)
        this.carts.push(cart)
        console.log(this.carts)
        try {
            fs.writeFileSync(fileName, JSON.stringify(this.carts, null, 2))
            this.lastId++
            console.log("Se creo el carrito con exito")
            return { id: cart.id }
        } catch (error) {
            console.error(error)
            throw new ServiceException(500, "No se pudo crear el carrito")
        }
    }

    getProductsByIdCarrito(id) {
        if (this.carts.length) {
            try {
                let cart = this.getById(id)
                return cart.products;
            }
            catch (error) {
                throw error
            }
        }
        else {
            console.log(`El archivo está vacio`)
            throw new ServiceException(409, `El archivo está vacio`)
        }
    }

    addProduct(id, id_product) {
        let index = this.carts.findIndex(cart => cart.id == id);
        if (index != -1) {
            console.log(this.carts[index].products)
            try {
                this.carts[index].products.push(ProductService.getById(id_product));
                console.log(this.carts)
                try {
                    fs.writeFileSync(fileName, JSON.stringify(this.carts, null, 2))
                    console.log(`Se actualizo correctamente el carrito con id: ${id}`)
                    return { message: `Se actualizo correctamente el carrito con id: ${id}` }
                } catch (error) {
                    console.error(error)
                    throw new ServiceException(409, `No se pudo guardar el carrito`)
                }
            } catch (error) {
                console.error(error)
                throw error
            }
        }
        else {
            console.log(`No existe el carrito con id: ${id}`)
            throw new ServiceException(409, `No existe el carrito con id: ${id}`)
        }
    }

    deleteProduct(id, id_product) {
        if (this.carts.length) {
            let indexCart = this.carts.findIndex(cart => cart.id == id);
            if (indexCart != -1) {
                let indexProduct = this.carts[indexCart].products.findIndex(product => product.id == id_product);
                if (indexProduct != -1) {
                    try {
                        this.carts[indexCart].products.splice(indexProduct, 1);
                        fs.writeFileSync(fileName, JSON.stringify(this.carts, null, 2))
                        console.log(`Se elimino correctamente el producto con id: ${id} del carrito`)
                        return { message: `Se elimino correctamente el producto con id: ${id} del carrito` }
                    } catch (error) {
                        console.error(error)
                        throw new ServiceException(500, "No se pudo eliminar el producto")
                    }
                }
                else {
                    console.error(`No existe el producto con id: ${id_product} en el carrito ${id}`)
                    throw new ServiceException(500, `No existe el producto con id: ${id_product} en el carrito ${id}`)
                }
            }
            else {
                console.log(`No existe el carrito con id: ${id}`)
                throw new ServiceException(409, `No existe el carrito con id: ${id}`)
            }
        }
        else {
            console.log(`El archivo está vacio`)
            return { error: `El archivo está vacio` }
        }
    }

    deleteById(id) {
        if (this.carts.length) {
            let index = this.carts.findIndex(cart => cart.id == id);
            if (index != -1) {
                this.carts.splice(index, 1);
                try {
                fs.writeFileSync(fileName, JSON.stringify(this.carts, null, 2))
                console.log(`Se borro correctamente el carrito con id: ${id}`)
                return { message: `Se borro correctamente el carrito con id: ${id}` }
            } catch (error) {
                console.error(error)
                throw new ServiceException(500, "No se pudo eliminar el carrito")
            }
            }
            else {
                console.log(`No existe el carrito con id: ${id}`)
                throw new ServiceException(409, `No existe el carrito con id: ${id}`)
            }
        }
        else {
            console.log(`El archivo está vacio`)
            throw new ServiceException(409, `El archivo está vacio`)
        }
    }
}

module.exports = new CartService()