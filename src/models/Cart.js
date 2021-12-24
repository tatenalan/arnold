class Cart {
    constructor() {
        this.id = 1;
        this.timestamp = new Date().toLocaleTimeString();
        this.products = [];
    }
}
module.exports = Cart
        