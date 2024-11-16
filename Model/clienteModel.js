///////////////////IMPORTS///////////////////////
const mongoose = require("mongoose")
///////////////////IMPORTS///////////////////////

const clienteSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    verify: { type: Boolean, default: false },
    date: { type: Date, required: true, default: Date.now }
})

// Gerando modelo no banco!
const Cliente = mongoose.model("Cliente", clienteSchema)

// Exportando módulo!
module.exports = Cliente 