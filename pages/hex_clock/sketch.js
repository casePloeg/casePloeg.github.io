function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
    textSize(50);
    strokeWeight(1);
    stroke(255);
    fill(255);
}

function draw() {
    hr = hour()
    // add a zero to the front of the number if it is less than 10
    if(hr < 10){
        hr = '0' + String(hr)
    }
    min = minute()
    // add a zero to the front of the number if it is less than 10
     if(min < 10){
        min = '0' + String(min)
    }
    sec = second()
    // add a zero to the front of the number if it is less than 10
     if(sec < 10){
        sec = '0' + String(sec)
    }
    // convert the hour, minute, and second values to represent a hexidecimal number
    hex = (String(hr) + String(min) + String(sec));
    // set the background of the canvas to the hexidecimal number generated by the
    // current time
    background(('#' + hex ));
    
    // draw the hexidecimal as text
    text('#' + hex, (width/2 - 100), height/2);
    
  // put drawing code here
}