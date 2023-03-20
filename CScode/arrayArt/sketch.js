// wire frame loops
// Aidan J. Thorpe
//  - March 20, 2023
//
// Extra for Experts:
// made the color a random selection from a curated set of colors

let favor = 0;
let shapes = []; //shape bank
let colours = ["green", "red", "blue", "white", "yellow", "lime", 
  "magenta", "cyan", "aquamarine", "chartreuse", "darkorchid", "darkseagreen",
  "snow", "thistle", "springgreen", "violet", "palegreen", "orangered",
  "lightskyblue"]; //color bank
let ring = "black";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  screenFavor();
  angleMode(DEGREES); // don't judge me, it's what I understand
  for (let e=0; e<300; e++){
    spawnSquare(width/2, height/2);
    spawnRect(width/2, height/2);
  } // filling the shape bank
  shapeDisplay();
  ringingIt();
}

function draw() {
  
}

function ringingIt() {
  flipFlop();
  for (let r=0; r<favor; r+= favor/9) {
    push();
    noFill();
    stroke("black");
    strokeWeight(3);
    circle(width/2, height/2, r);
    pop();
  }
} // Adds rings originating from the centre and spreads out at equal distances

function flipFlop(){
  if (ring === "black"){
    ring = "white";
  }
  else {
    ring = "black";
  }
} // Causes the rings to switch between black and white, pending trouble-shooting

function shapeDisplay() {
  for (let i=0;i<shapes.length;i++) {
    if (shapes[i].is==="square") {
      push();
      stroke(shapes[i].colour);
      noFill();
      translate(shapes[i].x, shapes[i].y);
      rotate(i+15);
      rect(0, 0, shapes[i].aSize, shapes[i].aSize);
      pop();
    }
    else if (shapes[i].is==="rect"){
      push();
      stroke(shapes[i].colour);
      noFill();
      translate(shapes[i].x, shapes[i].y);
      rotate(i);
      rect(0, 0, shapes[i].length, shapes[i].wideth);
      pop();
    }
  }
} // Displayes all pre-created shapes

function screenFavor() {
  if (width >= height) {
    favor = width;
  }
  else {
    favor = height;
  }
} // creates a variable that is determined by if the screen is wider or taller

function spawnSquare(leX, leY) {
  let newSquare = {
    is: "square",
    x: leX,
    y: leY,
    aSize: random(10, favor/2),
    colour: color(random(colours)),
    rotato: random(360),
  };
  shapes.push(newSquare);
} // Creates a square with a random size, rotation, and colour

function spawnRect(zeX, zeY) {
  let newRect = {
    is: "rect",
    x: zeX,
    y: zeY,
    length: random(50, favor/2),
    wideth: random(5, favor/2),
    colour: color(random(colours)),
    rotato: random(360),
  };
  shapes.push(newRect);
} // Creates a rectangle with a random length, width, rotation, and colour

//notes
// http://dada.compart-bremen.de/item/agent/16
//https://spin.atomicobject.com/2021/12/14/generative-art-zero-random/
// do something with wire framing and looped disarray
// work with linear disarray
// search terms are nested loop circle and algorithmic art
// try switching so the wire frame is only visible in the ring-strokes
