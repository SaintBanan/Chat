const express = require("express");
const socket = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000;
const eServer = express();
const hServer = http.createServer(eServer);
const server = socket(hServer);

eServer.use(express.static(__dirname + '/'));

hServer.listen(port, () => console.log("Сервер работает..."));

server.on("connection", ws => {
	
	/*ws.on("message", msg => {	
		server.clients.forEach(client => {
			
			if(client.readyState === WebSocket.OPEN && client != ws) client.send(msg);
		});
	});*/
	
	//ws.on("disconnect", () => console.log("Client disconnected(") );
	
	ws.on("msg", msg => ws.broadcast.emit("msg", msg));
});
