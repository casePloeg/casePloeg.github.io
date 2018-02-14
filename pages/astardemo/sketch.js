// the grid will be 5 x 5
var cols = 10;
var rows = 10;
var grid = new Array();
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];
  this.prev = undefined;
  
  this.show = function(col){
    fill(col);
    noStroke();
    rect(this.i * w, this.j * h, w-1, h-1);
  }
  
  this.addNeighbours = function(grid){
    var i = this.i;
    var j = this.j;
    if(i < cols - 1){
      this.neighbours.push(grid[i + 1][j]);
    }
    if(i > 0){
      this.neighbours.push(grid[i - 1][j]);
    }
    if(j < rows - 1){
      this.neighbours.push(grid[i][j + 1]);
    }
    if(j > 0){
      this.neighbours.push(grid[i][j - 1]);
    } 
  }
}

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
  console.log('A*');
  
  w = width / cols;
  h = height / rows;

  // Making a 2D array to represent the grid
  for (var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
  }
  
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j] = new Spot(i, j);
    }
  }
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j].addNeighbours(grid);
    }
  }
  
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  
  openSet.push(start);
  
  console.log(grid);
}

function draw() {
  // put drawing code here
  if(openSet.length > 0){
    var winner = 0;
    for(var i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }
    
    var current = openSet[winner];
    
    //this runs when the end is reached 
    if(current == end){
      //Find the path
      var temp = current;
      path.push(temp);
      while(temp.prev){
        path.push(temp.prev);
        temp = temp.prev;
      }
      noLoop();
      console.log('done');
    }
    
    removeFromArray(openSet, current);
    closedSet.push(current);
    
    var neighbours = current.neighbours;
    for (var i = 0; i < neighbours.length; i++){
      var neighbour = neighbours[i];
      if(!closedSet.includes(neighbour)){
        console.log(neighbour);
        var temp_g = current.g + heuristic(neighbour, current);
        
        if(!openSet.includes(neighbour)){
          openSet.push(neighbour);
        } else if(temp_g >= neighbour.g){
          continue;
        }
        neighbour.g = temp_g;
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.prev = current;
      } 
      
      
    }
  } else {
    
  }
  
  background(0);
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++){
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++){
    openSet[i].show(color(0, 255, 0));
  }
  
  for (var i = 0; i < path.length; i++){
    path[i].show(color(0, 0, 255));
  }
}