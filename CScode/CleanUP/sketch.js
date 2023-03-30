// Baby Clean Up game
// Aidan J. Thorpe
// March 24, 2023 - April 6, 2023

// Extra for Experts:
//  ¯\_(ツ)_/¯

let grid;

const ROWS = 25;
const COLS = 25;
let dragSpeed = 9;
let cellSize;
let pX = 0;
let pY = 0;
let enemyX = 1;
let enemyY = 0;
let gameON = false; // sets if game is in play
let noLose = true;
let creative = false;
let favor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid(ROWS, COLS);
  
  grid[pY][pX] = 9;
  
  if (width < height) {
    favor = width;
  }
  else {
    favor = height;
  }
  cellSize = favor/ROWS;

  fill("green");
  textAlign(CENTER, CENTER);
  textSize(favor/5);
  text("annnnnnyaaa", favor/12, favor/12);
  
  gameON = true;
}

function draw() {
  if (gameON){
    background(220);
    enemyMove();
    displayGrid();
  }
  
}

function keyTyped() {
  if (creative) {
    if (key === "r") {
      grid = createRandomGrid(ROWS, COLS);
    }
    if (key === "e") {
      grid = createEmptyGrid(ROWS, COLS);
    }
  }
  if (key === "s") { //move down
    moveP(0, 1);
  }
  if (key === "w") { //move up
    moveP(0, -1);
  }
  if (key === "d") { //move right
    moveP(1, 0);
  }
  if (key === "a") { //move left
    moveP(-1, 0);
  }
  if (key === " ") { //log mouse position
    console.log(mouseX, mouseY);
  }
}

function moveP(x, y) {
  //sanity check for edge cases
  if (pX + x >= 0 && pX + x < COLS &&
    pY + y >= 0 && pY + y < ROWS) {
  
    //check if going to hit wall
    if (grid[pY+y][pX+x] === 1) {
      let tempX = pX;
      let tempY = pY;
  
      pX += x;
      pY += y;
  
      //update grid
      grid[pY][pX] = 9;
      grid[tempY][tempX] = 0;
    }
  }
}

function moveEnemy(x, y) {
  //sanity check for edge cases
  if (enemyX + x >= 0 && enemyX + x < COLS &&
    enemyY + y >= 0 && enemyY + y < ROWS) {
  
    //check if going to hit wall
    if (grid[enemyY+y][enemyX+x] === 0) {
      let tempX = enemyX;
      let tempY = enemyY;
  
      enemyX += x;
      enemyY += y;
  
      //update grid
      grid[enemyY][enemyX] = 5;
      grid[tempY][tempX] = 1;
    }
  }
}

function enemyMove() {
  let rand = random(100);
  if (frameCount % 15 === 0) {
    if (rand <= 25) { //move down if less than 25
      moveEnemy(0, 1);
    }
    else if (rand <= 50) { //move up if less than 50
      moveEnemy(0, -1);
    }
    else if (rand <= 75) { //move right if less than 75
      moveEnemy(1, 0);
    }
    else if (rand <= 100) { //move left if less than 100
      moveEnemy(-1, 0);
    }  
  }

}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }

  else if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
}

function mouseDragged() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  if (grid[y][x] === 0 && frameCount % dragSpeed === 0) {
    grid[y][x] = 1;
  }

  else if (grid[y][x] === 1 && frameCount % dragSpeed === 0) {
    grid[y][x] = 0;
  }
}


function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 9) {
        fill("green");
      }
      else if (grid[y][x] === 5) {
        fill("red");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function createEmptyGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function createRandomGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}