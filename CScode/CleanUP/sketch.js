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
// player X and Y
let pX = 0;
let pY = 0;
// enemy X and Y
let enemyX = 1;
let enemyY = 0;
let game = 0;
let gameON = false; // sets if game is in play
// adds or removes fail condition by allowing or blocking the use of the mouse
let noLose = true; //^
// just gives the ability to erase and randomize the board at will
let creative = false; //^
let favor; 
let won;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid(ROWS, COLS);
  
  grid[pY][pX] = 9;
  grid[enemyY][enemyX] = 9;

  // sets wether to use the width or height depending on smallest
  if (width < height) { 
    favor = width;
  }
  else {
    favor = height;
  }
  cellSize = favor/ROWS;
  
  gameON = true;
}

function draw() {
  if (gameON && frameCount > 100){
    background(220);
    enemyMovement();
    displayGrid();
    if (frameCount > 1000) {
      winOrLose();
    }
  }
  else if (!gameON && game === 1) {
    textAlign(CENTER, CENTER);
    textSize(favor/13);
    if (won) {
      fill("darkred");
      text("LOST", favor/2, favor/3); 
      fill("purple");
      textSize(favor/30);
      text("Play Again?", favor/2, favor - favor/5);
    }

  }
  
}

function keyTyped() {
  if (key === "c") { //move down
    creative = !creative;
    setup();
  }
  if (creative) { // test-casing and for players who wish to mess around
    if (key === "r") {
      grid = createRandomGrid(ROWS, COLS);
      // resets player and enemy position
      pX = 0;
      pY = 0;
      enemyX = 1;
      enemyY = 0;

    }
    if (key === "e") {
      grid = createEmptyGrid(ROWS, COLS);
      // resets enemy and player position
      enemyX = 1;
      enemyY = 0;
      pX = 0;
      pY = 0;
    }
  }
  if (frameCount > 400) {
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
    if (key === " ") { //log current grid
      console.log(grid);
    }
  }
  if (key === "g" && game === 0) { // begins the game
    gameON = true;
    game = 1;
  }
}

function moveP(x, y) {
  //sanity check for edge cases
  if (pX + x >= 0 && pX + x < COLS &&
    pY + y >= 0 && pY + y < ROWS) {
  
    //check if going to clean already clean
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

function playerNeighbor() { // checks if player has any paths
  let neighbors = 0;
  //sanity check for edges
  for (let i = 0; i<9; i++) {
    if (pX - 1 >= 0) {
      if (grid[pY][pX - 1] === 1) {
        neighbors++;
      }
    } 
    if (pX + 1 < COLS) {
      if (grid[pY][pX + 1] === 1) {
        neighbors++;
      }
    } 
    if (pY - 1 >= 0) {
      if (grid[pY - 1][pX] === 1) {
        neighbors++;
      }
    } 
    if (pY + 1 < ROWS) {
      if (grid[pY + 1][pX] === 1) {
        neighbors++;
      }
    }
  }
  return neighbors;
}

function moveEnemy(x, y) {
  //sanity check for edge cases
  if (enemyX + x >= 0 && enemyX + x < COLS &&
    enemyY + y >= 0 && enemyY + y < ROWS) {
  
    //check if going to hit trash
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

function enemyMovement() {
  // has the enemy randomly move every quarter-second
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

function winOrLose(){
  if (playerNeighbor() === 0 && !noLose) {
    gameON = false;
  }
  else if (gameON) {
    console.log();
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  if (noLose) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }

    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }

}

function mouseDragged() { // allows laggy draw function
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  if (grid[y][x] === 0 && frameCount % dragSpeed === 0) {
    grid[y][x] = 1;
  }

  else if (grid[y][x] === 1 && frameCount % dragSpeed === 0) {
    grid[y][x] = 0;
  }
}

function mouseClicked() {

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
