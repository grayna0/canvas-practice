const canvas = document.getElementById("canvas");
const scoreText = document.getElementsByClassName("score");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const bricks = [];
const BRICKS_ROW = 5;
const BRICKS_COLS = 23;
const brickHeight = 20;
const brickWidth = 70;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;
let lives = 3;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 0;
let dy = 0;
let started = true;
const paddle = {
  w: 200,
  h: 20,
};
let paddleX = (canvas.width - paddle.w) / 2;
let rightPressed = false;
let leftPressed = false;

//  bricks logic
for (let i = 0; i < BRICKS_ROW; i++) {
  bricks[i] = [];
  for (let j = 0; j < BRICKS_COLS; j++) {
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "Right") {
    rightPressed = true; /* paddle move right */
  }
  if (event.key === "ArrowLeft" || event.key === "Left") {
    leftPressed = true; /* paddle move left */
  }
  if (started && event.key === " ") {
    started = false;
    dx = Math.random() * 3;
    dy = -7;
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight" || event.key === "Right") {
    rightPressed = false;
  }
  if (event.key === "ArrowLeft" || event.key === "Left") {
    leftPressed = false;
  }
});
// draw Paddle
const drawPaddle = () => {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.fillRect(paddleX, canvas.height - paddle.h, paddle.w, paddle.h);
  ctx.fill();
  ctx.closePath();
};
const updatedPaddle = () => {
  if (rightPressed && paddleX < canvas.width - paddle.w) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
};
const updateBall = () => {
  if (x + dx >= canvas.width - 20 || x + dx <= 20) {
    dx = -dx;
  }
  if (y + dy <= 20) {
    dy = -dy;
  } else if (y + dy >= canvas.height - 30) {
    if (x >= paddleX && x <= paddleX + paddle.w) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("gamne over");
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 0;
        dy = 0;
        paddleX = (canvas.width - paddle.w) / 2;
      }
    }
  }
  x += dx;
  y += dy;
};

const drawBricks = () => {
  for (let i = 0; i < BRICKS_ROW; i++) {
    for (let j = 0; j < BRICKS_COLS; j++) {
      if (bricks[i][j].status === 1) {
        const brickX = j * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = i * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.fillRect(this.x, this.y, 100, 20);
};

const drawBall = () => {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fill();
};

const collisionDetection = () => {
  for (let i = 0; i < BRICKS_ROW; i++) {
    for (let j = 0; j < BRICKS_COLS; j++) {
      checkCollision = bricks[i][j];
      if (checkCollision.status == 1) {
        if (
          y < checkCollision.y + brickHeight +30 &&
          y > checkCollision.y &&
          x > checkCollision.x -30 &&
          x < checkCollision.x + brickWidth  +30
        ) {
          if (  y < checkCollision.y + brickHeight +30 &&
              y > checkCollision.y -30 ) {
                dx = -dx;
                dy = -dy;
          }else{

            dy = -dy;
          }
          
          scoreText[0].innerHTML = score++;
          checkCollision.status = 0;
        }
      }
    }
  }
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.02";
  drawBall();
  drawPaddle();
  updatedPaddle();
  updateBall();
  drawBricks();
  collisionDetection();
  requestAnimationFrame(animate);
};
animate();
