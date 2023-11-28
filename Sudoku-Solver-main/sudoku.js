const cells = document.getElementsByClassName("cell");
const errorMsg = document.getElementById("msg");

function solve() {
  let grid = new Array(9);
  for (var i = 0; i < grid.length; i++) grid[i] = new Array(9);
  let index = 0;
  [...cells].forEach((ele) => {                
    row = Math.floor(index / 9);
    col = index % 9;
    grid[row][col] = Number(ele.value);        
    index++;
  });

   if (!isValidInput(grid)) {
    displayMessage("Invalid input! Please check your Sudoku grid.");
    return;
  }
  else{
    displayMessage("Sudoku solved!! Reset or edit for new puzzle input");
  };

  if (sudoku(grid, 0, 0)) console.log(grid);   

  let gridFinal = new Array(81);
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      gridFinal[9 * i + j] = grid[i][j];       
    }
  }
  index = 0;
  [...cells].forEach((ele) => {
    let d = gridFinal[index];
    ele.value = d.toString();
    index++;                           
  });
}

function isValidInput(grid) {
  for(var row = 0; row < 9; row++){
    for (var i = 0; i < 8; i++) {     
      for(var j = i+1; j < 9; j++){
        if (grid[row][i] == grid[row][j] && grid[row][i] != 0) return false;
        if (grid[row][i]<0 || grid[row][j]<0 || grid[row][i]>9 || grid[row][j]>9) return false;
      }       
    }
  }

  for(var col = 0; col < 9; col++){
    for (var i = 0; i < 8; i++) {     
      for(var j = i+1; j < 9; j++){
        if (grid[i][col] == grid[j][col] && grid[i][col] != 0) return false;
      }       
    }
  }

  for (var row = 0; row < 9; row += 3) {
    for (var col = 0; col < 9; col += 3) {
      var subBlock = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          subBlock.push(grid[row + i][col + j]);
        }
      }
      if (!isValidSubBlock(subBlock)) {
        return false;
      }
    }
  }

  return true;
}

function isValidSubBlock(subBlock) {
  var set = new Set();
  for (var i = 0; i < subBlock.length; i++) {
    if (subBlock[i] != 0) {
      if (set.has(subBlock[i])) {
        return false;
      }
      set.add(subBlock[i]);
    }
  }
  return true;
}

function displayMessage(message) {
  errorMsg.innerText = message; 
}

function reset() {
  [...cells].forEach((ele) => {
    ele.value = "0";                        
  });
}

function isValidMove(grid, row, col, number) {
  for (var i = 0; i < 9; i++) {            
    if (grid[row][i] == number) return false;
  }
  for (var i = 0; i < 9; i++) {         
    if (grid[i][col] == number) return false;
  }
  let corner_row = row - (row % 3);     
  let corner_col = col - (col % 3);

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (grid[corner_row + i][corner_col + j] == number) {
        return false;
      }
    }
  }
  return true;
}

function sudoku(grid, row, col) {
  if (col == 9) {                               
    if (row == 8) {
      return true;
    }
    row += 1;
    col = 0;
  }

  if (grid[row][col] > 0) return sudoku(grid, row, col + 1);  

  for (var i = 1; i <= 9; i++) {
    if (isValidMove(grid, row, col, i)) {
      grid[row][col] = i;
      if (sudoku(grid, row, col + 1)) return true;
    }
    grid[row][col] = 0;
  }
  return false;
}
