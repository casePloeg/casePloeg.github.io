function get_random_size(){
    // function to pick size in a way that smaller numbers are linearly more
    let r = pow(random(0, 1), 4);
    return constrain((r * 32), 2, 32);
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
        this.angle = random(TWO_PI);
        this.xOff = 0;
        // if random is greater than 0.5 dirction is 1 otherwise -1
        this.dir = random(1) > 0.5 ? 1 : -1;
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
        this.xOff = sin(this.angle * 2) * this.r * 2
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
        
        
    }
    
    render() {
        push();
        translate(this.pos.x + this.xOff, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r, this.r);
        pop();
        
        if(this.offScreen()){
            this.randomize();
        }
        
        //wrapping left and right
        if(this.pos.x < -this.r){
            this.pos.x = width + this.r
        }
        if(this.pos.x > width + this.r){
            this.pos.x = -this.r
        }
        
        
        this.angle += this.dir * (this.vel.mag() / 200)
    }
    
    offScreen() {
        // return true iff the snowflake is being rendered off the screen
        return (this.pos.y > height + this.r);
    }
    
    randomize() {
        let x = random(0, width);
        let y = random(-10, -100);
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
        this.angle = random(TWO_PI);
        this.xOff = 0;
        // if random is greater than 0.5 dirction is 1 otherwise -1
        this.dir = random(1) > 0.5 ? 1 : -1;
    }
}