var express = require("express");
var http_server = express();
var http = require("http");
var port = process.env.PORT || 3000;
//var file = require("fs");
var WebSocket = require("ws").Server;

/*http_server.get('/chat', (req, res) => {
		res.writeHead(200, { "Content-Type": "text/html" });
		file.readFile("client.html", (err, data) => res.end(data));
});

http_server.get('/client.css', (req, res) => {
	res.writeHead(200, { "Content-Type": "text/css" });
	file.readFile("client.css", (err, data) => res.end(data));
});

http_server.get('/client.js', (req, res) => {
	res.writeHead(200, { "Content-Type": "text/javascript" });
	file.readFile("client.js", (err, data) => res.end(data));
});

http_server.get('/chat.jpeg', (req, res) => {
	res.writeHead(200, { "Content-Type": "image/jpeg" });
	file.readFile("chat.jpeg", (err, data) => res.end(data) );
});

http_server.get('/back.jpg', (req, res) => {
	res.writeHead(200, { "Content-Type": "image/jpg" });
	file.readFile("back.jpg", (err, data) => res.end(data));
});

http_server.get('/favicon.jpg', (req, res) => {
	res.writeHead(200, { "Content-Type": "image/x-icon" });
	file.readFile("favicon.jpg", (err, data) => res.end(data));
});*/

//http_server.use((req, res) => res.sendFile(INDEX));

http_server.use(express.static(__dirname + '/'));

//http_server.listen(port, () => console.log("Сервер работает..."));

var tmpServer = http.createServer(http_server).listen(port);

var server = new WebSocket({ server: tmpServer});

server.on("connection", ws => {
	
	ws.on("message", msg => {	
		server.clients.forEach(client => {
			
			if(client.readyState === WebSocket.OPEN && client != ws) client.send(msg);
		});
	});
	
	ws.on("close", function() {
    console.log("websocket connection close")
   
  });
});
