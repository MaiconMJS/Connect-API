///////////////////IMPORTS///////////////////////
const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const AuthController = require("../Controller/AuthController")
///////////////////IMPORTS///////////////////////

///////////////////ROTAS///////////////////////
// REGISTRAR CLIENTE!
router.post("/register", upload.none(), AuthController.register)
///////////////////ROTAS///////////////////////

// Exportando módulo!
module.exports = router