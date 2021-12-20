class Product {
    constructor(product) {
        this.id = product ? product.id : 1;
        this.timestamp = new Date().toLocaleTimeString();
        this.name = product ? product.name : "";
        this.description = product ? product.description : "",
        this.sku = product ? product.sku : "",
        this.photo = product ? product.photo : "",
        this.price = product ? product.price : 0,
        this.stock = product ? product.stock : 0;
    }
}

module.exports = Product
