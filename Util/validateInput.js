// Função para validar se o campo PHONE foi preenchidos!
function validateInput(phone) {
    if (!phone) {
        return { valid: false, message: "Telefone obrigatório!" }
    }
    return { valid: true }
}
// Exportando módulo!
module.exports = validateInput