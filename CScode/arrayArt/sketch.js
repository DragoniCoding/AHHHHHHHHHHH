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
}

function draw() {
  shapeDisplay();
  ringingIt(10);
}

function ringingIt(thick) {
  for (let r=0; r<favor; r+= favor/9) {
    push();
    noFill();
    flipFlop();
    stroke("black");
    strokeWeight(3);
    circle(width/2, height/2, r);
    pop();
  }
}

function flipFlop(){
  if (ring === "black"){
    ring = "white";
  }
  else {
    ring = "black";
  }
}

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
    aSize: random(10, favor/2),
    colour: color(random(colours)),
    rotato: random(360),
  };
  shapes.push(newSquare);
}

function spawnRect(zeX, zeY) {
  let newRect = {
    is: "rect",
    x: zeX,
    y: zeY,
    length: random(50, favor/2),
    wideth: random(5, favor/2),
    colour: color(random(colours)),
  };
  shapes.push(newRect);
}

//notes
// http://dada.compart-bremen.de/item/agent/16
//https://spin.atomicobject.com/2021/12/14/generative-art-zero-random/
// do something with wire framing and looped disarray
// work with linear disarray
// search terms are nested loop circle and algorithmic art