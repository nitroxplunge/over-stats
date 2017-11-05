const socket = new WebSocket('wss://localhost:8003');
var playerNames = [];
var playerDatas = [];
var playerBestStats = [];
var playerSRs = [];

// Listen for messages
socket.addEventListener('message', function (event) {

    console.log(event.data);
    var playerdata = JSON.parse(event.data);

    //document.getElementById("rankpic").src = playerdata.profile.rankPicture;

    document.getElementById("elims").innerHTML = playerdata.competitive.global.eliminations;
    document.getElementById("dmg").innerHTML = playerdata.competitive.global.hero_damage_done;
    document.getElementById("healing").innerHTML = playerdata.competitive.global.healing_done;
    document.getElementById("objtime").innerHTML = playerdata.competitive.global.objective_time / 1000 + " sec";

    addPlayer(playerdata);

    document.getElementById("loading").style.visibility = "hidden";

});

function sendBattletag() {
    document.getElementById("loading").style.visibility = "visible";
    var BTag = document.getElementById("btag").value;
    BTag = BTag.replace("#", "-");
    socket.send(BTag);
    document.getElementById("btag").value = "";
}

var playerData = playerSRs;
var player = playerNames;
var playerStats = playerBestStats;
var playerColor = ["black", "black", "black", "black", "black", "black"];
var counter = 0;

function addPlayer(data) {
    playerNames.push(data.profile.nick);
    playerDatas.push(data);
    var bestStat = "Attack";
    var bestVal = data.competitive.global.eliminations * 320;
    if (data.competitive.global.healing_done * 3 > bestVal) {
        bestStat = "Healing";
        bestVal = data.competitive.global.healing_done;
    }
    if (data.competitive.global.hero_damage_done > bestVal) {
        bestStat = "Damage";
    }
    
    if (bestStat === "Attack"){
      playerColor[counter]="maroon";
    }
    if (bestStat === "Healing"){
      playerColor[counter]="teal";
    }
    if (bestStat === "Damage"){
      playerColor[counter]="darkGreen";
    }
    counter++;
    
    CanvasJS.addColorSet("bestStats", playerColor);
    playerBestStats.push(bestStat);
    playerSRs.push(data.profile.rank);
    var chart = new CanvasJS.Chart("chartContainer", {
        colorSet: "bestStats",
        animationEnabled: true,
        axisY: {
            maximum: 5000
        },
        data: [{        
            type: "column",
            dataPoints: []
        }]
    });

    var playerNicks = [6];
    for (i = 0; i < playerNames.length; i++) { 
        playerNicks[i] = playerNames[i];
    }
    for (i = playerNames.length; i < 6; i++) { 
        playerNicks[i] = " ";
    }

    var playerSkillz = [6];
    for (i = 0; i < playerSRs.length; i++) { 
        playerSkillz[i] = playerSRs[i];
    }
    for (i = playerSRs.length; i < 6; i++) { 
        playerSkillz[i] = 0;
    }

    var teamString = "Team: " + playerNames.toString();
    teamString = teamString.split(",").join(", ");

    document.getElementById("team").innerHTML = teamString;

    chart.options.data[0].dataPoints.push({ y: playerSkillz[0], label: playerNicks[0] });
    chart.options.data[0].dataPoints.push({ y: playerSkillz[1], label: playerNicks[1] });
    chart.options.data[0].dataPoints.push({ y: playerSkillz[2], label: playerNicks[2] });
    chart.options.data[0].dataPoints.push({ y: playerSkillz[3], label: playerNicks[3] });
    chart.options.data[0].dataPoints.push({ y: playerSkillz[4], label: playerNicks[4] });
    chart.options.data[0].dataPoints.push({ y: playerSkillz[5], label: playerNicks[5] });

    chart.render();
}

function clearTeam() {
    playerNames = [];
    playerDatas = [];
    playerBestStats = [];
    playerSRs = [];
    document.getElementById("team").innerHTML = "";
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        axisY: {
            maximum: 5000
        },
        data: [{        
            type: "column",
            dataPoints: [
                { y: 0, label: " " },
                { y: 0, label: " " },
                { y: 0, label: " " },
                { y: 0, label: " " },
                { y: 0, label: " " },
                { y: 0, label: " " }
            ]
        }]
    });
    chart.render();

    document.getElementById("elims").innerHTML = "";
    document.getElementById("dmg").innerHTML = "";
    document.getElementById("healing").innerHTML = "";
    document.getElementById("objtime").innerHTML = "";
}