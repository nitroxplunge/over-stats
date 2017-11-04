const socket = new WebSocket('wss://localhost:8005');

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Received message from server:', event.data);
    var playerdata = JSON.parse(event.data);
    document.getElementById("lvl").innerHTML = "Level: " + playerdata.profile.level;
    document.getElementById("sr").innerHTML = "SR: " + playerdata.profile.rank;
    document.getElementById("kda").innerHTML = "KDA: " + playerdata.competitive.global.eliminations / playerdata.competitive.global.deaths;
    document.getElementById("avgelims").innerHTML = "Average Eliminations: " + playerdata.competitive.global.eliminations_average;
    document.getElementById("rankpic").src = playerdata.profile.rankPicture;
    document.getElementById("fetching").innerHTML = "";
});

function sendBattletag() {
    document.getElementById("fetching").innerHTML = "Fetching Stats...";
    var BTag = document.getElementById("btag").value;
    BTag = BTag.replace("#", "-");
    socket.send(BTag);
}