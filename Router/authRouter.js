///////////////////IMPORTS///////////////////////
const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const AuthController = require("../Controller/AuthController")
///////////////////IMPORTS///////////////////////

// Rota de registro!
router.post("/register", upload.none(), AuthController.register)

// Exportando módulo!
module.exports = router