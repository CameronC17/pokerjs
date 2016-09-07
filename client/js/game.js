//var socket = io.connect("http://localhost:8080");

window.onload = function() {

var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

window.addEventListener('mousedown', saveMouse, false);

//Table local variables
var tableX = 350,
    tableY = 300;

//Creating instances of canvas and the canvas' 2d drawing
var c = document.getElementById("pcanvas");
var ctx = c.getContext("2d");

function mainLoop() {
  drawStationary();
  drawCard();
}

function drawStationary() {
  drawBackground();
  drawSeats(tableX, tableY);
  drawTable(tableX, tableY, "green", "#003300");
  drawTableMarkings(tableX, tableY);
  drawTestMarkers(tableX, tableY);
}

function drawTestMarkers() {
  ctx.fillStyle="#ff4dff";
  ctx.fillRect(c.width/2, 0, 1, c.height);
  ctx.fillRect(0, c.height/2, c.width, 1);
}

function drawBackground() {
  ctx.fillStyle="#0066cc";
  ctx.fillRect(0, 0, c.width, c.height);
}

function drawSeats(tX, tY) {
  //dealers seat
  //drawCircle(tX + 360, tY - 90, 70, "#0000e6", "#000066");
  drawCircle(c.width/2, tY - 90, 70, "#0000e6", "#000066");

  //player seats
  drawCircle(tX - 130, tY + 15, 70, "#e60000", "#660000");
  drawCircle(tX - 140, tY + 260, 70, "#e60000", "#660000");
  drawCircle(tX - 70, tY + 500, 70, "#e60000", "#660000");
  drawCircle(tX + 210, tY + 540, 70, "#e60000", "#660000");
  drawCircle(tX + 490, tY + 540, 70, "#e60000", "#660000");
  drawCircle(tX + 770, tY + 500, 70, "#e60000", "#660000");
  drawCircle(tX + 850, tY + 260, 70, "#e60000", "#660000");
  drawCircle(tX + 830, tY + 15, 70, "#e60000", "#660000");

}

function drawTable(x, y, insideColour, outsideColour) {
  //4 corner circles
  drawCircle(x, y, 100, "green", "#003300");
  drawCircle(x + 700, y, 100, "green", "#003300");
  drawCircle(x, y + 400, 100, "green", "#003300");
  drawCircle(x + 700, y + 400, 100, "green", "#003300");

  //outside lines
  ctx.fillStyle = outsideColour;
  ctx.fillRect(x, y - 103, 700, 5);
  ctx.fillRect(x, y + 498, 700, 5);
  ctx.fillRect(x - 103, y, 5, 400);
  ctx.fillRect(x + 798, y, 5, 400);

  //bulk of the green to cover the table
  ctx.fillStyle="green";
  ctx.fillRect(x - 98, y, 896, 400);
  ctx.fillRect(x, y - 98, 700, 596);

}

function drawCircle(x, y, rad, colour, lColour) {
  ctx.strokeStyle = lColour;
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

function drawTableMarkings(tX, tY) {
  //5 slots for the river
  ctx.fillStyle="#006600";
  ctx.fillRect(tX + 160, tY + 180, 60, 80);
  ctx.fillRect(tX + 240, tY + 180, 60, 80);
  ctx.fillRect(tX + 320, tY + 180, 60, 80);
  ctx.fillRect(tX + 400, tY + 180, 60, 80);
  ctx.fillRect(tX + 480, tY + 180, 60, 80);
  //dealer slot
  ctx.fillRect(tX + 380, tY - 80, 60, 80);
}

function drawCard() {
  ctx.fillStyle="#fff";
  ctx.fillRect(735, 225, 50, 70);
  ctx.fillStyle="#ff751a";
  ctx.fillRect(737, 227, 46, 66);
  ctx.fillStyle="#fff";
  ctx.fillRect(737, 235, 46, 2);
  ctx.fillRect(737, 282, 46, 2);

  ctx.fillRect(753, 236, 1, 48);
  ctx.fillRect(759, 236, 2, 48);
  ctx.fillRect(766, 236, 1, 48);
}

//This loops the animation frames for animation!!!!
var recursiveAnim = function() {
          mainLoop();
          animFrame(recursiveAnim);
    };
animFrame(recursiveAnim);

// Functions for saving a mouse click #############################################
function saveMouse(e) {
  var pos = getMousePos(e);
  mouseData[0] = pos.x;
  mouseData[1] = pos.y;
}

function getMousePos(evt) {
  var rect = c.getBoundingClientRect();
  //Return mouse location related to canvas with JSON format
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};
//End mouse click stuff #############################################

}
