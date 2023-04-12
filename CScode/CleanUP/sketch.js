// Baby Clean Up game
// Aidan J. Thorpe
// March 24, 2023 - April 11, 2023

// Extra for Experts:
//  ¯\_(ツ)_/¯

// controls
// pressing l toggles if there are lose conditions
// if loss conditions are removed, use of mouse to switch cells on and off is permitted
// WASD movement of player... and that's kinda it for casual playing
// if you want to mess around
// pressing c toggles if you can change the board
// r to randomize the board, e to empty the board
// and pressing space console logs the current grid,,, or at least it's supposed to
// If I'm being honest, it's missing a lot, but I'm tired and sick and my head hurts, so I AM DONE

let grid;

const ROWS = 25;
const COLS = 25;
// ammount of time between each cell change for drag function
let dragSpeed = 9; //^
let cellSize;
let pX;
let pY;
let enemyX;
let enemyY;
let game = 0; //counts if it's the first time playing
let gameON = false; // sets if game is in play
// adds or removes fail condition by allowing or blocking the use of the mouse
let noLose = false; //^
// just gives the ability to erase and randomize the board at will
let creative = false; //^
let favor;
// determine's if the game ended in a win or if it ended in a lost
let won; //^

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid(ROWS, COLS);
  // player X and Y
  pX = 0;
  pY = 0;
  // enemy X and Y
  enemyX = 1;
  enemyY = 0;
  grid[pY][pX] = 9;
  grid[enemyY][enemyX] = 5;

  // sets wether to use the width or height depending on which is smallest
  if (width < height) {
    favor = width;
  } else {
    favor = height;
  }
  cellSize = favor / ROWS;
}

function draw() {
  if (game === 0) {
    background(135);
    textAlign(CENTER, CENTER);
    textSize(favor / 13);
    fill("lime");
    text("Clean Up after the Baby", favor / 2, favor / 3);
    fill("skyblue");
    textSize(favor / 30);
    text("Press g to Play", favor / 2, favor - favor / 5);
  }

  if (gameON) {
    background(220);
    enemyMovement();
    displayGrid();
    winOrLose();
  } else if (!gameON && game === 1) {
    background(135);
    textAlign(CENTER, CENTER);
    textSize(favor / 13);
    if (!won) {
      fill("darkred");
      text("LOST", favor / 2, favor / 3);
      fill("purple");
      textSize(favor / 20);
      text("Play Again?", favor / 2, favor - favor / 4);
      textSize(favor / 30);
      text("Press g to Play", favor / 2, favor - favor / 5);
    } else if (won) {
      fill("green");
      text("You Won!", favor / 2, favor / 3);
      fill("purple");
      textSize(favor / 20);
      text("Play Again?", favor / 2, favor - favor / 4);
      textSize(favor / 30);
      text("Press g to Play", favor / 2, favor - favor / 5);
    }
  }
}

function keyTyped() {
  if (key === "l") {
    noLose = !noLose;
  }
  
  if (key === "c") {
    //toggles use of grid manipulation
    creative = !creative;
    setup();
  }
  if (creative) {
    // test-casing and for players who wish to mess around
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
  if (frameCount > 100) {
    if (key === "s") {
      //move down
      moveP(0, 1);
    }
    if (key === "w") {
      //move up
      moveP(0, -1);
    }
    if (key === "d") {
      //move right
      moveP(1, 0);
    }
    if (key === "a") {
      //move left
      moveP(-1, 0);
    }
    if (key === " ") {
      //log current grid
      console.log(grid);
    }
  }
  if (key === "g" && !gameON) {
    // begins or restarts the game
    gameON = true;
    game = 1;
    won = "";
  }
}

function moveP(x, y) {
  // Player movement Process
  //sanity check for edge cases
  if (pX + x >= 0 && pX + x < COLS && pY + y >= 0 && pY + y < ROWS) {
    //check if going to clean already clean
    if (grid[pY + y][pX + x] === 1) {
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

function playerNeighbor() {
  // checks if player has any paths
  let neighbors = 0;
  //sanity check for edges
  for (let i = 0; i < 9; i++) {
    if (pX - 1 >= 0) {
      if (grid[pY][pX - 1] != 0) {
        neighbors++;
      }
    }
    if (pX + 1 < COLS) {
      if (grid[pY][pX + 1] != 0) {
        neighbors++;
      }
    }
    if (pY - 1 >= 0) {
      if (grid[pY - 1][pX] != 0) {
        neighbors++;
      }
    }
    if (pY + 1 < ROWS) {
      if (grid[pY + 1][pX] != 0) {
        neighbors++;
      }
    }
  }
  return neighbors;
}

function moveEnemy(x, y) {
  //enemy movement process
  
  //sanity check for edge cases
  if (
    enemyX + x >= 0 &&
    enemyX + x < COLS &&
    enemyY + y >= 0 &&
    enemyY + y < ROWS
  ) {
    //check if going to hit trash
    if (grid[enemyY + y][enemyX + x] === 0) {
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
    if (rand <= 25) {
      //move down if less than 25
      moveEnemy(0, 1);
    } else if (rand <= 50) {
      //move up if less than 50
      moveEnemy(0, -1);
    } else if (rand <= 75) {
      //move right if less than 75
      moveEnemy(1, 0);
    } else if (rand <= 100) {
      //move left if less than 100
      moveEnemy(-1, 0);
    }
  }
}

function winOrLose() {
  // sets win and lose conditions
  let player = Math.floor(pX + pY);
  let enemy = Math.floor(enemyX + enemyY);
  if ((player === enemy - 1 || player === enemy + 1) && frameCount > 1000) {
    frameCount = 0;
    setup();
    gameON = false;
    won = true;
  } else if (playerNeighbor() === 0 && !noLose && frameCount > 500) {
    frameCount = 0;
    setup();
    gameON = false;
    won = false;
    console.log(game);
  }

}

function mousePressed() {
  // changes the color of the box the mouse is currently hovering over
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  if (noLose) {
    // changes if the mouse does anything
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    } else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function mouseDragged() {
  // allows laggy draw function
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  if (noLose) {
    if (grid[y][x] === 0 && frameCount % dragSpeed === 0) {
      grid[y][x] = 1;
    } else if (grid[y][x] === 1 && frameCount % dragSpeed === 0) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  // goes through the grid and draws boxes filled with the corresponding color
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      } else if (grid[y][x] === 0) {
        fill("white");
      } else if (grid[y][x] === 9) {
        fill("green");
      } else if (grid[y][x] === 5) {
        fill("red");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function createEmptyGrid(ROWS, COLS) {
  // creates empty grid
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
  // creates random grid
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      if (random(100) < 50) {
        newGrid[y].push(1);
      } else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}
