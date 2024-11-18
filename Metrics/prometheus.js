///////////////////IMPORTS///////////////////////
const client = require("prom-client")
///////////////////IMPORTS///////////////////////

// Ativa métricas padrão (CPU, memória, etc.)!
client.collectDefaultMetrics({ timeout: 5000 })

const activeSockets = new client.Gauge({
    name: "active_socket_connections",
    help: "Número de conexões ativas via Socket.io"
})

// Cria um coletor para requisição HTTP!
const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total de requisições HTTP recebidas",
    labelNames: ["method", "route", "status"]
})

// Cria um histograma para monitorar a latência das requisições!
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duração das requisições HTTP em segundos",
    labelNames: ["method", "route", "status"],
    buckets: [0.1, 0.5, 1, 2, 5] // Intervalos para monitorar a latência!
})

// Exportando módulos!
module.exports = {
    httpRequestCounter,
    httpRequestDuration,
    client,
    activeSockets
}