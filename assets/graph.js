//hrs
var playerData = [4,5,7.0,7,8,5];
var player = ["Anik", "Issac", "Quinn", "Blue", "Red", "Green"];
var playerStats = ["Attack", "Healing", "Healing", "Block", "Attack", "Block"];
var playerColor = [6];

for (i = 0; i < 6; i++) {
  if (playerStats[i]=="Attack")
    playerColor[i]="maroon";
  if (playerStats[i]=="Healing")
    playerColor[i]="teal";
  if (playerStats[i]=="Block")
    playerColor[i]="darkGreen";
}

CanvasJS.addColorSet("bestStats",playerColor);

window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
  colorSet : "bestStats",
	animationEnabled: true,
	data: [{        
		type: "column",
		dataPoints: [ 
			{ y: playerData[0], label: player[0] },
			{ y: playerData[1],  label: player[1] },
			{ y: playerData[2],  label: player[2] },
			{ y: playerData[3],  label: player[3] },
			{ y: playerData[4],  label: player[4] },
			{ y: playerData[5], label: player[5] },
			]
	}]
});
chart.render();
}