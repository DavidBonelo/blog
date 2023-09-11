const grid = document.getElementById("grid");
const newGridButton = document.getElementById("new-grid");
const r = document.querySelector(":root");
let gridRowsTotal = 16;

newGridButton.addEventListener("click", (_) => newGrid());

function newGrid() {
  const userRows = parseInt(
    prompt("How many rows do you want the grid to have?", 0)
  );

  if (isNaN(userRows)) {
    alert("invalid ammount of rows, you should enter a number");
    return;
  }
  if (userRows <= 0) {
    alert("the number of rows should me greater than 0!");
  } else if (userRows > 100) {
    gridRowsTotal = 100;
    alert("the maximum ammount of rows is 100!");
  } else {
    gridRowsTotal = userRows;
  }
  grid.replaceChildren(...generateCells(gridRowsTotal));
}

function generateCells(rowsNumber) {
  const cellsTotal = rowsNumber * rowsNumber;
  const cells = [];

  for (let i = 0; i < cellsTotal; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cells.push(cell);
  }
  r.style.setProperty("--rowTotal", gridRowsTotal);
  return cells;
}

window.addEventListener("mouseover", (e) => {
  const cell = e.target;
  if (cell.classList.contains("cell")) {
    cell.classList.add("dark-cell");
  }
});

grid.replaceChildren(...generateCells(gridRowsTotal));
