const express = require('express');
const ServiceException = require("./src/exceptions/ServiceException");
const productRouter = require('./src/routers/ProductRouter');
const cartRouter = require('./src/routers/CartRouter');

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
const server = app.listen(PORT, () => {
    console.log(`Servidor Corriendo en el puerto: ${server.address().port}`)
});

server.on('error', function (e) {
    console.log('Error al conectar con el servidor');  
    console.log(e);  
});

app.use((req, res) => {
    res.status(404);
    res.json(new ServiceException(-2, `Ruta ${req.originalUrl} método ${req.method} no implementada.`))
})   
