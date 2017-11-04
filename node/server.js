var ws = require("nodejs-websocket")
var owjs = require('overwatch-js');

console.log("Opening server on port 8003...");

var server = ws.createServer(function (conn) {

    // When we get a username
    conn.on("text", function (str) {

        // Get user stats
        owjs
            .getOverall('pc', 'us', str)
            // Send data back to client
            .then((data) => conn.sendText("abc"));

    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
    
}).listen(8003);

console.log("Server opened.");