const socket = new WebSocket('ws://localhost:8003');

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Received message from server:', event.data);
    var playerdata = JSON.parse(event.data);
});

function sendBattletag() {
    socket.send(document.getElementById("btag").value);
}