module.exports = function(io){

    let credenciales =[
        {username:"16016300", pwd: "1234"},
        {username:"16016301", pwd: "1234"},
        {username:"16016302", pwd: "1234"},
    ]

    let clients = []


    io.on('connection',(socket)=>{
         console.log("Nuevo usuario conectado")
         console.log(socket.id)

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
                 }
                 
             }else{
                 cb(true)
                 //console.log("No existe");
             }
            console.log(clients);
         }) 
    })
}