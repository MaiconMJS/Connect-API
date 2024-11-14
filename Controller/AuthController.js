///////////////////IMPORTS///////////////////////
const phoneValidator = require("../Util/phoneValidator")
const logger = require("../Logs/logs")
const validator = require("validator")
const validateInput = require("../Util/validateInput")
///////////////////IMPORTS///////////////////////

class AuthController {
    static async register(req, res) {
        try {
            // Captura o telefone do cliente!
            const phone = req.body.phone ? req.body.phone.trim() : ""
            // Remove caracteres não numéricos!
            const sanitizedPhone = validator.whitelist(phone, "0-9")
            // Espera receber o código único fornecido ao cliente por SMS!
            const code = req.body.code ? req.body.code.trim() : ""
            // Verifica se o telefone e o código foram passados!
            const { valid, message } = validateInput(sanitizedPhone, code)
            if (!valid) {
                return res.status(400).json({ "Error": message })
            }
            // Verifica se corresponde a um telefone válido!
            const phoneVerify = phoneValidator(sanitizedPhone)
            if (!phoneVerify) {
                return res.status(400).json({ "Error": "Telefone inválido!" })
            }
            // Responde positivamente ao cadastrar o cliente!
            res.status(200).json({ "Success": "Cliente registrado!" })
        } catch (err) {
            // Responde ao cliente caso ocorra algum erro!
            res.status(500).json({ "Error": "Erro interno no servidor!" })
            // Imprimi no terminal do servidor o erro ocorrido!
            logger.error({ message: `Erro na função registrar cliente => ${err}` })
        }
    }
}
// Exportando módulo!
module.exports = AuthController