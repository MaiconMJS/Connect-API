///////////////////IMPORTS///////////////////////
const logger = require("../Logs/logs")
///////////////////IMPORTS///////////////////////

//Classe para gerenciar métodos Socket.io!
class SocketController {
    static controller(socket) {
        // Mostra o ID do cliente que conectou!
        console.log(`${socket.id} => Conectou ao sistema!`)

        // Salva em log caso ocorra um erro na conexão Socket.io!
        socket.on("error", (err) => {
            logger.warn({ message: `Erro no Socket => ${err.message}` })
        })

        // Evento que escuta a desconexão de um cliente!
        socket.on("disconnect", (reason) => {
            console.log(`${socket.id} => Desconectou do sistema! Motivo => ${reason}`)
        })
    }
}
// Exportando módulo!
module.exports = SocketController