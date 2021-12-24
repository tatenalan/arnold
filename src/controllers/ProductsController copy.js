const fs = require("fs")
const fileName = '../persistence/products.json'

class ProductsController {
    constructor() {
        this.products=[]
        this.lastId=0
        this.init()
    }

    init() {
        try {
            let productos = fs.readFileSync(this.fileName, 'utf-8')
            this.list = JSON.parse(productos)
            if (this.list.length > 0)
                this.id = this.list[this.list.length - 1].id + 1;
        }
        catch (e) {
            console.error(e)
            this.list = []
        }
    }

    getAll() {
        try {
            let products = fs.readFileSync(fileName, 'utf-8')
            return JSON.parse(products)
        }
        catch (error) {
            console.error(error)
            return { error: `No se pudo traer los products` }
        }
    }

    getById(id) {
        this.getAll().then(products => {
            if (products.length) {
                let product = products.find(product => product.id == id)
                if (product) {
                    console.log("Se encontro el product: ",product)
                    return product;
                }
                else {
                    console.log(`No existe el product con id: ${id}`)
                    return { error: `No existe el product con id: ${id}` }
                }
            }
            else {
                console.log(`El archivo está vacio`)
                return { error: `El archivo está vacio` }
            }
        }).catch(error => {
            console.log(error)
            return { error: `El archivo está vacio` }
        })
    }

    post(product) {
        this.getAll().then(products => {
            if (products) {
                if (products.length) {
                    product.id = products[products.length - 1].id + 1
                }
                else {
                    product.id = 1
                    products = []
                }
                product.price = +product.price
                products.push(product)
                try {
                    fs.writeFileSync(fileName, JSON.stringify(products, null, 2))
                    console.log("Se guardo el product con exito")
                    return {message: "Se guardo el product con exito"}
                } catch (error) {
                    console.error(error)
                    return { error: `No se pudo guardar el product` }
                }
            }
            else {
                console.error("No se pudo traer los products")
                return { error: `No se pudo traer los products` }
            }
        }).catch(error => {
            console.log(error)
            return { error: `El archivo está vacio` }
        })
    }

    async update(id, product) {
        if (product) {
            this.getAll().then(products => {
                let index = products.findIndex(product => product.id == id);
                if (index != -1) {
                    products[index] = product;
                    try {
                        fs.writeFileSync(fileName, JSON.stringify(products, null, 2))
                        console.log(`Se actualizo correctamente el producto con id: ${id}`)
                        return {message: `Se actualizo correctamente el producto con id: ${id}`}
                    } catch (error) {
                        console.error(error)
                        return { error: `No se pudo guardar el producto` }
                    }
                }
                else {
                    console.log(`No existe el product con id: ${id}`)
                    return {error: `No existe el product con id: ${id}`}
                }
            }).catch(error => {
                console.log(error)
                return { error: `El archivo está vacio` }
            })
        }
        else {
            console.log(`El archivo está vacio`)
            return {error: `El archivo está vacio`}
        }
    }

    async deleteById(id) {
        this.getAll().then(products => {
            if (products.length) {
                let index = products.findIndex(product => product.id == id);
                if (index != -1) {
                    products.splice(index, 1);
                    fs.writeFileSync(fileName, JSON.stringify(products, null, 2))
                    console.log(`Se borro correctamente el product con id: ${id}`)
                    return {message: `Se borro correctamente el product con id: ${id}`}
                }
                else {
                    console.log(`No existe el product con id: ${id}`)
                    return {error: `No existe el product con id: ${id}`}
                }
            }
            else {
                console.log(`El archivo está vacio`)
                return {error: `El archivo está vacio`}
            }
        }).catch(error => {
            console.log(error)
            return { error: `El archivo está vacio` }
        })
    }
    deleteAll() {
        let emptyProductArray = []
        try {
            fs.writeFileSync(fileName, JSON.stringify(emptyProductArray, null, 2))
            console.log("Se borraron todos los products correctamente")
        } catch (error) {
            console.error(error)
        }
    }
}
module.exports = ProductsController
