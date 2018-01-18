function setup() {
    // create a canvas with the width and height of the user's window width / height
    createCanvas(400, 400);
    // set the angle mode to degrees for easier calculations in relation to mapping time
    // values to angles
    angleMode(DEGREES);
    
    
}

function draw() {
    // set the background to black
    background(0);
    // translate the canvas so that the origin is now in the middle of the canvas
    translate(200, 200);
    
    // create variables to represent the current second, minute, and hour in seconds
    // these variables start with a 0 index, (hr is 0 - 24 * 60 * 60, etc.)
    hr = hour() % 13;
    min = (minute() * 60) + second();
    min2 = minute();
    sec = second();
    
    fill(255);
    
    // create angles
    secAngle = map(sec, 0, 60, -90, 270);
    minAngle = map(min, 0, (60 * 60), -90, 270);
    min2Angle = map(min2, 0, 60, -90, 270);
    hrAngle = map(hr, 0, 12, -90, 270);
    strokeWeight(4);
    
    // save current draw settings
    push();
    rotate(secAngle);
    stroke(0, 0, 255);
    line(0, 0, 100, 0);
    //return to previous draw settings
    pop();
    
    push();
    rotate(minAngle);
    stroke(255, 0, 0);
    line(0, 0, 75, 0);
    pop();
    
    push();
    rotate(min2Angle);
    stroke(255);
    line(0, 0, 75, 0);
    pop();
    
    push();
    rotate(hrAngle);
    stroke(0, 255, 0);
    line(0, 0, 50, 0);
    pop();
    
    stroke(255);
    point(0, 0);
    
    
    // return to saved draw settings
}