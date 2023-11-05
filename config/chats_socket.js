

module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer, {
        allowEIO3: true,
        cors: {
          origin: 'http://44.200.166.155:8000',
          credentials: true
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('New connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('Socket disconnected');
        });

        socket.on('join_room', function(data){
            console.log('Joining request received', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data); //server will emit to everyone in the chatroom about this event
        });

        // detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
   
}