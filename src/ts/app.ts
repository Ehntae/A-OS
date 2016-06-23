import * as express from "express";
import * as http from "http";
import * as SocketIO from "socket.io";

// Set up NodeJS / Express / SocketIO server environment
// Consider this the entry point to a future program singleton?

// Configuration
const PORT_NUMBER:number = process.env.PORT || 8080;
const DEBUG_ENABLED:boolean = true;


let app = express();
let server:http.Server = http.createServer(app);


// Set up Middleware
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/www/index.html");
});


app.get("/*", function (req:express.Request, res:express.Response) {
		
	let requestedFile:any = req.params[0];
	
	if (DEBUG_ENABLED == true)
		console.log("[" + __dirname + "] Express serve file: " + requestedFile);
	
	res.sendFile(__dirname + "/www/" + requestedFile);
});

// Set up server listening
server.listen(PORT_NUMBER, function() {
	console.log("Server started: listening on port " + PORT_NUMBER);
});

let io = SocketIO.listen(server);



/*
// Serve starting page
express.get('/', function(req, res) {
	res.sendFile(__dirname + "/www/index.html");
});

// Serve any requested file other than the default index.html
//app.use("/", express.static(__dirname + '/www'));
server.get("/*", function(req, res) {
	
	let requestedFile:any = req.params[0];
	
	if (DEBUG_ENABLED == true)
		console.log("Express serve file: " + requestedFile);
	
	res.sendFile(__dirname + "/" + requestedFile);
});
*/

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




//server.listen(PORT_NUMBER, function() {
//	console.log("Server started: listening on port " + PORT_NUMBER);
//});

