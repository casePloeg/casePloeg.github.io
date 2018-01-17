// create an array that will contain the snowflakes
let snow = [];
// create global constant for gravity
let gravity;

let zOffset = 0;

function preload(){
    snowflake = loadImage('../../assets/snowflake.png')
}
function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    preload()
    // create gravity as a vector that scales with the height of the browser window
    gravity = createVector(0, 0.01);
    for (let i = 0; i < 400; i ++){
        let x = random(width);
        let y = random(height);
        snow.push(new Snowflake(x, y, snowflake));
    }
    
}

function draw() {
    
    // put drawing code here
    background(0);
    zOffset += 0.1;
    // iterate through all the snowflakes
    for (flake of snow) {
        xOffset = flake.pos.x / width;
        yOffset = flake.pos.y / height;
        let wAngle = noise(xOffset, yOffset, zOffset) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0.001);
        
        // apply gravity to the snowflake
        flake.applyForce(gravity);
        flake.applyForce(wind);
        // update the snowflake's position
        flake.update();
        // render the snowflake to the screen
        flake.render();
    }
}