const socket = new WebSocket('wss://localhost:8005');
var playerNames = [];
var playerDatas = [];
var playerBestStats = [];
var playerSRs = [];

// Listen for messages
socket.addEventListener('message', function (event) {

    console.log(event.data);
    var playerdata = JSON.parse(event.data);
    /*"Level: " + playerdata.profile.level;
    "SR: " + playerdata.profile.rank;
    "KDA: " + playerdata.competitive.global.eliminations / playerdata.competitive.global.deaths;
    "Average Eliminations / 10 min: " + playerdata.competitive.global.eliminations_avg_per_10_min;
    playerdata.profile.rankPicture;
    playerdata.competitive.global.all_damage_done_avg_per_10_min;
    playerdata.competitive.global.healing_done_avg_per_10_min;
    playerdata.competitive.global.deaths_avg_per_10_min;
    document.getElementById("fetching").innerHTML = "";*/
    addPlayer(playerdata);
    
});

function sendBattletag() {
    document.getElementById("fetching").innerHTML = "Fetching Stats...";
    var BTag = document.getElementById("btag").value;
    BTag = BTag.replace("#", "-");
    socket.send(BTag);
}



var playerData = playerSRs;
var player = playerNames;
var playerStats = PlayerBestStats;
var playerColor = [player.length];

for (i = 0; i < player.length; i++) {
  if (playerStats[i]=="Attack")
    playerColor[i]="maroon";
  if (playerStats[i]=="Healing")
    playerColor[i]="teal";
  if (playerStats[i]=="Damage")
    playerColor[i]="darkGreen";
}

CanvasJS.addColorSet("bestStats",playerColor);

window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
  colorSet : "bestStats",
	animationEnabled: true,
	data: [{        
		type: "column",
		dataPoints: []
	}]
});

chart.render();

}

function addPlayer(data) {
    playernames.concat(data.profile.nick);
    playerdatas.concat(data);
    var bestStat = "Attack";
    var bestVal = data.competitive.global.eliminations;
    if (data.competitive.global.healing_done * 2 > bestVal) {
        bestStat = "Healing";
        bestVal = data.competitive.global.healing_done;
    }
    if (data.competitive.global.hero_damage_done * 3 > bestVal) {
        bestStat = "Damage";
    }
    playerBestStats.concat(bestStat);
    playerSRs.concat(data.profile.rank);
    chart.options.data[0].dataPoints.push({ y: data.profile.rank, label: data.profile.nick });
}