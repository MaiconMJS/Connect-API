// Função para varificar se o campo PHONE foi preenchidos!
function validateInput(phone, code = "valid") {
    if (!phone) {
        return { valid: false, message: "Telefone obrigatório!" }
    }
    if (!code) {
        return { valid: false, message: "Insira o código de 4 dígitos enviado por SMS!" }
    }
    return { valid: true }
}
// Exportando módulo!
module.exports = validateInput
