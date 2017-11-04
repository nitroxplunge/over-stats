const socket = new WebSocket('ws://localhost:8003');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('ShalevBito-2753');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});