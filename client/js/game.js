//var socket = io.connect("http://localhost:8080");

window.onload = function() {

var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

window.addEventListener('mousedown', saveMouse, false);

//Table local variables
var tableX = 350,
    tableY = 300;

var playerSeatCards = [[tableX - 80, tableY - 30],
                        [tableX - 80, tableY + 200],
                        [tableX - 60, tableY + 400],
                        [tableX + 160, tableY + 410],
                        [tableX + 430, tableY + 410],
                        [tableX + 650, tableY + 400],
                        [tableX + 670, tableY + 200],
                        [tableX + 670, tableY - 30]];

//Creating instances of canvas and the canvas' 2d drawing
var c = document.getElementById("pcanvas");
var ctx = c.getContext("2d");

function mainLoop() {
  drawStationary();
  drawPlayerCardSlots();
  drawCard("d3", 40, 100);
  drawTestMarkers();
}

function drawStationary() {
  drawBackground();
  drawSeats(tableX, tableY);
  drawTable(tableX, tableY, "green", "#003300");
  drawTableMarkings();
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

function drawSeats() {
  //dealers seat
  //drawCircle(tX + 360, tY - 90, 70, "#0000e6", "#000066");
  drawCircle(c.width/2, tableY - 90, 70, "#0000e6", "#000066");

  //player seats
  drawCircle(tableX - 130, tableY + 15, 70, "#e60000", "#660000");
  drawCircle(tableX - 140, tableY + 260, 70, "#e60000", "#660000");
  drawCircle(tableX - 70, tableY + 500, 70, "#e60000", "#660000");
  drawCircle(tableX + 210, tableY + 540, 70, "#e60000", "#660000");
  drawCircle(tableX + 490, tableY + 540, 70, "#e60000", "#660000");
  drawCircle(tableX + 770, tableY + 500, 70, "#e60000", "#660000");
  drawCircle(tableX + 850, tableY + 260, 70, "#e60000", "#660000");
  drawCircle(tableX + 830, tableY + 15, 70, "#e60000", "#660000");
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

function drawTableMarkings() {
  //5 slots for the river
  ctx.fillStyle="#006600";
  ctx.fillRect(tableX + 160, tableY + 60, 60, 80);
  ctx.fillRect(tableX + 240, tableY + 60, 60, 80);
  ctx.fillRect(tableX + 320, tableY + 60, 60, 80);
  ctx.fillRect(tableX + 400, tableY + 60, 60, 80);
  ctx.fillRect(tableX + 480, tableY + 60, 60, 80);
  //dealer slot
  ctx.fillRect(tableX + 380, tableY - 80, 60, 80);
  drawCard("back", 0, 0);

}

function drawCard(cardType, posX, posY) {
  if (cardType == "back") {
    ctx.fillStyle="#fff";
    ctx.fillRect(tableX + 385 + posX, tableY - 75 + posY, 50, 70);
    ctx.fillStyle="#ff751a";
    ctx.fillRect(tableX + 387 + posX, tableY - 73 + posY, 46, 66);
    ctx.fillStyle="#fff";
    ctx.fillRect(tableX + 387 + posX, tableY - 65 + posY, 46, 2);
    ctx.fillRect(tableX + 387 + posX, tableY - 18 + posY, 46, 2);

    ctx.fillRect(tableX + 403 + posX, tableY - 64 + posY, 1, 48);
    ctx.fillRect(tableX + 409 + posX, tableY - 64 + posY, 2, 48);
    ctx.fillRect(tableX + 416 + posX, tableY - 64 + posY, 1, 48);
  }
  else {
    //card front colours
    ctx.fillStyle="#fff";
    ctx.fillRect(tableX + 385 + posX, tableY - 75 + posY, 50, 70);
    ctx.fillStyle="#ff751a";
    ctx.fillRect(tableX + 387 + posX, tableY - 73 + posY, 46, 66);
    ctx.fillStyle="#fff";
    ctx.fillRect(tableX + 389 + posX, tableY - 71 + posY, 42, 62);
    //text
    ctx.font="20px Arial";
    if (cardType.charAt(0) == "s" || cardType.charAt(0) == "c")
      ctx.fillStyle="#000";
    else if (cardType.charAt(0) == "d" || cardType.charAt(0) == "h")
      ctx.fillStyle="#ff0000";

    if (cardType.length == 2) {
      ctx.fillText(cardType.charAt(1), tableX + 390 + posX, tableY - 54 + posY);
      ctx.fillText(cardType.charAt(1), tableX + 419 + posX, tableY - 10 + posY);
    }
    else if (cardType.length == 3) {
      var type = cardType.substring(1, 3);
      if (type == "10") {
        ctx.fillText("10", tableX + 388 + posX, tableY - 54 + posY);
        ctx.fillText("10", tableX + 408 + posX, tableY - 10 + posY);
      }
      else {
        var cardVal = "X";
        switch (type) {
          case "11":
            cardVal = "J";
            break;
          case "12":
            cardVal = "Q";
            break;
          case "13":
            cardVal = "K";
            break;
          case "14":
            cardVal = "A";
            break;
        }
        ctx.fillText(cardVal, tableX + 390 + posX, tableY - 54 + posY);
        ctx.fillText(cardVal, tableX + 415 + posX, tableY - 10 + posY);
      }
    }


    ctx.font="40px Arial";
    var cardSuit = "X";
    switch (cardType.charAt(0)) {
      case "c":
        cardSuit = "♣";
        break;
      case "s":
        cardSuit = "♠";
        break;
      case "d":
        cardSuit = "♦";
        break;
      case "h":
        cardSuit = "♥";
        break;
    }
    ctx.fillText(cardSuit, tableX + 398 + posX, tableY - 28 + posY);

  }
}

function drawPlayerCardSlots() {
  //start top left forplayer 1, go anti clockwise
  ctx.fillStyle="#fff";
  for (var i = 0; i < playerSeatCards.length; i++) {
    ctx.fillRect(playerSeatCards[i][0], playerSeatCards[i][1], 50, 70);
    ctx.fillRect(playerSeatCards[i][0] + 60, playerSeatCards[i][1], 50, 70);
   }
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
