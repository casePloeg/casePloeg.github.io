function make2DArray(cols, rows){
    // function to create an empty 2D array given the number of rows and
    // columns the array has
    let array_2d = new Array(cols);
    for (let i = 0; i < array_2d.length; i++){
        array_2d[i] = new Array(rows);
    }
    // return the 2D array that is created
    return array_2d
}

let grid;
let cols;
let rows;
let resolution = 10;
let ant;
let ant_y;
let ant_x;
let ant_dir = 0;

function setup() {
  // put setup code here
    frameRate(15);
    createCanvas(400, 400);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2DArray(cols, rows);
    // fill the grid with a random value that is either 1 or 0
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++){
            grid[i][j] = 1;
        }
    }
    // pick an element to represent the ant
    ant = floor(random(((width/ resolution) * (height/ resolution))));
    // calculate ant x and y coords
    ant_y = floor( ant / (height / resolution));
    ant_x = ant - (ant_y * (height/resolution));
}

function draw() {
  // put drawing code here
    background(0);
    if(grid[ant_y][ant_x] == 1){
        grid[ant_y][ant_x] = 0;
        turn_right();
    } else{
        grid[ant_y][ant_x] = 1;
        turn_left();
    }
    move_ant();
    // put drawing code here
    // iterate through all elements
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++){
            // use resolution - 1 to get 
            let x = i * resolution; 
            let y = j * resolution;
            if(grid[i][j] == 0){
                fill(0);
                rect(x,y,resolution,resolution);
            } else{
                fill(255);
                rect(x,y,resolution,resolution);
            }
        }
    }
}

function turn_right(){
    // function to make the ant turn right
    ant_dir += 1;
    // keep the direction with 0 - 3
    if(ant_dir > 3){
        ant_dir = 0;
    }
}

function turn_left(){
    ant_dir -= 1;
    // keep the direction with 0 - 3
    if(ant_dir < 0){
        ant_dir = 3;
    }
}

function move_ant(){
    //
    if(ant_dir == 0){
        ant_y -= 1;
    } else if(ant_dir == 1){
        ant_x += 1;
    } else if(ant_dir == 2){
        ant_y += 1;
    } else if(ant_dir == 3){
        ant_x -= 1;
    }
    
    // make the ant map to the other side of the screen if it goes off the edge
    if(ant_x > ((width / resolution) - 1)){
        ant_x = 0;
    } else if(ant_x < 0){
        ant_x = ((width / resolution) - 1);
    }
    if (ant_y > ((height / resolution) -1)){
        ant_y = 0;
    } else if (ant_y < 0){
        ant_y = ((height / resolution) -1);
    }
}