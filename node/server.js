var ws = require("nodejs-websocket")
var owjs = require("overwatch-js");
var fs = require("fs");

console.log("Opening server on port 8003...");

var options = {
    secure: true,
    key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem")
}

var server = ws.createServer(options, function (conn) {

    // When we get a username
    conn.on("text", function (str) {

        // Get user stats
        owjs
            .getOverall('pc', 'us', str)
            // Send data back to client
            .then((data) => conn.sendText(JSON.stringify(data)));

    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
    
}).listen(8003);

console.log("Server opened.");