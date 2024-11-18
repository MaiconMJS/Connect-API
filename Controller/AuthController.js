///////////////////IMPORTS///////////////////////
const phoneValidator = require("../Util/phoneValidator")
const logger = require("../Logs/logs")
const validator = require("validator")
const validateInput = require("../Util/validateInput")
const saveNewCliente = require("../Util/saveNewCliente")
const existingCliente = require("../Util/existingCliente")
///////////////////IMPORTS///////////////////////

class AuthController {
    static async register(req, res) {
        try {
            // Captura o telefone do cliente!
            const phone = req.body.phone ? req.body.phone.trim() : ""
            // Remove caracteres não numéricos!
            const sanitizedPhone = validator.whitelist(phone, "0-9")
            // Verifica se o telefone foi passado!
            const { valid, message } = validateInput(sanitizedPhone)
            if (!valid) {
                return res.status(400).json({ "Error": message })
            }
            // Verifica se corresponde a um telefone válido!
            const phoneVerify = phoneValidator(sanitizedPhone)
            if (!phoneVerify) {
                return res.status(400).json({ "Error": "Telefone inválido!" })
            }
            // Busca cliente no banco de dados!
            const { success_search, message_search } = await existingCliente(sanitizedPhone)
            // Verifica se o cliente já está cadastrado no sistema!
            if (success_search) {
                return res.status(401).json({ "Error": message_search })
            }
            // Mascara o telefone do cliente!
            const maskedPhone = sanitizedPhone.slice(-4).padStart(sanitizedPhone.length, "*")
            // Registra o cliente no log com telefone mascarado!
            // OBS: Objetivo: Manter o controle sobre o total de clientes recém-cadastrados!
            logger.info({ message: `Novo cliente registrado! Telefone: ${maskedPhone}` })  
            // Verifica processo no banco de dados e retorna mensagem negativa ou positiva!
            const { success_save, message_save } = await saveNewCliente(sanitizedPhone)
            if (!success_save) {
                return res.status(500).json({ "Error": message_save })
            }
            // Responde positivamente ao cadastrar o cliente!
            res.status(200).json({ "Success": message_save })
        } catch (err) {
            // Imprimi e salva em logs do servidor o erro ocorrido!
            logger.error({
                message: `Erro na função registrar cliente => ${err}`,
                error: `${err.message}`
            })
            // Responde ao cliente caso ocorra algum erro!
            res.status(500).json({ "Error": "Erro interno no servidor!" })
        }
    }
}
// Exportando módulo!
module.exports = AuthController