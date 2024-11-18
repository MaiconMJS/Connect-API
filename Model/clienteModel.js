///////////////////IMPORTS///////////////////////
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const logger = require("../Logs/logs")
///////////////////IMPORTS///////////////////////

const clienteSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now },
    email: { type: String, required: true, default: "Não informado!" }
})

// Hash no código único do cliente!
clienteSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("code")) return next()
        this.code = await bcryptjs.hash(this.code, 10)
        next()
    } catch (err) {
        logger.error({
            message: `Erro ao aplicar hash no cliente com telefone: ${this.phone}`,
            error: err.message
        })
        next(err) // Propaga o erro!
    }
})

// Gerando modelo no banco!
const Cliente = mongoose.model("Cliente", clienteSchema)

// Exportando módulo!
module.exports = Cliente 