///////////////////IMPORTS///////////////////////
const mongoose = require("mongoose")
const logger = require("../Logs/logs")
///////////////////IMPORTS///////////////////////

// Monitora eventos do MongoDB!
const monitorConnection = () => {
    // Monitora a desconexão com o MongoDB!
    mongoose.connection.on("disconnected", () => {
        logger.warn({ message: "Conexão com o MongoDB foi perdida!" })
    })
    // Monitora os error na conexão com o MongoDB!
    mongoose.connection.on("error", (err) => {
        logger.error({ message: `Erro na conexão com o MongoDB: ${err}` })
    })
    // Monitora a reconexão bem-sucedida!
    mongoose.connection.on("connected", () => {
        logger.info({ message: "Conexão com o MongoDB restabelecida!" })
    })
    // Monitora o início de novas tentativas de conexão!
    mongoose.connection.on("reconnectFailed", () => {
        logger.error({ message: "Falha ao tentar reconectar ao MongoDB!" })
    })
}

// Exportando módulo!
module.exports = monitorConnection