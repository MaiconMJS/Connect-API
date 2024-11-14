///////////////////IMPORTS///////////////////////
const winston = require("winston")
const { format } = winston
///////////////////IMPORTS///////////////////////

// Método para salvar logs do sistema!
const logger = winston.createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: () => {
                // Gera o timestamp no horário do Brasil (America/Sao_Paulo)
                return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
            }
        }),
        format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "Logs/server.log" })
    ]
})
// Exportando módulo!
module.exports = logger