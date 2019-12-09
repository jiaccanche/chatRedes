
//Elementos de servidor
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const path = require('path')

//Creo servidor http con express
const app = express()
//Agregar seguridad SSL
const server = http.createServer(app)
const io = socketio.listen(server)

//Configurar puerto
app.set('port', process.env.PORT || 3000)

require("./socket")(io)

//Especifico en que carpeta obtendra los archivos públics
app.use(express.static(path.join(__dirname,'public')))
//Puerto en el que escucha el server
server.listen(app.get('port'),()=>{
    console.log('server on port:' + app.get('port'));
})



