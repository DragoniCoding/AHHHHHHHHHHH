// Array Demo
// Aidan J. Thorpe
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall(width/2, height/2);
}

function draw() {
  background(220);
  moveBalls();
  displayBalls();
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function displayBalls() {
  for (let i=0; i<shapes.length; i++) {
    fill(shapes[i].colour);
    circle(shapes[i].x, shapes[i].y, shapes[i].diam);
  }
}

function moveBalls() {
  for (let i=0; i<shapes.length; i++) {
    shapes[i].x += shapes[i].dx;
    shapes[i].y += shapes[i].dy;
  }
}

function spawnBall(tempX, tempY) {
  let newBall = {
    x: tempX,
    y: tempY,
    dx: random(-5, 5),
    dy: random(-10, 10),
    diam: random(30, 125),
    colour: color(random(255), random(255), random(255)),
  };
  shapes.push(newBall);
}
