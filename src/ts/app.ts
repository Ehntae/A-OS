import * as express from "express";
import * as http from "http";
import * as SocketIO from "socket.io";

var app = express();
var server:http.Server = http.createServer(app);

let io = SocketIO.listen(server);


// Serve starting page
app.use("/", express.static(__dirname + '/www'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/www/index.html");
});

// Serve any requested page
//app.use("/", express.static(__dirname + '/www')); //'/'


/*
	Client sends their position to Server
	Server sends client array every time it receives a new position
	Eventually: Copy clients array and reduce; culling anyone outside of the players viewport (max range)
*/


import ClientHandler from "./Handlers/ClientHandler";
let clientHandler:ClientHandler = new ClientHandler(); 

import Player from "./Entities/Player";
import UserSocket from "./Framework/Interfaces/IUserSocket"


io.on('connection', function(socket:UserSocket) {
	
	
	// Tell server of a new user
	socket.data = {};
	socket.data.ipv4 = socket.handshake.address;    			// Get IPv4 address of the player for reference
	console.log("User connected (" + socket.data.ipv4 + ")");
	
	
	// Define the serverside "player" inside of their socket (to keep track of them)
	let uniqueId:number = 1 + Math.floor(Math.random() * 9);
	socket.data.player = new Player(uniqueId);
	
	
	// Register the socket's player to the Handler
	clientHandler.registerPlayer(socket.data.player);
	
	
	
	// Manage disconnect event
	socket.on("disconnect", function() {
		console.log("User disconnected (" + socket.data.ipv4 + ")");
		clientHandler.removePlayer(socket.data.player.uId);
	});


});




server.listen(8080, function() {
	console.log("Server started: listening on port 8080");
});

