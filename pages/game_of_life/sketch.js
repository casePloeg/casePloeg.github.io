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
let resolution = 25;

function setup() {
  // put setup code here
    frameRate(15);
    createCanvas(250,250);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2DArray(cols, rows);
    // fill the grid with a random value that is either 1 or 0
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++){
            life = map(random(10), 0, 10, 0, 2);
            grid[i][j] = floor(life);
        }
    }
}

function draw() {
    background(0);
  // put drawing code here
    // iterate through all elements
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++){
            // use resolution - 1 to get 
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] == 1){
                if(cell_dies(i, j, grid)){
                    grid[i][j] = 0
                }
            } else if(grid[i][j] == 0 && cell_lives(i, j, grid)){
                grid[i][j] = 1
            }
            if(grid[i][j] == 1){
                fill(255);
                rect(x,y,resolution,resolution);
            } else {
                fill(0);
                rect(x, y, resolution, resolution);
            }
            
        }
    }
}

function cell_dies(i, j, grid){
    let neighbours = get_neighbours(i, j, grid);
    let alive = 0;
    let death;
    for (let k = 0; k < neighbours.length; k++){
        if(neighbours[k] == 1){
            alive += 1
        }
    }
    
    death = (alive < 2 || alive > 3);
    
    return death;
}

function cell_lives(i, j, grid){
    let neighbours = get_neighbours(i, j, grid);
    let alive = 0;
    let death;
    for (let k = 0; k < neighbours.length; k++){
        if(neighbours[k] == 1){
            alive += 1
        }
    }
    
    death = (alive == 2 || alive == 3);
    return death;
}
function get_neighbours(i, j, grid){
    let neighbours = new Array(0);
    if(i == 0 && j == 0){
        neighbours.push(grid[i+1][j]);
        neighbours.push(grid[i+1][j+1]);
        neighbours.push(grid[i][j+1]);
    } else if (i == (width / resolution) - 1 && j == (height / resolution) - 1){
        neighbours.push(grid[i-1][j]);
        neighbours.push(grid[i-1][j-1]);
        neighbours.push(grid[i][j-1]);
    } else if (i == (width / resolution) - 1 && j == 0){
        neighbours.push(grid[i][j+1]);
        neighbours.push(grid[i-1][j+1]);
        neighbours.push(grid[i-1][j]);
    } else if (i == 0 && j == (height / resolution) - 1){
        neighbours.push(grid[i+1][j]);
        neighbours.push(grid[i][j-1]);
        neighbours.push(grid[i+1][j-1]);
    } else if(i == 0){
        neighbours.push(grid[i+1][j]);
        neighbours.push(grid[i+1][j+1]);
        neighbours.push(grid[i][j+1]);
        neighbours.push(grid[i][j-1]);
        neighbours.push(grid[i+1][j-1]);
    } else if(j == 0){
        neighbours.push(grid[i+1][j]);
        neighbours.push(grid[i+1][j+1]);
        neighbours.push(grid[i][j+1]);
        neighbours.push(grid[i-1][j+1]);
        neighbours.push(grid[i-1][j]);
    }  else if (j == (height / resolution) - 1){
        neighbours.push(grid[i+1][j]);
        neighbours.push(grid[i-1][j]);
        neighbours.push(grid[i-1][j-1]);
        neighbours.push(grid[i][j-1]);
        neighbours.push(grid[i+1][j-1]);
    } else if (i == (width / resolution) - 1){
        neighbours.push(grid[i][j+1]);
        neighbours.push(grid[i-1][j+1]);
        neighbours.push(grid[i-1][j]);
        neighbours.push(grid[i-1][j-1]);
        neighbours.push(grid[i][j-1]);
    } else {
        neighbours.push(grid[i+1][j]);
        neighbours.push(grid[i+1][j+1]);
        neighbours.push(grid[i][j+1]);
        neighbours.push(grid[i-1][j+1]);
        neighbours.push(grid[i-1][j]);
        neighbours.push(grid[i-1][j-1]);
        neighbours.push(grid[i][j-1]);
        neighbours.push(grid[i+1][j-1]);
    }
    return neighbours
}