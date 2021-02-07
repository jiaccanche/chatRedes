module.exports = function(io){

    let credenciales =[
        {username:"Yosi", pwd: "1234"},
        {username:"Sara", pwd: "1234"},
        {username:"Edie", pwd: "1234"},
        {username:"Jorge", pwd: "1234"},
    ]

    let clients = []


    io.on('connection',(socket)=>{
         console.log("Nuevo usuario conectado")
         console.log(socket.id)

        socket.on("send message",(data)=>{
            io.sockets.emit("new message",{
                msg: data,
                username: socket.username
            })
        })

         socket.on("login",(data,cb)=>{
            //console.log(data);
            //Validar si existe 
            var result = credenciales.find(obj => {
                return obj.username === data.username && obj.pwd === data.pwd
            })
            console.log("/////////");
            console.log(result);
            console.log("/////////");
             if(result){
                 //Validar el clientes el username
                 const res = clients.indexOf(data.username);
                 console.log(res);
                 if(res != -1){
                    //Existe dentro de los clientes
                    cb(true)    
                 }else{
                     //No existe dentro de los clientes
                    socket.username = data.username
                    clients.push(socket.username)
                    cb(false)
                    io.sockets.emit("usernames",clients);
                 }
                 
             }else{
                 cb(true)
                 //console.log("No existe");
             }
            console.log(clients);
         }) 

         socket.on("disconnect",data =>{
             if(!socket.username) return 
             clients.splice(clients.indexOf(socket.username),1)
             io.sockets.emit("usernames",clients)

         })
    })
}