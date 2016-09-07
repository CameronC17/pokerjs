var util 	= require('util');
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Classes /////////////////////////////////////////////////////////////////////////////////////////////
var ClientHolder = require('./ClientHolder').ClientHolder;
var Client = require('./Client').Client;
console.log(Client);

//Game variables //////////////////////////////////////////////////////////////////////////////////////
var endGame = false;
var myPort = 8080;
var gameTick = 20;
var deck = [];
var maxPlayers = 8;
var clients = new ClientHolder();
var rooms = [];

//Client connection functions
io.on('connection', onConnect);

function onConnect(socket) {
	console.log("\n + New connection. Reference: " + socket.id);
	//clients.push([socket.id, clients.length + 1]);
  var newClient = new Client(socket.id);
  clients.addClient(newClient);
	console.log("There are currently " + clients.getConnected() + " users online.");

	//Functions here can only be ran once user is connected
	socket.on("disconnect", onDisconnect);
};

function onDisconnect() {
  //clients.splice(clientPosByID(this.id), 1);
  clients.removeClient(this.id);
  console.log("\n - Disconnected. Reference: " + this.id);
  console.log("There are currently " + clients.getConnected() + " users online.");
};

//Server start functions ////////////////////////////////////////////////////////////////////////////////
server.listen(process.env.PORT || myPort);
console.log("\n\n----------------------\nServer started.\nListening on PORT: " + myPort);
//DB CONNECT HERE
//console.log('Database connection: Successful.');
console.log("Starting game engine..." + "\n----------------------");
//game();
//sendUpdate();


//Game engine //////////////////////////////////////////////////////////////////////////////////////////
function game() {
	//if (playersInGame.length > 0)
	{
		//do the things

  	if (!endGame)
  	{
  		setTimeout(function () {
  			game();
      }, gameTick);
  	}
  };
}
