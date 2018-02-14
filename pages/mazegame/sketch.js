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

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

function removeFromArray(arr, element){
  for (var i = arr.length-1; i >= 0; i--){
    if(arr[i] == element){
      arr.splice(i, 1);
    }
  }
}

function heuristic(a,b){
  //var d = dist(a.i,a.j,b.i,b.j)
  var d = abs(a.i-b.i) + abs(a.j - b.j);
  return d;
}

function setup() {
  // put setup code here
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor(height/w);
  frameRate(60);
  for (var i = 0; i < rows; i++){
    for (var j = 0; j < cols; j++){
      // make all of the cell objects
      var cell = new Cell(i, j);
      // put the cell into the grid array
      grid.push(cell);
    }
  }
  start = grid[0];
  end = grid[grid.length - 1];
  openSet.push(start);
  // start the current cell in the top left
  current = grid[0];
  while(cell_stack.length != 0){
      // put drawing code here
      background(51);
      for( var i = 0; i < grid.length; i++){
        grid[i].show();
      }

      end.showEnd();
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
  console.log(grid);
  for (var i = 0; i < rows; i++){
    for (var j = 0; j < cols; j++){
      grid[i * rows + j].neighbours = grid[i * rows + j].getNeighbours();
      console.log(grid[i * rows + j].neighbours);
    }
  }
  

  //starting_cell = current;
}

function draw() {
  if(openSet.length > 0){
    var winner = 0;
    for(var i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }
       
    var cur = openSet[winner];
    console.log(cur);
    //this runs when the end is reached 
    if(cur == end){
      //Find the path
      var temp = cur;
      path.push(temp);
      while(temp.prev){
        path.push(temp.prev);
        temp = temp.prev;
      }
      noLoop();
      console.log('done');
    }
    
    removeFromArray(openSet, cur);
    closedSet.push(cur);
    
    var neighbours = cur.neighbours;
    for (var i = 0; i < neighbours.length; i++){
      console.log(i);
      var neighbour = neighbours[i];
      if(!closedSet.includes(neighbour)){
        var temp_g = cur.g + heuristic(neighbour, cur);
        if(!openSet.includes(neighbour)){
          openSet.push(neighbour);
        } else if(temp_g >= neighbour.g){
          continue;
        }
        neighbour.g = temp_g;
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.prev = cur;

      }  
    }
  }
//  if(starting_cell != end){
//    // get the current cell's neighbours
//    n = starting_cell.getNeighbours(starting_cell);
//
//    if( n[(heading + 3) % 4] != undefined){
//      heading = (heading + 3) % 4;
//      starting_cell = n[heading];
//    } else if(n[heading] != undefined){
//      starting_cell = n[heading];
//    } else if(n[(heading + turn) % 4] != undefined){
//      heading = (heading + turn) % 4;
//      starting_cell = n[heading];
//    } else if(n[(heading + 2) % 4] != undefined){
//      heading = (heading + 2) % 4;
//      starting_cell = n[heading];
//    }
  //}
    for (var i = 1; i < path.length; i++){
      path[i].highlight();
    }
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
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];
  this.prev = undefined;

  this.getNeighbours = function(){
    var neighbours = [];
    
    r = grid[index(this.i, this.j + 1)];
    l = grid[index(this.i, this.j - 1)];
    t = grid[index(this.i - 1, this.j)];
    b = grid[index(this.i + 1, this.j)];
    
    if(l && !l.right && !this.left){
      neighbours.push(l);
    } 
    if(b && !b.top && !this.bottom){
      neighbours.push(b);
    } 
    if(r && !r.left && !this.right){
      neighbours.push(r);
    } 
    if(t && !t.bottom && !this.top){
      neighbours.push(t);
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