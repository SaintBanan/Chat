const http = require("http");
const file = require("fs");
var	  port = process.env.PORT || 8080;

http.createServer((req, res) => {
	switch(req.url)
	{
		case '/':
			res.writeHead(200, { "Content-Type": "text/html" });
			file.readFile("client.php", (err, data) => res.end(data));
			break;
		case "/client.css":
			res.writeHead(200, { "Content-Type": "text/css" });
			file.readFile("client.css", (err, data) => res.end(data));
			break;
		case "/client.js":
			res.writeHead(200, { "Content-Type": "text/javascript" });
			file.readFile("client.js", (err, data) => res.end(data));
			break;
		case "/chat.jpeg":
			res.writeHead(200, { "Content-Type": "image/jpeg" });
			file.readFile("chat.jpeg", (err, data) => res.end(data) );
			break;
		case "/back.jpg":
			res.writeHead(200, { "Content-Type": "image/jpg" });
			file.readFile("back.jpg", (err, data) => res.end(data));
			break;
		case "/favicon.jpg":
			res.writeHead(200, { "Content-Type": "image/x-icon" });
			file.readFile("favicon.jpg", (err, data) => res.end(data));
			break;
		default:
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("404 Not found");
			break;
	}
}).listen(parseInt(port), "192.168.1.8", () => console.log("Сервер работает..."));