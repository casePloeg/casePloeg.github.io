function get_random_size(){
    // function to pick size in a way that smaller numbers are linearly more
    let r = pow(random(0, 1), 5);
    return constrain((r * 36), 2, 36);
//    // common than bigger numbers
//    let r = randomGaussian() * 2.5;
//    return constrain(abs(r * r), 2, 36);
//    while(true){
//        let r1 = random(1);
//        let r2 = random(1);
//        if(r2 > r1){
//            return r1 * 36;
//        }
//    }
   
}

class Snowflake {
    
    constructor(x, y, snowflake){
        // create a vector that represents the position of the snowflake
        this.img = snowflake;
        this.pos = createVector(x, y);
        // init the snowflakes velocity
        this.vel = createVector(0, 0);
        // init the snowflakes acceleration
        this.acc = createVector();
        // init the snowflake's radius
        this.r = get_random_size();
        // init the snowflake's terminal velocity in relation to it's radius
        this.terminalV = this.r;
    }
    
    applyForce(force) {
        // Parallax Effect
        let f = force.copy();
        // mutliply the force by the size (we want the obj to be faster when it appears
        // to be closer)
        f.mult(this.r);
        // given a force vector, add the given force vector to the
        // snowflake's velocity vector
        this.acc.add(f);
    }
    
    update() {
        // set the snowflakes acceleration to the gravity of the world
        // increment the snowflake's acceleration by it's accleration
        this.vel.add(this.acc);
        // limit the snowflake's velocity by it's terminal velocity
        this.vel.limit(this.terminalV);
        
        // if the velocity is less than 1 bring it back up to 1
        if(this.vel.mag() < 1) {
            this.vel.normalize();
        }
        this.pos.add(this.vel);
        this.acc.mult(0);
        
        // recycle the snowflake once it gets the bottom of the screen
        if (this.pos.y > height + this.r){
            this.randomize();
        }
    }
    
    render() {
        imageMode(CENTER);
        image(this.img, this.pos.x, this.pos.y, this.r, this.r);
    }
    
    offScreen() {
        // return true iff the snowflake is being rendered off the screen
        return (this.pos.y > height + this.r);
    }
    
    randomize() {
         // set the x position to be randomly within the screen
        let x = random(width)
        // set the y position to be randomly above the screen
        let y = random(-100, -10)
        // create a vector that represents the position of the snowflake
        this.pos = createVector(x, y);
        // init the snowflakes velocity
        this.vel = createVector(0, 0);
        // init the snowflakes acceleration
        this.acc = createVector();
        // init the snowflake's radius
        this.r = get_random_size();
        // init the snowflake's terminal velocity in relation to it's radius
        this.terminalV = this.r;
    }
}