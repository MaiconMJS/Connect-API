require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const SocketController = require("./SocketController/SocketController")
const setCrossOriginResourcePolicy = require("./MiddleWares/crossOriginResourcePolicy")
const PORT = process.env.PORT
const http = require("http").createServer(app)

// Configura socket.io
const io = require("socket.io")(http, {
    cors: {
        origin: "*", // Permitir todas as origens!
        methods: ["GET", "POST", "PUT", "DELETE"] // Permiti os métodos da lista a serem usados no sistema!
    }
})

// Torna a instância do io global!
global.io = io

// Middleware para definir a política de acesso a recursos de origem cruzada!
app.use(setCrossOriginResourcePolicy)

// Evento que escuta a conexão dos clientes!
io.on("connection", SocketController.controller)

// Política de cors para todas as origens!
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

// Configura o Express para processar dados de formulário em requisições HTTP!
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Abre o servidor na porta configurada no dotenv!
http.listen(PORT, (err) => {
    if (err) {
        console.error(`Erro ao iniciar o servidor! =>${err}`)
        process.exit(1)
    } else {
        console.log(`Servidor iniciou com Sucesso na porta =>${PORT}`)
    }
})