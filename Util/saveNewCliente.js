///////////////////IMPORTS///////////////////////
const Cliente = require("../Model/clienteModel")
const codeConfirm = require("../Util/codeConfirm")
const logger = require("../Logs/logs")
///////////////////IMPORTS///////////////////////

// Função salva novo cliente no banco de dados com código de confirmação aleatório! 
// OBS: Com objetivo de ser confirmado pelo cliente posteriormente via SMS!
async function saveNewCliente(phone) {
    try {
        // Gera código de 4 dígitos para ser salvo no banco!
        const code = codeConfirm()
        // Gera modelo para um novo registro!
        const newCliente = new Cliente({ phone: phone, code: code })
        // Processo para salvar cliente!
        await newCliente.save()
        // Retorno sucesso!
        return { success: true, msg: "Cliente salvo com sucesso!" }
    } catch (err) {
        // Salva o erro no logger
        logger.error({
            message: "Erro ao salvar novo cliente!",
            phone: phone,
            error: err.message
        })
        // Retorna o erro!
        return { success: false, msg: "Erro ao salvar cliente no banco de dados!", error: err.message }
    }
}

// Exportando módulo!
module.exports = saveNewCliente