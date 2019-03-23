const express =  require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen("9000", () => {
    console.log("Port 9000 is open and ready.");
});


app.use(express.static('public'));


/** 
 * Socket Setup
 */
let io = socket(server);

io.on('connection', (socket) => {

    console.log('Socket Connection Established !');

    socket.on('join_room', room=>{
        console.log(room);
        socket.join(room);
    });

    socket.on('chat', data => {

        const {room, message, handle} = data;

        console.log(message);
        socket.to(room).emit('chat', 
        {
            message : message,
            handle : handle
        });
        // io.sockets.emit('chat', message);
    });

    socket.on('typing', ({room, handler}) =>{
        console.log(handler + ' is typing!');
        socket.to(room).emit('typing', handler+ ' is typing')
        // socket.broadcast.emit('typing', data + ' is typing');
        
})

});