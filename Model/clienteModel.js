///////////////////IMPORTS///////////////////////
const mongoose = require("mongoose")
///////////////////IMPORTS///////////////////////

const clienteSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    date: { type: String, required: true }
})

// Gerando modelo no banco!
const Cliente = mongoose.model("Cliente", clienteSchema)

// Exportando módulo!
module.exports = Cliente 