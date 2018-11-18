const express = require("express");
const http_server = express();
const http = require("http");
const port = process.env.PORT || 3000;
//const file = require("fs");
const WebSocket = require("ws").Server;

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

const tmpServer = http.createServer(http_server).listen(port);

const server = new WebSocket({ server: tmpServer});

server.on("connection", ws => {
	
	ws.on("message", msg => {	
		server.clients.forEach(client => {
			
			if(client.readyState === WebSocket.OPEN && client != ws) client.send(msg);
		});
	});
});
