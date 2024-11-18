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
const prometheus = require("./Metrics/prometheus")
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

///////////////////MIDDLEWARES///////////////////////
// Configura o Express para processar dados de formulário em requisições HTTP!
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Middleware para definir a política de acesso a recursos de origem cruzada!
app.use(setCrossOriginResourcePolicy)
///////////////////MIDDLEWARES///////////////////////

///////////////////PROMETHEUS///////////////////////
// Middleware para coletar métricas das requisições HTTP!
app.use((req, res, next) => {
    const end = prometheus.httpRequestDuration.startTimer() // Inicia o timer
    res.on("finish", () => {
        // Atualiza os contadores e histogramas após a resposta ser enviada!
        prometheus.httpRequestCounter.labels(req.method, req.originalUrl, res.statusCode).inc()
        end({ method: req.method, route: req.originalUrl, status: res.statusCode })
    })
    next()
})
// Endpoint para expor métricas no formato Prometheus!
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", prometheus.client.register.contentType)
    res.send(await prometheus.client.register.metrics())
})
///////////////////PROMETHEUS///////////////////////

///////////////////MONGODB_CONNECT///////////////////////
connectDB() // Abre conexão com MongoDB!
///////////////////MONGODB_CONNECT///////////////////////

///////////////////ROTAS///////////////////////
app.use("/cliente", authRouter)
///////////////////ROTAS///////////////////////

// Testa a porta de conexão de ambiente!
if (!PORT) {
    logger.error({ message: "Variável de ambiente PORT não configurada!" })
    process.exit(1)
}

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