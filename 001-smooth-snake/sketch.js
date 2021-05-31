const BALLS = [];

const COLLISIONS = {
  ballPong: function ({ ball, pong }) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    if (ball.y + ball.radius >= height - pong.height && ball.x >= pong.x && ball.x <= pong.x + pong.width) {
      ball.bounceY();
    }
  },
  ballFellThrough: function ({ ball, pong }) {
    //propadanje lopte
    if (ball.y + ball.radius > height) {
      ball.spawn(200, 300);
      ball.dies(pong);
    }
  },
  ballSquare: function (ball) {
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
  },
  canvasBounce: function (ball) {
    // BOUNCING of canvas
    if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
      ball.speedX = -ball.speedX;
    }

    if (ball.y - ball.radius < 0) {
      ball.speedY = -ball.speedY;
    };
  },
  snakeSquare: function (snake, squares = []) {
    // Udarac zmije u kocku
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].exists) {
        if (squares[i].x < SNAKE_BODY[0].x + SNAKE_BODY[0].size &&
          squares[i].x + squares[i].size > SNAKE_BODY[0].x &&
          squares[i].y < SNAKE_BODY[0].y + SNAKE_BODY[0].size &&
          squares[i].y + squares[i].size > SNAKE_BODY[0].y) {
          SNAKE_BODY[0].dir = 'none';
          SNAKE_BODY[0].alive = false;
          SNAKE_BODY[0].speed = 0;
        }
      }
    }
  },
  snakeBall: function (snake, ball) {
    // Udarac lopte u zmiju
    for (let i = 0; i < SNAKE_BODY.length; i++) {
      if (BALLS[0].y > SNAKE_BODY[i].y && BALLS[0].y < SNAKE_BODY[i].y + SNAKE_BODY[i].size && BALLS[0].x > SNAKE_BODY[i].x && BALLS[0].x < SNAKE_BODY[i].x + SNAKE_BODY[i].size) {
        SNAKE_BODY[0].dir = 'none';
        SNAKE_BODY[0].alive = false;
        SNAKE_BODY[0].speed = 0;
        console.log('hit')
      }
    }
  }
};

function createBall() {
  const ball = {
    x: 100,
    y: 100,
    radius: 10,
    speedX: 3,
    speedY: 3,
    spawn: function (newX, newY) {
      this.x = newX;
      this.y = newY;
    },
    dies: function (pong) {
      if (pong.lives > 0) {
        pong.lives = pong.lives - 1;
        console.log(pong.lives)
      } else if (pong.lives === 0) {
        pong.alive = false;
      }
    },
    bounceY: function () {
      this.speedY = -this.speedY;
    },
    display: function () {
      //BALL creation
      noStroke();
      fill(255);
      circle(this.x, this.y, this.radius);
    },
    update: function (pong, squares) {
      //Kretanje lopte
      this.x = this.x + this.speedX;
      this.y = this.y + this.speedY;
      // BOUNCING of canvas
      if (this.x + this.radius > width || this.x - this.radius < 0) {
        this.speedX = -this.speedX;
      }

      if (this.y - this.radius < 0) {
        this.speedY = -this.speedY;
      };
      // if (this.y + this.radius > height) {
      //   this.spawn(200, 300);
      //   if (pong.lives > 0) {
      //     pong.lives = pong.lives - 1;
      //     console.log(pong.lives)
      //   } else if (pong.lives === 0) {
      //     pong.alive = false;
      //   }
      // };
      // ODBIJANJE OD PONG
      // if (this.y + this.radius >= height - pong.height && this.x >= pong.x && this.x <= pong.x + pong.width) {
      //   this.speedY = -this.speedY;
      // }


      // //ODBIJANJE OD KOCKICA
      // for (let i = 0; i < squares.length; i++) {
      //   if (squares[i].exists) {
      //     if (this.y > squares[i].y && this.y < squares[i].y + squares[i].size && this.x > squares[i].x && this.x < squares[i].x + squares[i].size) {
      //       this.speedY = -this.speedY;
      //       squares[i].exists = false;
      //       // print(squares[i].exists);
      //     }
      //   }
      // }
    },
    tick: function (pong, squares) {
      this.update(pong, squares);
      this.display();
    }
  }
  return ball;
}

BALLS[0] = new createBall;


const SNAKE_BODY = [];


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
SNAKE_BODY[0] = {
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


const PONG = {
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
  SNAKE_BODY[i] = new AddSnake(startCoordinateX, startCoordinateY, tmpX, tmpY);
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


function setup() {
  let canvas = createCanvas(500, 800);
  canvas.parent('sketch-container');

  BALLS.push(createBall());

  // background(0);
  // noStroke();
  // fill(255);
  // circle(200, 200, 255);

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
  if (SNAKE_BODY[0].alive === true) {
    if (keyCode === RIGHT_ARROW) {
      // SNAKE_BODY[0].moveRight();
      if (SNAKE_BODY[0].dir !== "l") {
        SNAKE_BODY[0].dir = "r";
      }
    }
    if (keyCode === LEFT_ARROW) {
      // SNAKE_BODY[0].moveLeft();
      if (SNAKE_BODY[0].dir !== "r") {
        SNAKE_BODY[0].dir = "l";
      }
    }
    if (keyCode === UP_ARROW) {
      // SNAKE_BODY[0].moveUp();
      if (SNAKE_BODY[0].dir !== "d") {
        SNAKE_BODY[0].dir = "u";
      }
    }
    if (keyCode === DOWN_ARROW) {
      // SNAKE_BODY[0].moveDown();
      if (SNAKE_BODY[0].dir !== "u") {
        SNAKE_BODY[0].dir = "d";
      }
    }
  }
}

//If food exists
let snakeFoodBool = true;

function gameRunning(pong, snake_body) {
  return pong.alive === true && snake_body[0].alive === true;
}

function draw() {
  background(0);

  BALLS.forEach((ball) => {
    ball.tick(PONG);
  })

  const objects = {
    ball: BALLS[0],
    snake: SNAKE_BODY[0],
    pong: PONG
  };

  // objects.forEach((obj) => {
  //   obj.tick();
  // })

  //Uradi collisione ako postoje
  Object.keys(COLLISIONS).forEach((collisionName) => { //Uradi funkciju u colluion nizu evenata
    COLLISIONS[collisionName](objects);
  })

  // Kretanje lopte
  // if (gameRunning(PONG, SNAKE_BODY)) { //OSTATAK ZMIJE NIJE HITTABLE ZATO STO OVDE RADI SAMO SNAKE_BODY[0]
  //   ball.x = ball.x + ball.speedX;
  //   ball.y = ball.y + ball.speedY;
  // }

  //PONG creation
  if (PONG.alive === true) {
    noStroke();
    fill(255);
    rect(PONG.x, PONG.y, PONG.width, 10);
  } else {
    if (frameCount % 5 === 0) {
      noStroke();
      fill(255);
      rect(PONG.x, PONG.y, PONG.width, 10);
    }
  }

  // refreshSnakeFood();

  // Prikazi zmiju
  if (SNAKE_BODY[0].alive === true) {
    for (let i = 0; i < SNAKE_BODY.length; i++) {
      SNAKE_BODY[i].display();
    }
  } else {
    if (frameCount % 5 === 0) {
      for (let i = 0; i < SNAKE_BODY.length; i++) {
        SNAKE_BODY[i].display();
      }
    }
  }
  // SNAKE_BODY[0].x = SNAKE_BODY[0].x + 2;

  // Prikazi kocke
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

  for (let i = SNAKE_BODY.length - 1; i > 0; i--) { //SNAKE_BODY.length - 1 = 4
    if (SNAKE_BODY[0].alive === true) {
      if (i === 1) {
        SNAKE_BODY[i].tmpX = SNAKE_BODY[i - 1].x;
        SNAKE_BODY[i].tmpY = SNAKE_BODY[i - 1].y;
        SNAKE_BODY[i].x = SNAKE_BODY[i - 1].x;
        SNAKE_BODY[i].y = SNAKE_BODY[i - 1].y;
      } else {
        SNAKE_BODY[i].tmpX = SNAKE_BODY[i - 1].x;
        SNAKE_BODY[i].tmpY = SNAKE_BODY[i - 1].y;
        SNAKE_BODY[i].x = SNAKE_BODY[i - 1].tmpX;
        SNAKE_BODY[i].y = SNAKE_BODY[i - 1].tmpY;
      }
    }
  }

  // snakeMove();

  if (gameRunning(PONG, SNAKE_BODY)) {
    // SNAKE MOVING(CHANGING DIRECTION)
    switch (SNAKE_BODY[0].dir) {
      case 'r':
        SNAKE_BODY[0].x = SNAKE_BODY[0].x + 3;
        // if (SNAKE_BODY[0].x < 0) {
        //   SNAKE_BODY[0].x = width;
        // }
        break;
      case 'l':
        SNAKE_BODY[0].x = SNAKE_BODY[0].x - 3;
        break;
      case 'u':
        SNAKE_BODY[0].y = SNAKE_BODY[0].y - 3;
        break;
      case 'd':
        SNAKE_BODY[0].y = SNAKE_BODY[0].y + 3;
        break;
      default:
    }
  }


  // Jedenje
  for (let i = 0; i < snakeFood.length; i++) {
    if (snakeFood[i].x < SNAKE_BODY[0].x + SNAKE_BODY[0].size &&
      snakeFood[i].x + snakeFood[i].size > SNAKE_BODY[0].x &&
      snakeFood[i].y < SNAKE_BODY[0].y + SNAKE_BODY[0].size &&
      snakeFood[i].y + snakeFood[i].size > SNAKE_BODY[0].y &&
      snakeFood[i].exists) {
      snakeFood[i].exists = false;
      SNAKE_BODY[SNAKE_BODY.length] = new AddSnake(-10, -10, tmpX, tmpY); // -10 je budza da se pojavi van kanvasa kao startna pozicija
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
  // if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
  //   ball.speedX = -ball.speedX;
  // }

  // if (ball.y - ball.radius < 0) {
  //   ball.speedY = -ball.speedY;
  // }

  // kada PONG izgubi zivot //entity component system //
  // if (ball.y + ball.radius > height) {
  //   ball.spawn(200, 300);
  //   if (PONG.lives > 0) {
  //     PONG.lives = PONG.lives - 1;
  //     console.log(PONG.lives)
  //   } else if (PONG.lives === 0) {
  //     PONG.alive = false;
  //   }
  // }


  //GRAVITY
  // ball.speedY = ball.speedY + 0.2;
  // console.log(ball.speedY)



  // Rectangle position and capping width to stay on canvas
  if (mouseX + PONG.width / 2 > width) {
    PONG.x = width - PONG.width;
  } else if (mouseX - PONG.width / 2 < 0) {
    PONG.x = 0;
  } else {
    PONG.x = mouseX - PONG.width / 2;
  }

  // PONG.x = 200;

  // // ODBIJANJE OD PONG
  // if (ball.y + ball.radius >= height - PONG.height && ball.x >= PONG.x && ball.x <= PONG.x + PONG.width) {
  //   ball.speedY = -ball.speedY;
  // }


  // //ODBIJANJE OD KOCKICA
  // for (let i = 0; i < squares.length; i++) {
  //   if (squares[i].exists) {
  //     if (ball.y > squares[i].y && ball.y < squares[i].y + squares[i].size && ball.x > squares[i].x && ball.x < squares[i].x + squares[i].size) {
  //       ball.speedY = -ball.speedY;
  //       squares[i].exists = false;
  //       // print(squares[i].exists);
  //     }
  //   }
  // }

  // Udarac zmije u kocku
  // for (let i = 0; i < squares.length; i++) {
  //   if (squares[i].exists) {
  //     if (squares[i].x < SNAKE_BODY[0].x + SNAKE_BODY[0].size &&
  //       squares[i].x + squares[i].size > SNAKE_BODY[0].x &&
  //       squares[i].y < SNAKE_BODY[0].y + SNAKE_BODY[0].size &&
  //       squares[i].y + squares[i].size > SNAKE_BODY[0].y) {
  //       SNAKE_BODY[0].dir = 'none';
  //       SNAKE_BODY[0].alive = false;
  //       SNAKE_BODY[0].speed = 0;
  //     }
  //   }
  // }

  // // Udarac lopte u zmiju
  // for (let i = 0; i < SNAKE_BODY.length; i++) {
  //   if (ball.y > SNAKE_BODY[i].y && ball.y < SNAKE_BODY[i].y + SNAKE_BODY[i].size && ball.x > SNAKE_BODY[i].x && ball.x < SNAKE_BODY[i].x + SNAKE_BODY[i].size) {
  //     SNAKE_BODY[0].dir = 'none';
  //     SNAKE_BODY[0].alive = false;
  //     SNAKE_BODY[0].speed = 0;
  //     console.log('hit')
  //   }
  // }

  if (SNAKE_BODY[0].alive === false) {
    winner.textContent = 'PONG WINS'
    winner.style.display = 'block'
  }

  if (PONG.alive === false) {
    winner.textContent = 'SNAKE WINS'
    winner.style.display = 'block'
  }

}
