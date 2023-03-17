// Erratic Bubbles
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theMass = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBubble();
}

function draw() {
  background(220);
}

function spawnBubble(){
  let bubble = {
    x: random(),
    y: random(),
    size: random(),
    colour: random(),
    time: 0,
  };
  theMass.push(bubble);
}