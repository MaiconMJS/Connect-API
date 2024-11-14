///////////////////IMPORTS///////////////////////
const libphonenumber = require("google-libphonenumber")
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance()
const logger = require("../Logs/logs")
///////////////////IMPORTS///////////////////////

// Função para verificar e validar o telefone do cliente!
function phoneValidator(phone) {
    try {
        const number = phoneUtil.parse(phone, "BR")
        return phoneUtil.isValidNumber(number)
    } catch (err) {
        // Imprimi no terminal do servidor o erro ocorrido na validação do telefone!
        logger.error({ message: `Erro no processo de verificação de telefone => ${err}` })
        return false
    }
}
// Exportando módulo!
module.exports = phoneValidator