function setup() {
    // create a canvas with the width and height of the user's window width / height
    createCanvas(400, 400);
}

function draw() {
    // set the background to black
    background(0);
    // create variables to represent the current second, minute, and hour
    // these variables start with a 0 index, (hr is 0 - 23, etc.)
    hr = hour();
    min = minute();
    sec = second();
}