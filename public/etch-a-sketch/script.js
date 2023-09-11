let gridRowsTotal = 16;

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

function getRandomRGB() {
  return {
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255),
  };
}

function extractRGBValues(rgbString = "") {
  const valuesString = rgbString.substring(
    rgbString.indexOf("(") + 1,
    rgbString.indexOf(")")
  );
  const values = valuesString.split(",");
  const rgbValues = {
    r: parseFloat(values[0]),
    g: parseFloat(values[1]),
    b: parseFloat(values[2]),
  };
  return rgbValues;
}

function darkenColor(rgbValues) {
  const { r, g, b } = rgbValues;
  return {
    r: r < 25.5 ? 0 : r - 25.5,
    g: g < 25.5 ? 0 : g - 25.5,
    b: b < 25.5 ? 0 : b - 25.5,
  };
}

function colorCell(cell) {
  const { r, g, b } = getRandomRGB();
  cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  cell.classList.add("colored");
}
function darkenCell(cell) {
  const rgb = extractRGBValues(cell.style.backgroundColor);
  const { r, g, b } = darkenColor(rgb);
  cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

const grid = document.getElementById("grid");
const newGridButton = document.getElementById("new-grid");
const r = document.querySelector(":root");

newGridButton.addEventListener("click", (_) => newGrid());

window.addEventListener("mouseover", (e) => {
  const cell = e.target;
  if (cell.classList.contains("cell")) {
    if (cell.classList.contains("colored")) {
      darkenCell(cell);
    } else {
      colorCell(cell);
    }
  }
});

grid.replaceChildren(...generateCells(gridRowsTotal));
