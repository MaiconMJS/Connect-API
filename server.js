///////////////////IMPORTS///////////////////////
require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const SocketController = require("./SocketController/SocketController")
const setCrossOriginResourcePolicy = require("./MiddleWare/crossOriginResourcePolicy")
const PORT = process.env.PORT
const http = require("http").createServer(app)
const authRouter = require("./Router/authRouter")
///////////////////IMPORTS///////////////////////

// Configura socket.io!
const io = require("socket.io")(http, {
    cors: {
        origin: "*", // Permitir todas as origens no SOCKET.IO!
        methods: ["GET", "POST", "PUT", "DELETE"] // Permitir os métodos da lista a serem usados no sistema!
    }
})

// Torna a instância do io global!
global.io = io

// Evento que escuta a conexão dos clientes!
io.on("connection", SocketController.controller)

// Política de cors para todas as origens no EXPRESS!
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

// Middleware para definir a política de acesso a recursos de origem cruzada!
app.use(setCrossOriginResourcePolicy)

// Configura o Express para processar dados de formulário em requisições HTTP!
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

///////////////////ROTAS///////////////////////
app.use("/cliente", authRouter)
///////////////////ROTAS///////////////////////

// Abre o servidor na porta configurada no dotenv!
http.listen(PORT, (err) => {
    if (err) {
        console.error(`ERRO => ao iniciar o servidor! =>${err}`)
        process.exit(1)
    } else {
        console.log(`SUCESSO => Servidor iniciou na porta! =>${PORT}`)
    }
})