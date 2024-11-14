// Middleware para definir a política de acesso a recursos de origem cruzada!
const setCrossOriginResourcePolicy = (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "same-site")
    next()
}

// Exportando módulo!
module.exports = setCrossOriginResourcePolicy