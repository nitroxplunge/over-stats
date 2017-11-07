var playerNames = [];
var playerDatas = [];
var playerBestStats = [];
var playerSRs = [];

function getData() {
    document.getElementById("loading").style.visibility = "visible";
    var BTag = document.getElementById("btag").value;
    BTag = BTag.replace("#", "-");

    let requestUrl = "https://ow-api.com/v1/stats/pc/us/" + BTag + "/complete";
    let request = new XMLHttpRequest();
    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        addPlayer(request.response);
    }

    document.getElementById("btag").value = "";

    document.getElementById("loading").style.visibility = "hidden";
}

var playerColor = ["black", "black", "black", "black", "black", "black"];
var playerCounter = 0;

function addPlayer(data) {
    // Ignore if we already have a full team
    if (playerNames.length == 6) return;

    console.log(data);

    // Save player data
    playerNames.push(data.name);
    playerDatas.push(data);
    playerSRs.push(data.rating);

    // Calculate best stat
    var bestStat = "Attack";
    var bestVal = data.competitiveStats.careerStats.allHeroes.combat.eliminations * 320;
    if (data.competitiveStats.careerStats.allHeroes.assists.healingDone * 3 > bestVal) {
        bestStat = "Healing";
        bestVal = data.competitiveStats.careerStats.allHeroes.assists.healingDone;
    }
    if (data.competitiveStats.careerStats.allHeroes.combat.damageDone > bestVal) {
        bestStat = "Damage";
    }
    
    // Set color based on best stat
    if (bestStat === "Attack"){
      playerColor[playerCounter]="maroon";
    }
    if (bestStat === "Healing"){
      playerColor[playerCounter]="teal";
    }
    if (bestStat === "Damage"){
      playerColor[playerCounter]="darkGreen";
    }
    
    // Add best stat data
    playerBestStats.push(bestStat);

    // Create graph
    CanvasJS.addColorSet("bestStats", playerColor);

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

    // Create new array of exactly 6 length for player names
    var playerNicks = [6];
    for (i = 0; i < playerNames.length; i++) { 
        playerNicks[i] = playerNames[i];
    }
    for (i = playerNames.length; i < 6; i++) { 
        playerNicks[i] = " ";
    }

    // Create new array of exactly 6 length for player SR
    var playerSkillz = [6];
    for (i = 0; i < playerSRs.length; i++) { 
        playerSkillz[i] = playerSRs[i];
    }
    for (i = playerSRs.length; i < 6; i++) { 
        playerSkillz[i] = 0;
    }

    // Create a string with the names of the players
    var teamString = playerNames.toString();
    // List .toString() does not include spaces, so we must add them ourselves
    teamString = teamString.split(",").join(", ");

    // Set HTML
    document.getElementById("team").innerHTML = teamString;

    // Add to chart
    chart.options.data[0].dataPoints.push({ y: parseInt(playerSkillz[0]), label: playerNicks[0] });
    chart.options.data[0].dataPoints.push({ y: parseInt(playerSkillz[1]), label: playerNicks[1] });
    chart.options.data[0].dataPoints.push({ y: parseInt(playerSkillz[2]), label: playerNicks[2] });
    chart.options.data[0].dataPoints.push({ y: parseInt(playerSkillz[3]), label: playerNicks[3] });
    chart.options.data[0].dataPoints.push({ y: parseInt(playerSkillz[4]), label: playerNicks[4] });
    chart.options.data[0].dataPoints.push({ y: parseInt(playerSkillz[5]), label: playerNicks[5] });

    console.log(playerSRs);
    console.log(playerSkillz);

    // Render chart
    chart.render();

    var totalElims = 0;
    for (i = 0; i < playerDatas.length; i++) {
        totalElims += playerDatas[i].competitiveStats.careerStats.allHeroes.combat.eliminations;
    }
    var totalDmg = 0;
    for (i = 0; i < playerDatas.length; i++) {
        totalDmg += playerDatas[i].competitiveStats.careerStats.allHeroes.combat.damageDone;
    }
    var totalHeals = 0;
    for (i = 0; i < playerDatas.length; i++) {
        totalHeals += playerDatas[i].competitiveStats.careerStats.allHeroes.assists.healingDone;
    }
    var totalObjTime = 0;
    var displayObjTime = "00:00";
    for (i = 0; i < playerDatas.length; i++) {
        var calcObjTime = playerDatas[i].competitiveStats.careerStats.allHeroes.game.objectiveTime.toString().split(":")[0]*60 + playerDatas[i].competitiveStats.careerStats.allHeroes.game.objectiveTime.toString().split(":")[1];
        totalObjTime += calcObjTime;
        displayObjTime = Math.floor(totalObjTime / 60).toString().substring(0, Math.floor(totalObjTime / 60).toString().length - 2) + ":" + totalObjTime % 60;
    }

    var avgsr = 0;
    for (i = 0; i < playerDatas.length; i++) {
        avgsr += playerDatas[i].rating;
    }
    avgsr = avgsr / playerDatas.length;
    avgsr = Math.round(avgsr);

    var Avotes = 0;
    var Hvotes = 0;
    var Dvotes = 0;
    for (i = 0; i < playerColor.length; i++) {
        if (playerColor[i] === "maroon") Avotes += 1;
        if (playerColor[i] === "teal") Hvotes += 1;
        if (playerColor[i] === "darkGreen") Dvotes += 1;
    }
    console.log(playerColor);
    var strongTrait = "Eliminations";
    var traitVal = Avotes;
    if (Hvotes > traitVal) {
        strongTrait = "Healing";
        traitVal = Hvotes;
    }
    if (Dvotes > traitVal) {
        strongTrait = "Damage";
    }

    document.getElementById("elims").innerHTML = totalElims;
    document.getElementById("dmg").innerHTML = totalDmg;
    document.getElementById("healing").innerHTML = totalHeals;
    document.getElementById("objtime").innerHTML = "...";//displayObjTime;//totalObjTime.toString().substring(1, totalObjTime.toString().length).slice(0, totalObjTime.toString().length - 3) + ":" + totalObjTime.toString().substring(1, totalObjTime.toString().length).slice(totalObjTime.toString().length - 3, totalObjTime.toString().length - 1);
    document.getElementById("avgsr").innerHTML = avgsr;
    document.getElementById("strongtrait").innerHTML = strongTrait;

    console.log(playerCounter);
    playerCounter++;

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
    document.getElementById("avgsr").innerHTML = "";
    document.getElementById("strongtrait").innerHTML = "";
}