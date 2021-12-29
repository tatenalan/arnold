# Arnold

**TECNOLOGIAS**

    *Las tecnoligas usadas son Node Js., Express, Router.
    *Me base en la estructuracion de un framework MVC.
    *Hay un archivo .json que guarda los productos y otro los carritos.

**ENDPOINTS**

**PRODUCTOS**

    **GET**
    (Trae todos los productos)
    http://localhost:8080/api/productos/

*******************************************

    **GET**
    (Trae un producto especifico por id)
    http://localhost:8080/api/productos/:idProducto
    http://localhost:8080/api/productos/3

*******************************************

    **PUT**
    (Necesita ser ADMIN)
    Headers:
        Key: admin
        Value: 1
    (Actualiza un producto por id)
    http://localhost:8080/api/productos/:idProducto
    http://localhost:8080/api/productos/1

    body: {
            "id": 3,
            "name": "Camisas",
            "price": 320000,
            "description": "Camisa formal con 7 botones",
            "sku": "CA-1212   ",
            "stock": 10,
            "image":"camisa.png"
        } 

*******************************************

    **POST**
    (Necesita ser ADMIN)
    Headers:
        Key: admin
        Value: 1
    (Inserta un Nuvo producto)
    http://localhost:8080/api/productos/

    body: {
            "name": "PEREz",
            "price": 320000,
            "description": "Camisa formal con 8 botones",
            "sku": "CA-1212   ",
            "stock": 10,
            "image":"camisa.png",
            "domicilio": "marta"
        } 

*******************************************

    **DELETE**
    (Necesita ser ADMIN)
    Headers:
        Key: admin
        Value: 1
    (Elimina un producto especifico por idProducto)
    http://localhost:8080/api/productos/:idProducto
    http://localhost:8080/api/productos/7


**CARRITO**

    **GET**
    (Necesita ser ADMIN)
    Headers:
        Key: admin
        Value: 1
    (Trae todos los carritos si sos admin)
    http://localhost:8080/api/carrito

*******************************************

    **GET**
    (Trae un carrito especifico por id)
    http://localhost:8080/api/carrito/:idCarrito

*******************************************

    **PUT**
    (Agrega el producto con el id del body en el carrito)
    http://localhost:8080/api/carrito/:idCarrito/productos
    http://localhost:8080/api/carrito/1/productos
    
    body: {
            "id": 1
        }   

*******************************************
  
    **PUT**
    (Elimina el producto del carrito con sus ids)
    http://localhost:8080/api/carrito/:idCarrito/productos/:idProducto
    http://localhost:8080/api/carrito/1/productos/1

*******************************************

    **POST**
    (Crea un carrito nuevo vacio y devuelve el id del carrito creado)
    http://localhost:8080/api/carrito

*******************************************

    **DELETE**
    (Elimina un carrito por id)
    http://localhost:8080/api/carrito/:idCarrito
    http://localhost:8080/api/carrito
