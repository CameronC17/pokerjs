var util 	= require('util');
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Classes /////////////////////////////////////////////////////////////////////////////////////////////
var ClientHolder = require('./ClientHolder').ClientHolder;
var Client = require('./Client').Client;
var RoomHolder = require('./RoomHolder').RoomHolder;
var Room = require('./Room').Room;

var Deck = require('./Deck').Deck;

//Game variables //////////////////////////////////////////////////////////////////////////////////////
var endGame = false;
var myPort = 8080;
var gameTick = 20;
var deck = [];
var maxPlayers = 8;
var clients = new ClientHolder();
var rooms = new RoomHolder();

//Just for testing, create 3 rooms
var deck1 = new Deck();
var room1 = new Room(deck1, 1, 2, 50);
var deck2 = new Deck();
var room2 = new Room(deck2, 2, 4, 100);
var deck3 = new Deck();
var room3 = new Room(deck3, 5, 10, 500);

rooms.addRoom(room1);
rooms.addRoom(room2);
rooms.addRoom(room3);

//Client connection functions
io.on('connection', onConnect);

function onConnect(socket) {
	console.log("\n + New connection. Reference: " + socket.id);
	//clients.push([socket.id, clients.length + 1]);
  var newClient = new Client(socket.id);
  clients.addClient(newClient);
	console.log("There are currently " + clients.getConnected() + " clients connected.");

	//Functions here can only be ran once user is connected
	socket.on("disconnect", onDisconnect);
};

function onDisconnect() {
  clients.removeClient(this.id);
  console.log("\n - Disconnected. Reference: " + this.id);
  console.log("There are currently " + clients.getConnected() + " clients connected.");
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
