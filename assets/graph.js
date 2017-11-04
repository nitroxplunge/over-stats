//hrs
var heroData = [4,5,7.0,6,7,8,5,4,3,2,4,5,6,7,4,9,3,11,12,8,2];

CanvasJS.addColorSet("heroShades",
  [//colorSet Array
    "black",
    "orange",
    "PaleGoldenRod",
    "tan",
    "tomato",
    "grey",
    "navy",
    "silver",
    "purple",
    "darkGrey",
    "skyBlue",
    "lime",
    "peru",
    "maroon",
    "orange",
    "pink",
    "slateGrey",
    "green",
    "magenta",
    "teal",
    "blue",
]);

window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
  colorSet : "heroShades",
	animationEnabled: true,
	data: [{        
		type: "bar",
		dataPoints: [ 
			{ y: heroData[0], label: "Reaper" },
			{ y: heroData[1],  label: "Tracer" },
			{ y: heroData[2],  label: "Mercy" },
			{ y: heroData[3],  label: "Hanzo" },
			{ y: heroData[4],  label: "Torbjorn" },
			{ y: heroData[5], label: "Reinhardt" },
			{ y: heroData[6],  label: "Pharah" },
			{ y: heroData[7],  label: "Winston" },
			{ y: heroData[8], label: "Widowmaker" },
			{ y: heroData[9],  label: "Bastion" },
			{ y: heroData[10],  label: "Symmetra" },
			{ y: heroData[11],  label: "Genji" },
			{ y: heroData[12],  label: "Roadhog" },
			{ y: heroData[13], label: "McCree" },
			{ y: heroData[14], label: "Junkrat" },
			{ y: heroData[15],  label: "Zarya" },
			{ y: heroData[16],  label: "Soldier: 76" },
			{ y: heroData[17],  label: "Lucio" },
			{ y: heroData[18],  label: "D.Va" },
			{ y: heroData[19], label: "Mei" },
			{ y: heroData[20], label: "Ana"}
			]
	}]
});
chart.render();
}
