//var socket = io.connect("http://localhost:8080");

window.onload = function() {

var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

window.addEventListener('mousedown', saveMouse, false);

//Creating instances of canvas and the canvas' 2d drawing
var c = document.getElementById("pcanvas");
var ctx = c.getContext("2d");

function mainLoop() {
  drawStationary();
}

function drawStationary() {
  drawBackground();
  drawTable(250, 200, "green", "#003300");
}

function drawBackground() {
  ctx.fillStyle="#0066cc";
  ctx.fillRect(0, 0, c.width, c.height);
}

function drawTable(x, y, insideColour, outsideColour) {
  //4 corner circles
  drawCircle(250, 200, 100, "green", "#003300");
  drawCircle(950, 200, 100, "green", "#003300");
  drawCircle(250, 600, 100, "green", "#003300");
  drawCircle(950, 600, 100, "green", "#003300");

  //outside lines
  ctx.fillStyle = outsideColour;
  ctx.fillRect(x, y - 103, 700, 5);
  ctx.fillRect(x, y + 498, 700, 5);
  ctx.fillRect(x - 103, y, 5, 400);
  ctx.fillRect(x + 798, y, 5, 400);

  //bulk of the green to cover the table
  ctx.fillStyle="green";
  ctx.fillRect(152, 200, 896, 400);
  ctx.fillRect(250, 102, 700, 596);


}

function drawCircle(x, y, rad, colour, lColour) {
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = lColour;
  ctx.stroke();
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
