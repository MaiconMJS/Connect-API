///////////////////IMPORTS///////////////////////
const winston = require("winston")
const { format } = winston
const DailyRotateFile = require("winston-daily-rotate-file")
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
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ level, message, timestamp }) => {
                    const colors = {
                        error: "\x1b[31m", // Vermelho para erros
                        warn: "\x1b[33m",  // Amarelo para avisos
                        info: "\x1b[32m",  // Verde para informações
                        default: "\x1b[0m" // Reset para outros
                    }
                    const color = colors[level] || colors.default
                    return `[${timestamp}] ${level}: ${color}${message}\x1b[0m`
                })
            )
        }),
        new DailyRotateFile({
            filename: "Logs/server-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d"
        }),
        // Transporter adicional para salvar apenas erros em um arquivo separado!
        new winston.transports.File({
            filename: "Logs/errors.log",
            level: "error", // Somente logs de nível "error" serão salvos aqui!
            format: format.combine(
                format.timestamp({
                    format: () => {
                        return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
                    }
                }),
                format.json() // Salva os erros no formato JSON para facilitar o parsing!
            )
        })
    ]
})
// Exportando módulo!
module.exports = logger