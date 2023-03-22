// Project Title
// Your Name
// March 21, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 15;
const COLS = 15;
let grid;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandom2dArray(ROWS, COLS);

  //fill the largest square area possible...
  if (width < height) {
    cellSize = width/COLS;
  }
  else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid(grid);
}

function keyTyped() {
  if (key === "r") {
    grid = createRandom2dArray(ROWS, COLS);
  }
  else if (key === "e") {
    grid = createEmpty2dArray(ROWS, COLS);
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
//  toggleCell(x+1, y); //E
//  toggleCell(x-1, y); //W
//  toggleCell(x, y-1); //N
//  toggleCell(x, y+1); //S
}

function toggleCell(x, y) {
  //sanity check
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid(grid) {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 0) {
        fill("orange");
      }
      if (grid[y][x] === 1) {
        fill("blue");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createEmpty2dArray(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function createRandom2dArray(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      if (random(100) > 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }

    }
  }
  return newGrid;
}