///////////////////IMPORTS///////////////////////
const phoneValidator = require("../Util/phoneValidator")
const logger = require("../Logs/logs")
const validator = require("validator")
const validateInput = require("../Util/validateInput")
const saveNewCliente = require("../Util/saveNewCliente")
const Cliente = require("../Model/clienteModel")
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
            // Busca no banco o telefone passado!
            const existingCliente = await Cliente.findOne({ phone: sanitizedPhone })
            // Verifica se o cliente já está cadastrado no sistema!
            if (existingCliente) {
                return res.status(401).json({ "Error": "O cliente já está cadastrado no sistema. Por favor, solicite seu código de confirmação no menu!" })
            }
            // Mascara o telefone do cliente!
            const maskedPhone = sanitizedPhone.slice(-4).padStart(sanitizedPhone.length, "*")
            // Registra o cliente no log com telefone mascarado!
            // OBS: Objetivo: Manter o controle sobre o total de clientes recém-cadastrados!
            logger.info({ message: `Novo cliente registrado! Telefone: ${maskedPhone}` })   
            // Salva um novo cliente no sistema já com código de 4 dígitos para ser confirmado posteriormente via SMS!
            // OBS: Função "saveNewCliente" Salva a data&hora do registro no banco de dados!
            await saveNewCliente(sanitizedPhone)
            // Responde positivamente ao cadastrar o cliente!
            res.status(200).json({ "Success": "Cliente registrado!" })
        } catch (err) {
            // Imprimi no terminal do servidor o erro ocorrido!
            logger.error({ message: `Erro na função registrar cliente => ${err}` })
            // Responde ao cliente caso ocorra algum erro!
            res.status(500).json({ "Error": "Erro interno no servidor!" })
        }
    }
}
// Exportando módulo!
module.exports = AuthController