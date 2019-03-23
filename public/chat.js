/**Connect to the socket */

const socket = io.connect('http://localhost:9000/');


// DOM query
const message = document.getElementById('message');
const handle = document.getElementById('User');
const send = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');
const room = document.getElementById('room');
const joinRoomButton = document.getElementById('joinRoom');

joinRoomButton.onclick = ()=> {
    console.log(room.value);
    socket.emit('join_room', room.value);
}

// Emit Events
send.addEventListener('click', ()=> {
    console.log('buttonPressed');

    output.innerHTML += '<p> <strong>' + handle.value + ':</strong>  '
                        + message.value + '</p>'

    socket.emit('chat', 
    {
        room : room.value,
        message : message.value,
        handle : handle.value
    }
    );
    message.value = "";

});

// Listen for events
socket.on('chat', (data)=>{

    output.innerHTML += '<p> <strong>' + data.handle + ':</strong>  '
                        + data.message + '</p>'
    console.log(data);
    feedback.innerHTML = '';
})

message.addEventListener('keypress', ()=> {

    console.log("handle.value");
    socket.emit('typing', {
        room : room.value,
        handler : handle.value
    });
})

socket.on('typing', (data)=> {
    console.log(data);
    feedback.innerHTML = '<p><em>' + data + '</em></p>';
})