const ball = {
  x: 50,
  y: 50,
  radius: 10,
  speedX: 3,
  speedY: 3,
  spawn: function (newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

const snakeBody = [];


function AddSnake(x, y, tmpX, tmpY) { // x = 40 y = 50
  this.x = x;
  this.y = y;
  this.tmpX = tmpX;
  this.tmpY = tmpY;
  this.display = function () {
    noStroke();
    fill(255);
    square(this.x, this.y, 10);
  }
}

let snakeFood = []

function Food(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.exists = true;
  this.display = function () {
    noStroke();
    fill(0, 100, 0);
    square(this.x, this.y, size)
  }
}

//PATH = Temporary variable
snakeBody[0] = {
  x: 50,
  y: 50,
  dir: "r",
  size: 10,
  body: 3,
  speed: 10,
  alive: true,
  display: function () {
    noStroke();
    fill(255);
    square(this.x, this.y, this.size)
  },
  tmpX: this.x - 10,
  tmpY: this.y - 10,
}


const pong = {
  x: 0,
  y: 800 - 20,
  width: 100,
  height: 10,
  lives: 3,
  alive: true
}

let squares = [];

function Square(x, y) {
  this.x = x;
  this.y = y;
  this.size = 20;
  this.exists = true;
  this.display = function () {
    noStroke();
    fill(255);
    square(x, y, 20);
  }
}
// SNAKEFOOD BOOLEAN
// let snakeFoodBool = true;

//ADD SNAKE
let snakeSize = 10;
let startCoordinateX = 40;
let startCoordinateY = 50;
let tmpX = 40;
let tmpY = 50;
for (let i = 1; i <= snakeSize; i++) {
  snakeBody[i] = new AddSnake(startCoordinateX, startCoordinateY, tmpX, tmpY);
  tmpX = tmpX - 10;
  startCoordinateX = startCoordinateX - 10;
}

// let counter = 0;

//Add snakefood and repeat when no left
function addSnakeFood() {
  for (let i = 0; i < 5; i++) {
    snakeFood[i] = new Food(round(random(width / 10)) * 10, round(random(height / 10)) * 10, 10);
    // console.log(snakeFood[i].x, snakeFood[i].y)
  }
}

let x = 0;

function refreshSnakeFood() {
  snakeFood = [];

  stroke(255);
  line(x, 0, x, height);
  x = x + 3;
}

function endGame() {

}

function setup() {
  let canvas = createCanvas(500, 800);
  canvas.parent('sketch-container');

  background(0);
  noStroke();
  fill(255);
  circle(200, 200, 255);

  setInterval(refreshSnakeFood(), 10000);

  //UBACUJE square[i] u array squarova
  for (let i = 0; i < 12; i++) {
    if (i < 4) {
      squares[i] = new Square((i + 1) * 100, 100);
    } else if (i >= 4 && i < 8) {
      squares[i] = new Square((i - 3) * 100, 200);
    } else {
      squares[i] = new Square((i - 7) * 100, 300);
    }
  }

  //ADD SNAKEFOOD
  addSnakeFood();
}


function keyPressed() {
  if (snakeBody[0].alive === true) {
    if (keyCode === RIGHT_ARROW) {
      // snakeBody[0].moveRight();
      if (snakeBody[0].dir !== "l") {
        snakeBody[0].dir = "r";
      }
    }
    if (keyCode === LEFT_ARROW) {
      // snakeBody[0].moveLeft();
      if (snakeBody[0].dir !== "r") {
        snakeBody[0].dir = "l";
      }
    }
    if (keyCode === UP_ARROW) {
      // snakeBody[0].moveUp();
      if (snakeBody[0].dir !== "d") {
        snakeBody[0].dir = "u";
      }
    }
    if (keyCode === DOWN_ARROW) {
      // snakeBody[0].moveDown();
      if (snakeBody[0].dir !== "u") {
        snakeBody[0].dir = "d";
      }
    }
  }
}

//If food exists
let snakeFoodBool = true;

function draw() {
  background(0);

  //BALL creation
  noStroke();
  fill(255);
  circle(ball.x, ball.y, ball.radius);

  // Kretanje lopte
  if (pong.alive === true && snakeBody[0].alive === true) {
    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY;
  }

  //Pong creation
  if (pong.alive === true) {
    noStroke();
    fill(255);
    rect(pong.x, pong.y, pong.width, 10);
  } else {
    if (frameCount % 5 === 0) {
      noStroke();
      fill(255);
      rect(pong.x, pong.y, pong.width, 10);
    }
  }

  // refreshSnakeFood();

  // Prikazi zmiju
  if (snakeBody[0].alive === true) {
    for (let i = 0; i < snakeBody.length; i++) {
      snakeBody[i].display();
    }
  } else {
    if (frameCount % 5 === 0) {
      for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].display();
      }
    }
  }
  // snakeBody[0].x = snakeBody[0].x + 2;

  // ubaci kocke
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].exists) {
      squares[i].display();
    }
  }

  //Prikazi hranu
  for (let i = 0; i < snakeFood.length; i++) {
    if (snakeFood[i].exists === true) {
      snakeFood[i].display();
    }
  }

  //TAIL FOLLOWING  Tail refresh malo secka i nije lepo

  for (let i = snakeBody.length - 1; i > 0; i--) { //snakeBody.length - 1 = 4
    if (snakeBody[0].alive === true) {
      if (i === 1) {
        snakeBody[i].tmpX = snakeBody[i - 1].x;
        snakeBody[i].tmpY = snakeBody[i - 1].y;
        snakeBody[i].x = snakeBody[i - 1].x;
        snakeBody[i].y = snakeBody[i - 1].y;
      } else {
        snakeBody[i].tmpX = snakeBody[i - 1].x;
        snakeBody[i].tmpY = snakeBody[i - 1].y;
        snakeBody[i].x = snakeBody[i - 1].tmpX;
        snakeBody[i].y = snakeBody[i - 1].tmpY;
      }
    }
  }

  // snakeMove();

  if (pong.alive === true && snakeBody[0].alive === true) {
    // SNAKE MOVING(CHANGING DIRECTION)
    switch (snakeBody[0].dir) {
      case 'r':
        snakeBody[0].x = snakeBody[0].x + 3;
        // if (snakeBody[0].x < 0) {
        //   snakeBody[0].x = width;
        // }
        break;
      case 'l':
        snakeBody[0].x = snakeBody[0].x - 3;
        break;
      case 'u':
        snakeBody[0].y = snakeBody[0].y - 3;
        break;
      case 'd':
        snakeBody[0].y = snakeBody[0].y + 3;
        break;
      default:
    }
  }


  // Jedenje
  for (let i = 0; i < snakeFood.length; i++) {
    if (snakeFood[i].x < snakeBody[0].x + snakeBody[0].size &&
      snakeFood[i].x + snakeFood[i].size > snakeBody[0].x &&
      snakeFood[i].y < snakeBody[0].y + snakeBody[0].size &&
      snakeFood[i].y + snakeFood[i].size > snakeBody[0].y &&
      snakeFood[i].exists) {
      snakeFood[i].exists = false;
      snakeBody[snakeBody.length] = new AddSnake(-10, -10, tmpX, tmpY); // -10 je budza da se pojavi van kanvasa kao startna pozicija
      break;
    }
  }

  //Addsnakefood if no left
  for (let i = 0; i < snakeFood.length; i++) {
    if (snakeFood[i].exists === true) {
      break;
    } else {
      snakeFoodBool = false;
    }
  }
  if (snakeFoodBool === false) {
    addSnakeFood();
    snakeFoodBool = true;
  }


  // BOUNCING of canvas
  if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
    ball.speedX = -ball.speedX;
  }

  if (ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  if (ball.y + ball.radius > height) {
    ball.spawn(200, 300);
    if (pong.lives > 0) {
      pong.lives = pong.lives - 1;
      console.log(pong.lives)
    } else if (pong.lives === 0) {
      pong.alive = false;
    }
  }


  //GRAVITY
  // ball.speedY = ball.speedY + 0.2;
  // console.log(ball.speedY)



  // Rectangle position and capping width to stay on canvas
  if (mouseX + pong.width / 2 > width) {
    pong.x = width - pong.width;
  } else if (mouseX - pong.width / 2 < 0) {
    pong.x = 0;
  } else {
    pong.x = mouseX - pong.width / 2;
  }

  // pong.x = 200;

  // ODBIJANJE OD RECTA
  if (ball.y + ball.radius >= height - pong.height && ball.x >= pong.x && ball.x <= pong.x + pong.width) {
    ball.speedY = -ball.speedY;
  }


  //ODBIJANJE OD KOCKICA
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].exists) {
      if (ball.y > squares[i].y && ball.y < squares[i].y + squares[i].size && ball.x > squares[i].x && ball.x < squares[i].x + squares[i].size) {
        ball.speedY = -ball.speedY;
        squares[i].exists = false;
        // print(squares[i].exists);
      }
    }
  }

  // Udarac zmije u kocku
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].exists) {
      if (squares[i].x < snakeBody[0].x + snakeBody[0].size &&
        squares[i].x + squares[i].size > snakeBody[0].x &&
        squares[i].y < snakeBody[0].y + snakeBody[0].size &&
        squares[i].y + squares[i].size > snakeBody[0].y) {
        snakeBody[0].dir = 'none';
        snakeBody[0].alive = false;
        snakeBody[0].speed = 0;
      }
    }
  }

  // Udarac lopte u zmiju
  for (let i = 0; i < snakeBody.length; i++) {
    if (ball.y > snakeBody[i].y && ball.y < snakeBody[i].y + snakeBody[i].size && ball.x > snakeBody[i].x && ball.x < snakeBody[i].x + snakeBody[i].size) {
      snakeBody[0].dir = 'none';
      snakeBody[0].alive = false;
      snakeBody[0].speed = 0;
      console.log('hit')
    }
  }

  if (snakeBody[0].alive === false) {
    winner.textContent = 'PONG WINS'
    winner.style.display = 'block'
  }

  if (pong.alive === false) {
    winner.textContent = 'SNAKE WINS'
    winner.style.display = 'block'
  }

}
