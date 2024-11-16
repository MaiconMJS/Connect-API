// Necessário após busca no bando de dados para converter para o horário de brasília!  
const localTime = moment(cliente.date).tz("America/Sao_Paulo").format("DD-MM-YYYY HH:mm:ss");