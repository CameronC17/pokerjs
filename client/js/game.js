//var socket = io.connect("http://localhost:8080");

window.onload = function() {

var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

window.addEventListener('mousedown', saveMouse, false);

//
var shownMessage = false;
///////////////////////////////////////////////////////////////////////

var endGame = false;
var gameTick = 5;
//the speed at which a card is dealt
var cardSpeed = 5;
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

var cardQueue = [["back", 0, 0, 0, 0],
["d8", 0, 0, 0, 1],
["back", 0, 0, 1, 0],
["back", 0, 0, 1, 1],
["c11", 0, 0, 2, 0],
["back", 0, 0, 2, 1],
["back", 0, 0, 3, 0],
["back", 0, 0, 3, 1],
["back", 0, 0, 4, 0],
["s3", 0, 0, 4, 1],
["back", 0, 0, 5, 0],
["back", 0, 0, 5, 1],
["h7", 0, 0, 6, 0],
["back", 0, 0, 6, 1],
["back", 0, 0, 7, 0],
["back", 0, 0, 7, 1]];
//[cardtype, currentX, currentY, playerSeatNum, slot (0 or 1)]
var cardsOnTable = [];

//Creating instances of canvas and the canvas' 2d drawing
var c = document.getElementById("pcanvas");
var ctx = c.getContext("2d");

function mainLoop() {
  drawStationary();
  //drawCard("d3", 40, 100);
  drawCardsOnTable();
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
  drawPlayerCardSlots();
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
  ctx.fillStyle="#006600";
  for (var i = 0; i < playerSeatCards.length; i++) {
    ctx.fillRect(playerSeatCards[i][0], playerSeatCards[i][1], 50, 70);
    ctx.fillRect(playerSeatCards[i][0] + 60, playerSeatCards[i][1], 50, 70);
   }
}

function drawCardsOnTable() {
  for (var i = 0; i < cardsOnTable.length; i++) {
    drawCard(cardsOnTable[i][0], cardsOnTable[i][1], cardsOnTable[i][2]);
  }
};

//This loops the animation frames for animation!!!!
var recursiveAnim = function() {
          mainLoop();
          animFrame(recursiveAnim);
    };
gameEngine();
animFrame(recursiveAnim);

//Game engine stuff
function gameEngine() {
  moveCards();



  if (!endGame)
  {
    setTimeout(function () {
      gameEngine();
    }, gameTick);
  }
}

function moveCards() {
  for (var i = 0; i < cardsOnTable.length; i++) {
    //if the cards have a direction set

    if (cardsOnTable[i][3] != null) {
      var tempCardX = tableX + 385 + cardsOnTable[i][1],
          targetX = (playerSeatCards[cardsOnTable[i][3]][0] + (cardsOnTable[i][4] * 60));

      var xChange = 0;
      //x direction
      if (tempCardX > targetX) {
        cardsOnTable[i][1]-=cardSpeed;
        xChange -= cardSpeed;
      } else if (tempCardX < targetX) {
        cardsOnTable[i][1]+=cardSpeed;
        xChange += cardSpeed;
      }

      if (xChange > 0) {
        if (tempCardX + xChange > targetX) {
          cardsOnTable[i][1] = targetX;
        }
      } else if (xChange < 0) {
        if (tempCardX - xChange < targetX) {
          cardsOnTable[i][1] = targetX;
        }
      }
    }

    if (cardsOnTable[i][4] != null) {
      var tempCardY = tableY - 75 + cardsOnTable[i][2],
          targetY = (playerSeatCards[cardsOnTable[i][3]][1]);

      var yChange = 0;
      //y direction
      if (tempCardY > targetY) {
        cardsOnTable[i][2]-=cardSpeed;
        yChange -= cardSpeed;
      } else if (tempCardY < targetY) {
        cardsOnTable[i][2]+=cardSpeed;
        yChange += cardSpeed;
      }

      if (yChange > 0) {
        if (tempCardY + yChange > targetY) {
          cardsOnTable[i][2] = targetY;
        }
      } else if (yChange < 0) {
        if (tempCardY - yChange < targetY) {
          cardsOnTable[i][2] = targetY;
        }
      }
    }

  }
}

function dealACard() {

}

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
