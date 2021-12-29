const express = require("express");
const adminMiddleware = require("../middleware/AdminMiddleware")
const cartController = require("../controllers/CartController");
const cartRouter = express.Router();

cartRouter.get('/', adminMiddleware, (req, res) => {
    cartController.getAll().then(carts => {
        res.json(carts)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.get('/:id?', (req, res) => {
        cartController.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })      
})

cartRouter.post('/', (req, res) => {
    cartController.post().then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.delete('/:id', (req, res) => {
    cartController.deleteById(req.params.id).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.get('/:id/productos', (req, res) => {
    cartController.getProductsByIdCarrito(req.params.id).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.put('/:id/productos', (req, res) => {
    cartController.addProduct(req.params.id, req.body.id).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.put('/:id/productos/:id_prod', (req, res) => {
    cartController.deleteProduct(req.params.id, req.params.id_prod).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

module.exports = cartRouter;