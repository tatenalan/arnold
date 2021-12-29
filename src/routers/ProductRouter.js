const express = require("express");
const adminMiddleware = require("../middleware/AdminMiddleware")
const productsController = require("../controllers/ProductController");
const productRouter = express.Router();
const Product = require('../models/Product');

productRouter.get('/:id?', (req, res) => {
    if(req.params.id)
        productsController.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    else
        productsController.getAll().then(products => {
            res.json(products)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})

productRouter.post('/', adminMiddleware, (req, res) => {
        productsController.post(new Product(req.body)).then(response => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })   
})

productRouter.put('/:id', adminMiddleware, (req, res) => {
        productsController.update(new Product(req.body)).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})

productRouter.delete('/:id', adminMiddleware, (req, res) => {
        productsController.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})

module.exports = productRouter;