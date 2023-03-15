// wire frame loops
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let favor = 0;
let shapes = [];
let colours = ["green", "red", "blue", "white", "yellow"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  screenFavor();
  angleMode(DEGREES);
  for (let e=0; e<1000; e++){
    spawnSquare(width/2, height/2);
    spawnRect(width/2, height/2);
  }
}

function draw() {
  shapeDisplay();
}

function shapeDisplay() {
  for (let i=0;i<shapes.length;i++) {
    if (shapes[i].is==="square") {
      push();
      stroke(shapes[i].colour);
      fill(0,0,0, 0);
      translate(shapes[i].x, shapes[i].y);
      rotate(i);
      rect(0, 0, shapes[i].aSize, shapes[i].aSize);
      pop();
    }
    else if (shapes[i].is==="rect"){
      push();
      stroke(shapes[i].colour);
      fill(0,0,0, 0);
      translate(shapes[i].x, shapes[i].y);
      rotate(i);
      rect(0, 0, shapes[i].length, shapes[i].wideth);
      pop();
    }
  }
}

function screenFavor() {
  if (width >= height) {
    favor = width;
  }
  else {
    favor = height;
  }
}

function spawnSquare(leX, leY) {
  let newSquare = {
    is: "square",
    x: leX,
    y: leY,
    aSize: random(10, favor/3),
    colour: color(random(255), random(255), random(255)),
    rotato: random(360),
  };
  shapes.push(newSquare);
}

function spawnRect(zeX, zeY) {
  let newRect = {
    is: "rect",
    x: zeX,
    y: zeY,
    length: random(5, favor/3),
    wideth: random(25, favor/3),
    colour: color(random(255), random(255), random(255)),
  };
  shapes.push(newRect);
}

//notes
// http://dada.compart-bremen.de/item/agent/16
//https://spin.atomicobject.com/2021/12/14/generative-art-zero-random/
// do something with wire framing and looped disarray
// work with linear disarray
// search terms are nested loop circle and algorithmic art