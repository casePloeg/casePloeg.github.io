var winlen = 500;
var rect_width;
var rect_width = 5;
var time = 0;
var num_balls = 8;
var balls = [];
var show = 1;
var ball_size = 25;
var canvas;
var num_balls_slider;
var show_slider;

function setup() {
  colorMode(HSL, 2*PI, 100, 100);
  canvas = createCanvas(winlen, winlen);
  
  canvas.parent('canvas');
  console.log(canvas.parent());
  
  parent = select('#canvas');

  console.log('hi');
  num_balls_slider = createInput();
  canvas.parent('canvas');
  num_balls_slider.parent('num_ball_input');

  noStroke();
  frameRate(60);
  translate(winlen / 2, winlen / 2);

  angleMode(RADIANS)
  var r;
  var g;
  var b;
  
  for (let i = 0; i< num_balls; i++){
    balls.push(new Ball(i * PI/num_balls));
  }
  
  /*
  for(let i = -winlen / 2; i < winlen / 2; i+= rect_width) {
    for(let j = -winlen / 2; j < winlen / 2; j+= rect_width){
      [r, g, b] = cord_to_rgb3(i, j);
      var c = color(r, g, b); // Define color 'c'
      fill(c);
      stroke(c);
      rect(i, j, rect_width, rect_width);
    }
  }
  */
  num_balls_slider.changed(update_num_ball);
}

function update_num_ball() {
  num_balls = num_balls_slider.value();
  balls = []
  for (let i = 0; i< num_balls; i++){
    balls.push(new Ball(i * PI/num_balls));
  }
  show = num_balls;
}

function draw() {
  noStroke();
  background(0);
  translate(winlen/2, winlen/2);
  time += PI/50;
  for (let i=0; i<balls.length; i++){
    balls[i].update();
  }
  for (let i=0; i<show; i++){
    balls[i].render();
  }  
}

function Ball(offset) {
  this.x;
  this.y;
  this.offset = offset;
  
  this.render = function(){
    fill(cord_to_rgb3(this.x, this.y));
    ellipse(this.x, this.y, ball_size, ball_size);
  }
  
  this.update = function() {
    this.x = cos(this.offset) * map(sin(time + this.offset), -1, 1, -winlen/2, winlen/2);
    this.y = sin(this.offset) * map(sin(time + this.offset), -1, 1, -winlen/2, winlen/2);
  }
  
  this.is_max = function() {
    return sin(time + this.offset) == -1;
  }
}

function cord_to_rgb3(x, y){
  var hyp = dist(x, y, 0, 0);
  var opp = dist(y, x, 0, x);
  // console.log(hyp);
  // console.log(opp);
  if (hyp == 0) {
    // console.log('Bad');
    var angle = 0;
  } else {
    // console.log('Good');
    var angle = (asin(opp / hyp));
    if(angle == 0){
      angle = 2 * PI;
    }
  }
  // set angle 
  if (x < 0 && y < 0){
    angle = PI - angle;
  } else if (x < 0 && y == 0){
    angle = PI;
  } else if (x > 0 && y == 0){
    angle = 2 * PI;
  } else if (y > 0 && x < 0){
    angle += PI;
  } else if (y > 0 && x == 0){
    angle = 3 / 2 * PI;
  } else if (y < 0 && x == 0){
    angle = PI / 2; 
  } else if (y > 0 && x > 0){
    angle = (2 * PI) - angle; 
  }

  return [angle, 100, map((hyp / dist(0, 0, winlen /2, winlen / 2)) * 100, 0, 100, 100, 0)];
}


function cord_to_rgb(x, y){
  var p1X = 0;
  var p1Y = -winlen / 2;
  var p2X = -winlen / 2;
  var p2Y = winlen /2;
  var p3X = winlen / 2;
  var p3Y = winlen / 2;

  var r = floor(map(dist(x, y, p1X, p1Y), 0, dist(p1X, p1Y, p2X, p2Y), 255, 0));
  var g = floor(map(dist(x, y, p2X, p2Y), 0, dist(p2X, p2Y, -p2X, -p2Y), 255, 0));
  var b = floor(map(dist(x, y, p3X, p3Y), 0, dist(p3X, p3Y, -p3X, -p3Y), 255, 0));
  return [r, g, b];
}

function cord_to_rgb2(x, y){
  var hyp = dist(x, y, 0, 0);
  var opp = dist(y, x, 0, x);
  // console.log(hyp);
  // console.log(opp);
  if (hyp == 0) {
    // console.log('Bad');
    var angle = 0;
  } else {
    // console.log('Good');
    var angle = (asin(opp / hyp));
    if(angle == 0){
      angle = 2 * PI;
    }
  }
  // set angle 
  if (x < 0 && y < 0){
    angle = PI - angle;
  } else if (x < 0 && y == 0){
    angle = PI;
  } else if (x > 0 && y == 0){
    angle = 2 * PI;
  } else if (y > 0 && x < 0){
    angle += PI;
  } else if (y > 0 && x == 0){
    angle = 3 / 2 * PI;
  } else if (y < 0 && x == 0){
    angle = PI / 2; 
  } else if (y > 0 && x > 0){
    angle = (2 * PI) - angle; 
  }

  // console.log(angle);
  // color is currently mapped purely based on angle, not distance
  rgb = floor(map(angle, 0, 2 * PI, 0, 256 ** 3 - 1));
  // convert the mapped number to base 255 to fit rgb scale
  rgb = to256(rgb);
  var rgb_str = "";
  // fix the weird stuff that happens when the number isn't big enough
  while (rgb.length < 3){
    rgb.push("0");
  }
  for (let i = 0; i < 3; i++){
    // console.log('running', rgb[i]);
    while(rgb[i].length < 3){
      rgb[i] = "0" + rgb[i];
    }
  }
  for (let i = 0; i < rgb.length; i++){
    rgb_str += rgb[i];
  }
  var r = parseInt(rgb_str.slice(0, 3));
  var g = parseInt(rgb_str.slice(3, 6));
  var b = parseInt(rgb_str.slice(6, 9));
  return [r, g, b];
}



function to256(n){
  var digits = [];
  var digit_str = "";
  if (n == 0){
    digits = ["0"];
  }
  while (n > 0){
    digits.unshift(String(n % 256));
    n = floor(n / 256);
  }
  return digits;
}
