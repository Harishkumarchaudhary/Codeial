class ChatEngine {
    constructor(chatBoxId, userEmail) {
       this.chatBox = $(`#${chatBoxId}`);
       this.userEmail = userEmail;

       this.socket = io.connect('http://localhost:5000'); //io is global var given by socket.io module
       if (this.userEmail) {
          this.connectionHandler();
       }
    }

    connectionHandler(){
        let self = this;
         this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codial'
            });

            self.socket.on('user_joined', function(data){
                console.log('User joined', data);
            })
         });
    }
}