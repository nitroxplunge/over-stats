const socket = new WebSocket('ws://localhost:8003');

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Received message from server:', event.data);
    var playerdata = JSON.parse(event.data);
    var level = playerdata.profile.level;
    document.getElementById("lvl").innerHTML = "Level: " + level;
    console.log(level);
});

function sendBattletag() {
    var BTag = document.getElementById("btag").value;
    BTag = BTag.replace("#", "-");
    socket.send(BTag);
}