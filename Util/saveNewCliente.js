///////////////////IMPORTS///////////////////////
const Cliente = require("../Model/clienteModel")
const codeConfirm = require("../Util/codeConfirm")
///////////////////IMPORTS///////////////////////

// Função salva novo cliente no banco de dados com código de confirmação aleatório! 
// OBS: Com objetivo de ser confirmado pelo cliente posteriormente via SMS!
async function saveNewCliente(phone) {
    // Gera código de 4 dígitos para ser salvo no banco!
    const code = codeConfirm()
    // Gera modelo para um novo registro!
    const newCliente = new Cliente({ phone: phone, code: code })
    // Processo para salvar cliente!
    await newCliente.save()
}

// Exportando módulo!
module.exports = saveNewCliente