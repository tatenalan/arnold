const express = require('express');
const ProductsController  = require('./components/controllers/ProductController');
const CartController  = require('./components/controllers/CartController');
const Product = require('./components/models/Product');
const ServiceException = require("./components/exceptions/ServiceExcepction");
const PermissionsException = require("./components/exceptions/PermissionsException");
const { Router }  = express;

const app = express();
const PORT = process.env.PORT || 8080
const productRouter = Router();
const cartRouter = Router();
const isAdmin = false;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

function adminMiddleware(req, res, next) {
    if(isAdmin)
        next();
    else{
            res.status(401)
            res.json(new PermissionsException(-1, `Ruta /api/productos método "Crear un producto" no autorizada`))
        }
}
const server = app.listen(PORT, () => {
    console.log(`Servidor Corriendo en el puerto: ${server.address().port}`)
});

server.on('error', function (e) {
    console.log('Error al conectar con el servidor');  
    console.log(e);  
});

app.use((req, res) => {
    res.status(404);
    res.json(new ServiceException(-2, `Ruta ${req.url} no implementada`))
})  

//PRODUCTOS

productRouter.get('/:id?', (req, res) => {
    if(req.params.id)
        ProductsController.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    else
        ProductsController.getAll().then(products => {
            res.json(products)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})

productRouter.post('/', adminMiddleware, (req, res) => {
        ProductsController.post(new Product(req.body)).then(response => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })   
})

productRouter.put('/:id', adminMiddleware, (req, res) => {
        ProductsController.update(new Product(req.body)).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})

productRouter.delete('/:id', adminMiddleware, (req, res) => {
        ProductsController.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})
//PRODUCTOS
//CARRITO

cartRouter.get('/', adminMiddleware, (req, res) => {
    CartController.getAll().then(carts => {
        res.json(carts)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.get('/:id?', (req, res) => {
        CartController.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })      
})

cartRouter.post('/', (req, res) => {
    CartController.post().then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.delete('/:id', (req, res) => {
    CartController.deleteById(req.params.id).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.get('/:id/productos', (req, res) => {
    CartController.getProductsByIdCarrito(req.params.id).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.put('/:id/productos', (req, res) => {
    CartController.addProduct(req.params.id, req.body.id).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})

cartRouter.put('/:id/productos/:id_prod', (req, res) => {
    CartController.deleteProduct(req.params.id, req.params.id_prod).then((response) => {
        res.json(response)
    }).catch(err => {
        res.status(500)
        res.json(err)
    })
})
//CARRITO