const PermissionsException = require("../exceptions/PermissionsException");

function adminMiddleware(req, res, next) {
    if(req.headers.admin == true)
        next();
    else{
            res.status(401)
            res.json(new PermissionsException(-1, `Ruta ${req.originalUrl} método ${req.method} no autorizada.`))
        }
}

module.exports = adminMiddleware;