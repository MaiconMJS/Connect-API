// Função para validar se os campos PHONE & CODE foram preenchidos!
function validateInput(phone, code) {
    if (!phone) {
        return { valid: false, message: "Telefone obrigatório!" }
    }
    if (!code) {
        return { valid: false, message: "Digite o código fornecido por SMS!" }
    }
    return { valid: true }
}
// Exportando módulo!
module.exports = validateInput