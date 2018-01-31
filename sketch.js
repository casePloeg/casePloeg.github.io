// create an array that will contain the snowflakes
let particles = [];
// create global constant for gravity
let gravity;

let zOffset = 0;
let line_size = 20;
var canvas;

function windowResized() {
  //console.log('resized');
  resizeCanvas(document.body.clientWidth + 20, windowHeight);
}

function setup() {
  // put setup code here
  canvas = createCanvas(document.body.clientWidth + 20, windowHeight);
  document.body.style.animationInte
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  stroke(255);
  strokeWeight(5);

//    // create gravity as a vector that scales with the height of the browser window
//    gravity = createVector(0, 0.01);
//    for (let i = 0; i < 400; i ++){
//        let x = random(width);
//        let y = random(height);
//        particles.push(new Particle(x, y));
//    }
    
}

function draw() {
}