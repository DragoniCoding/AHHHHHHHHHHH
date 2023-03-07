// cubal Shake demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boxed = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}



function spawnBox(xed, yed, sizing, rotational) {
  let someBox = {
    x: xed,
    y: yed,
    size: sizing,
    rotato: rotational,
  };
  boxed.push(someBox);
}

