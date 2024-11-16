///////////////////IMPORTS///////////////////////
const Cliente = require("../Model/clienteModel")
const codeConfirm = require("../Util/codeConfirm")
const moment = require("moment-timezone")
///////////////////IMPORTS///////////////////////

// Função salva novo cliente no banco de dados com código de confirmação aleatório! 
// OBS: Com objetivo de ser confirmado pelo cliente posteriormente via SMS!
async function saveNewCliente(phone) {
    const code = codeConfirm()
    // Obtém hora para o registro no horário America/Sao_Pualo!
    const registrationTime = moment().tz("America/Sao_Paulo").toDate() // Converte para um objeto Date!
    // Gera modelo para um novo registro!
    const newCliente = new Cliente({ phone: phone, code: code, date: registrationTime })
    // Processo para salvar cliente!
    await newCliente.save()
}

// Exportando módulo!
module.exports = saveNewCliente