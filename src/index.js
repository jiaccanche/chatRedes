
//Elementos de servidor
const express = require('express')
const https = require('https');
const fs = require('fs');
const path = require('path')

//Creo servidor http con express
const app = express()
//Agregar seguridad SSL
const secureServer = https.createServer({
    key: fs.readFileSync(path.resolve(__dirname,'server.key')),
    cert: fs.readFileSync(path.resolve(__dirname,'server.cert'))
},app)

//const server = http.createServer(app)
//const io = socketio.listen(server)

//Socket seguro
const ios = require('socket.io').listen(secureServer);

/*ios.on("connection", (socket) => {
    console.log("Conectado socket seguro");
});*/
//Configurar puerto
//app.set('port', process.env.PORT || 3000)

require("./socket")(ios)




//Especifico en que carpeta obtendra los archivos públics
app.use(express.static(path.join(__dirname,'public')))
//Puerto en el que escucha el server
/*server.listen(app.get('port'),()=>{
    console.log('server on port:' + app.get('port'));
})*/

const HTTPS_PORT = 2010

secureServer.listen(HTTPS_PORT, () => {
    console.log("secure server started at" + HTTPS_PORT);
})


