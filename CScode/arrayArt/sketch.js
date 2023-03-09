// wire frame loops
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let favor = 0;
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  screenFavor();
}

function draw() {

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
    x: leX,
    y: leY,
    aSize: random(10, favor/3),
  };
  shapes.push(newSquare);
}

function spawnRect(zeX, zeY) {
  let newRect = {
    is: "square",
    x: zeX,
    y: zeY,
    length: random(5, favor/3),
    wideth: random(25, favor/3),
  };
  shapes.push(newRect);
}

//notes
// http://dada.compart-bremen.de/item/agent/16
//https://spin.atomicobject.com/2021/12/14/generative-art-zero-random/
// do something with wire framing and looped disarray
// work with linear disarray
// search terms are nested loop circle and algorithmic art