$(()=>{
   const socket = io(); 
    //const token;
   const loginform = $("#login")
   const error = $("#ErroLogin")
   const messages = $("#chat-body")
   const usernames = $("#list-usuarios")
   const formmsg = $("#form-msg")
   const msg = $("#msg");
   var nameuser = 'Anonimo';

   loginform.submit(e =>{
        e.preventDefault();
        console.log("Envian datos");
        var username = $("#username").val();
        var password = $("#password").val();

        socket.emit(
            'login',
            {
            username: username,
            pwd: password
            }, 

            (data)=>{
                console.log(data);
                //El login se ha hecho satisfactoriamente false
                if(!data){
                    nameuser = username
                    initChat()
                }else{
                    error.show();
                    error.removeClass("d-none");
                }
            })
   })

   formmsg.submit(e =>{
    console.log("nuevo mensaje");
    e.preventDefault();
    socket.emit("send message",msg.val())
    msg.val("")
   })

   socket.on("usernames",(data)=>{
       var html = '';
       const clase = 'bg-light';
        data.forEach(name => {
            console.log(name);
            if(nameuser != name){
                html += '<li class="list-group-item '+clase+'" >'+name+'</li>'; 
            }else{
                
                html += '<li class="list-group-item bg-info">'+name+'</li>';
            }
            
        })
        console.log(html);
        usernames.html(html);
   })

   socket.on("new message",(data)=>{
        messages.append("<p>"+data.username+": "+data.msg+"<p>")
   })

   


})

var initChat = function(){
    $("#login-container").hide()
    $("#contendor-chat-user").addClass("d-flex")
}

var addUsername = function(data){
    data
}