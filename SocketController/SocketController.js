//Classe para gerenciar métodos Socket.io!
class SocketController {
    static controller(socket) {
        // Mostra o ID do cliente que conectou!
        console.log(`${socket.id} => Conectou ao sistema!`)
        // Evento que escuta a desconexão de um cliente!
        socket.on("disconnect", () => {
            console.log(`${socket.id} => Desconectou do sistema!`)
        })
    }
}
// Exportando módulo!
module.exports = SocketController