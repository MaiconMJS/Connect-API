///////////////////IMPORTS///////////////////////
const Cliente = require("../Model/clienteModel")
const logger = require("../Logs/logs")
///////////////////IMPORTS///////////////////////

// Verifica se o cliente já está cadastrado!
async function existingCliente(phone) {
    try {
        // Busca no banco o telefone passado!
        const search = await Cliente.findOne({ phone: phone })
        if (search) {
            return {
                success_search: true,
                message_search: "O cliente já está cadastrado no sistema. Por favor, solicite seu código de confirmação no menu!"
            }
        }
        return { success_search: false }
    } catch (err) {
        // Salva em logs o erro ocorrido!
        const maskedPhone = phone.replace(/.(?=.{4})/g, "*") // Mascara telefone no LOG!
        logger.error({
            message_search: "Erro ao buscar cliente no banco de dados!",
            phone: maskedPhone, // Telefone mascarado nos logs para não expor o cliente!
            error: err.message
        })
        return {
            success_search: false,
            message_search: "Erro na consulta ao banco de dados. Por favor, tente novamente mais tarde!"
        }
    }
}
// Exportando módulo!
module.exports = existingCliente