let cells = [];
let pathogen = {};
pathogen.damage = 1;
let interval;

let tick = 100;
let currentTime = 0;

const cellSize = 30; //pixel length of each cell
const mapWidth = 10; //how many cells across the map is
const mapHeight = 10; //how many cells high the map is

function startGame() {
  console.log('Starting game');
  interval = setInterval(updateGameState, tick); //does this work??
  generateMap();
  cells[0][0].health = 9; //infects first cell
  drawMap();
}

function updateGameState() {
  currentTime++;

  for (let e of cells) {
    for (let c of e) {
      c.updateHealth();
    }
  }

  drawMap();

  //TODO check if game over (win/loss) - call endGame()
  if (isOver()) {
    console.log('Game over in '+currentTime+' ticks.');
    stopGame();
  }
  //TODO check if need to alert player
}

function generateMap() {
  //This generates a rectangular grid where all cells are the same.
  //TODO create more interesting map
  for (let i = 0; i < mapWidth; i++) {
    cells[i] = [];
    for (let j = 0; j < mapHeight; j++) {
      cells[i][j] = new Cell(1);
    }
  }

  //sets cell neighbors
  for (let i = 0; i < mapWidth; i++) {
    for (let j = 0; j < mapHeight; j++) {
      cells[i][j].neighbors = findCellNeighbors(i, j);
    }
  }


}

function drawMap() {
  //This logs a simple text representation of the grid
  //TODO add graphics
  let output = '';
  for (let i = 0; i < mapWidth; i++) {
    for (let j = 0; j < mapHeight; j++) {
      output += cells[i][j].health + ' ';
      if (cells[i][j].health < 10)
        output += ' ';
    }
    output += '\n';
  }
  console.log(output);
}

//Helper method that returns an array of cell neighbors by location in 2D grid
function findCellNeighbors(x, y) {
  let neighbors = [];
  if (positionValid(x + 1, y))
    neighbors.push(cells[x + 1][y]);
  if (positionValid(x + 1, y + 1))
    neighbors.push(cells[x + 1][y + 1]);
  if (positionValid(x + 1, y - 1))
    neighbors.push(cells[x + 1][y - 1]);

  if (positionValid(x, y)) // A cell is its own neighbor (can infect itself)
    neighbors.push(cells[x][y]);
  if (positionValid(x, y + 1))
    neighbors.push(cells[x][y + 1]);
  if (positionValid(x, y - 1))
    neighbors.push(cells[x][y - 1])

  if (positionValid(x - 1, y))
    neighbors.push(cells[x - 1][y]);
  if (positionValid(x - 1, y + 1))
    neighbors.push(cells[x - 1][y + 1]);
  if (positionValid(x - 1, y - 1))
    neighbors.push(cells[x - 1][y - 1]);

  return neighbors;
}

//Helper method that tells if coordinates are on the grid
function positionValid (x, y) {
  if (x >= 0 && y >= 0 && x < mapWidth && y < mapHeight)
    return true;
  return false;
}

//Checks if game over DOES NOT WORK
function isOver() {
  for (let i = 0; i < mapWidth; i++) {
    for (let j = 0; j < mapHeight; j++) {
      if (cells[i][j].health != 0)
        return false;
    }
  }
  return true;
}

function stopGame() {
  clearInterval(interval);
  //?? why does it not stop??
}
