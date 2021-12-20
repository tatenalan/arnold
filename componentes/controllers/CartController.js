const CartService = require('../services/CartService');

class CartController {

    async getAll() {
        return CartService.carts
    }

    async getById(id) {
        return CartService.getById(id)
    }

    async post() {
        return CartService.save()
    }

    async getProductsByIdCarrito(id) {
        return CartService.getProductsByIdCarrito(id)
    }

    async addProduct(id, id_product) {
        return CartService.addProduct(id, id_product)
    }

    async deleteProduct(id, id_product) {
        return CartService.deleteProduct(id, id_product)
    }

    async deleteById(id) {
        return CartService.deleteById(id)
    }
}
module.exports = new CartController()
