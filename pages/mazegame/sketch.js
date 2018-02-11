var cols, rows;
// w is the width of each cell
var w = 40;
// grid is the grid of cells
var grid = [];
// current is the current cell being visited
var current;
// make a stack for the cells
var cell_stack = [1];
var direction = 0;

// South: 0, East: 1, North: 2, West: 3
var heading = 0;
// 1 is left, -1 is right
var turn = 1;
var starting_cell;
var direction_flip = false;

function setup() {
  // put setup code here
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor(height/w);
  frameRate(15);
  for (var i = 0; i < rows; i++){
    for (var j = 0; j < cols; j++){
      // make all of the cell objects
      var cell = new Cell(i, j);
      // put the cell into the grid array
      grid.push(cell);
    }
  }
  
  // start the current cell in the top left
  current = grid[0];
  starting_cell = current;
}

function draw() {
  while(cell_stack.length != 0){
    // put drawing code here
    background(51);
    for( var i = 0; i < grid.length; i++){
      grid[i].show();
    }

    grid[grid.length - 1].showEnd();
    current.visited = true;
    current.highlight();
    // STEP 1
    // returns a random unvisited neighbour (next cell)
    var next = current.checkNeighbours();
    if(next){
      next.visited = true;
      // STEP 3
      removeWalls(current, next);
      // STEP 4
      cell_stack.push(current);
      current = next;
    } else if(cell_stack.length != 0){
      current = cell_stack.pop();
    }
  }
  
  if(starting_cell != grid[grid.length -1]){
    // get the current cell's neighbours
    n = starting_cell.getNeighbours(starting_cell);

    if( n[(heading + 3) % 4] != undefined){
      heading = (heading + 3) % 4;
      starting_cell = n[heading];
    } else if(n[heading] != undefined){
      starting_cell = n[heading];
    } else if(n[(heading + turn) % 4] != undefined){
      heading = (heading + turn) % 4;
      starting_cell = n[heading];
    } else if(n[(heading + 2) % 4] != undefined){
      heading = (heading + 2) % 4;
      starting_cell = n[heading];
    }
  }

  starting_cell.highlight();
}  


function index(i, j){
  if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1){
    return -1;
  }
  return i * rows + j;
}

function removeWalls(current, next){
  var x = current.i - next.i;
  if(x == 1){
    current.top = false;
    next.bottom = false;
  } else if (x == -1){
    current.bottom = false;
    next.top = false;
  }
  var y = current.j - next.j;
  if(y == 1){
    current.left = false;
    next.right = false;
  } else if (y == -1){
    current.right = false;
    next.left = false;
  }
}

function Cell(i, j){
  // i is the row number
  // j is the column number
  this.i = i;
  this.j = j;
  this.top = true;
  this.bottom = true;
  this.right = true;
  this.left = true;
  this.visited = false;
  
  this.getLeft = function(direction){
    var neighbours = [];
    
    var right = grid[index(this.i, this.j + 1)];
    var left = grid[index(this.i, this.j - 1)];
    var top = grid[index(this.i - 1, this.j)];
    var bottom = grid[index(this.i + 1, this.j)];
    
    if(direction == 0 && !this.left){
      return left;
    } else if (direction == 1 && !this.top){
      return top;
    } else if (direction == 2 && !this.right){
      return right;
    } else if(direction == 3 && !this.bottom){
      return bottom;


    } else{
      return undefined;
    }
  }

  this.getNeighbours = function(current){
    var neighbours = [];
    
    var right = grid[index(this.i, this.j + 1)];
    var left = grid[index(this.i, this.j - 1)];
    var top = grid[index(this.i - 1, this.j)];
    var bottom = grid[index(this.i + 1, this.j)];

    if(left && !left.right && !current.left){
      neighbours.push(left);
    } else{
      neighbours.push(undefined);
    }
    if(bottom && !bottom.top && !current.bottom){
      neighbours.push(bottom);
    } else{
      neighbours.push(undefined);
    }
    if(right && !right.left && !current.right){
      neighbours.push(right);
    } else{
      neighbours.push(undefined);
    }
    if(top && !top.bottom && !current.top){
      neighbours.push(top);
    } else{
      neighbours.push(undefined);
    }
    return neighbours;    
  }

  this.checkNeighbours = function(){
    var neighbours = [];
    
    var right = grid[index(this.i, this.j + 1)];
    var left = grid[index(this.i, this.j - 1)];
    var top = grid[index(this.i - 1, this.j)];
    var bottom = grid[index(this.i + 1, this.j)];
    
    if(top && !top.visited){
      neighbours.push(top);
    }
    if(bottom && !bottom.visited){
      neighbours.push(bottom);
    }
    if(right && !right.visited){
      neighbours.push(right);
    }
    if(left && !left.visited){
      neighbours.push(left);
    }
    
    if(neighbours.length > 0){
      var r = floor(random(0, neighbours.length))
        return neighbours[r];
      } else {
        return undefined;
      }
    }

  this.show = function(){
    var x = this.j * w;
    var y = this.i * w;

    // change the line colour to white
    stroke(255);
    // change draw setting to just lines
    noFill();
    // top
    if(this.top){
      line(x, y, x + w, y);
    }
    // bottom
    if(this.bottom){
      line(x, y + w, x + w, y + w);
    }
    // left
    if(this.left){
      line(x, y, x, y + w);
    }
    // right
    if(this.right){
      line(x + w, y, x + w, y + w);      
    }
    
    // draw the cell if it's been visited
    if(this.visited){
      noStroke()
      fill(255, 0, 265, 100);
      rect(x, y, w, w);
    }
  }
  
  this.highlight = function(){
      var x = this.j * w;
      var y = this.i * w;
      noStroke()
      fill(0, 255, 0, 100);
      rect(x, y, w, w);
  }
  
  this.showEnd = function(){
      var x = this.j * w;
      var y = this.i * w;
      noStroke()
      fill(255, 0, 0, 100);
      rect(x, y, w, w);
  }
}