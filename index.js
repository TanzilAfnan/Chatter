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

    socket.on('chat', (data)=> {
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        console.log(data + ' is typing!');
        socket.broadcast.emit('typing', data + ' is typing');
    })
});