///////////////////IMPORTS///////////////////////
const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGO_URI
const logger = require("../Logs/logs")
const monitorConnection = require("./monitorConnection")
///////////////////IMPORTS///////////////////////

// Função responsável por realizar conexão com banco de dados MongoDB!
const connectDB = async () => {
    try {
        // Testa a variável de ambiente!
        if (!MONGO_URI) {
            logger.error({ message: "A variável MONGO_URI não está definida!" })
            process.exit(1)
        }
        // Estabelece uma conexão com MongoDB!
        await mongoose.connect(MONGO_URI)
        logger.info({ message: "MongoDB conectado! => OK" })
        // Monitora eventos do MongoDB!
        monitorConnection()
    } catch (err) {
        // Encapsular mensagens de erro em detalhes!
        logger.error({
            message: "Erro ao conectar com MongoDB!",
            error: err.message,
            stack: err.stack
        })
        process.exit(1)
    }
    // Fechar a conexão ao sair da aplicação!
    process.on("SIGINT", async () => {
        await mongoose.connection.close()
        logger.info({ message: "Conexão com MongoDB encerrada devido à finalização do processo!" })
        setTimeout(() => {
            process.exit(0)
        }, 5)
    })
}

// Exportando módulo!
module.exports = connectDB