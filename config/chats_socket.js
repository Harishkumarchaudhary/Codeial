

module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer, {
        allowEIO3: true,
        cors: {
          origin: 'http://localhost:8000',
          credentials: true
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('New connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('Socket disconnected');
        });
    });
   
}