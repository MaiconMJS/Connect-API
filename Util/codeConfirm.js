// Gera um código de 4 dígitos para confirmação do cadastro do cliente!
function codeConfirm() {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    return code
}

// Exportando módulo!
module.exports = codeConfirm