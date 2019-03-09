/**Connect to the socket */

const socket = io.connect('http://localhost:9000/');


// DOM query
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const button = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//Emit Events
button.addEventListener('click', ()=> {
    console.log('buttonPressed');
    socket.emit('chat', {
        message : message.value,
        handle : handle.value
    });
});

message.addEventListener('keypress', ()=> {
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', (data)=>{
    output.innerHTML += '<p> <strong>' + data.handle + ':</strong>'
                        + data.message + '</p>'
    console.log(data);
})

socket.on('typing', (data)=> {
    console.log(data);
    feedback.innerHTML = '<p><em>' + data + '</em></p>';
})