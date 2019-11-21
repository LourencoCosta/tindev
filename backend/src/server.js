//uma funcção que quando chamda cria servidor
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//Externalizar arquivo de rotas

const routes = require('./routes.js')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}


io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id
})

app.use(cors())
//Interpretar que deve responder com json
app.use(express.json())

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})
//mongoose.connect('mongodb+srv://Oministack:Oministack@cluster0-ac72h.mongodb.net/Oministack8?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connect('mongodb://Oministack:Oministack@cluster0-shard-00-00-ac72h.mongodb.net:27017,cluster0-shard-00-01-ac72h.mongodb.net:27017,cluster0-shard-00-02-ac72h.mongodb.net:27017/Oministack8?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true })

//Usar módulos externo
app.use(routes)

server.listen(3333)


//server.get('/', (req, res) => {
//    return res.send(`Helow ${req.query.name}`)
//})

//server.get('/', (req, res) => {
//    return res.json({
//        message: `Helow ${req.query.name}`
//    })
//})



