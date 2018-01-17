// create an array that will contain the snowflakes
let snow = [];
// create global constant for gravity
let gravity;


function preload(){
    snowflake = loadImage('../../assets/snowflake.png')
}
function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    preload()
    // create gravity as a vector that scales with the height of the browser window
    gravity = createVector(0, windowHeight * 0.00001);
    for (let i = 0; i < 300; i ++){
        let x = random(width);
        let y = random(height);
        snow.push(new Snowflake(x, y, snowflake));
    }
    
}

function draw() {
    
    // put drawing code here
    background(0);
    // add a new snowflake to the screen
    // snow.push(new Snowflake());
    // iterate through all the snowflakes
    for (flake of snow) {
        // apply gravity to the snowflake
        flake.applyForce(gravity);
        // update the snowflake's position
        flake.update();
        // render the snowflake to the screen
        flake.render();
    }
    
    // iterate through the snowflakes (backwards) to prevent
    // issues with indexing
//    for (let i = snow.length-1; i > -1; i--) {
//        // if the current snowflake is off screen
//        if(snow[i].offScreen()) {
//            // remove the snowflake from the array
//            snow.splice(i, 1);
//        }
//    }
}