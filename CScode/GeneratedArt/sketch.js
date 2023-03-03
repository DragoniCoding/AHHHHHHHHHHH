// Tile COM Art
// Aidan J. Thorpe
// Mar/03/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rows;
let colmns;
let spacing;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  lineNest(55, 55);
}

function draw() {

}

function diagonLine(x, y, spacing) {
  if (random(100) > 50) {
    line(x-spacing/2, y + spacing/2, x +spacing/2, y-spacing/2);
  }
  else {
    line(x+spacing/2, y + spacing/2, x -spacing/2, y-spacing/2);
  }
  
}

function lineNest(rows, colmns) {
  let paces = colmns/rows;
  for(let x=0; x<width; x++) {
    for(let y=0; y<height; y++) {
      diagonLine(x*paces, y*paces, paces);
    }
  }
}


