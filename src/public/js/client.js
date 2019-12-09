$(()=>{
   const socket = io(); 
    //const token;
   const loginform = $("#login")
   const error = $("#ErroLogin")
   const messages = $("body-chat")
   const usernames = $("usernames")
   const chatuser = $("chatuser")

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
                    initChat(username)
                }else{
                    error.show();
                    error.removeClass("d-none");
                }
            })
   })

})

var initChat = function(username){
    $("#login-container").hide()
    $("#contendor-chat-user").addClass("d-flex")
    $("#list-usuarios").append('<li class="list-group-item bg-info">'+username+'</li>')


}