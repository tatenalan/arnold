const ProductService = require('../services/ProductService');


class ProductController {

    async getAll() {
        return ProductService.products
    }

    async getById(id) {
        return ProductService.getById(id)
    }

    async post(product) {
        return ProductService.save(product)
    }

    async update(product) {
        return ProductService.update(product)
    }

    async deleteById(id) {
        return ProductService.deleteById(id)
    }

}
module.exports = new ProductController()
