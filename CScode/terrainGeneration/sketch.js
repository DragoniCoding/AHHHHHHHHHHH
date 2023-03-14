// Terrainium
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;

let terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //rect(0, height-high, 50, high);

}

function spawnRects(){
  let time = 0;

  let high = 0;
  high = noise(time)*height;
  time += 0.07;
}

