///////////////////IMPORTS///////////////////////
require("dotenv").config()
const logger = require("./Logs/logs")
const express = require("express")
const app = express()
const cors = require("cors")
const SocketController = require("./SocketController/SocketController")
const setCrossOriginResourcePolicy = require("./MiddleWare/crossOriginResourcePolicy")
const PORT = process.env.PORT
const http = require("http").createServer(app)
const authRouter = require("./Router/authRouter")
const connectDB = require("./Database/connection")
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

// Evento que escuta a conexão Socket.io dos clientes!
io.on("connection", SocketController.controller)

// Política de cors para todas as origens no EXPRESS!
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

// Configura o Express para processar dados de formulário em requisições HTTP!
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Middleware para definir a política de acesso a recursos de origem cruzada!
app.use(setCrossOriginResourcePolicy)

// Testa a variável de ambiente!
if (!PORT) {
    logger.error({ message: "Variável de ambiente PORT não configurada!" })
    process.exit(1)
}

///////////////////ROTAS///////////////////////
app.use("/cliente", authRouter)
///////////////////ROTAS///////////////////////

// Abre conexão com MongoDB!
connectDB()

// Abre o servidor na porta configurada no dotenv!
http.listen(PORT, (err) => {
    if (err) {
        logger.error({ message: `Erro ao iniciar o servidor => ${err}` })
        process.exit(1)
    }
    // Salva informação do start server nos logs!
    logger.info({
        message: `Servidor iniciou na porta => ${PORT}`,
    })
})