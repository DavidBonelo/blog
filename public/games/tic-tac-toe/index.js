const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let winner;
const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function checkWinner(currentPlayer) {
  const cellsValues = Array.from(cells).map((c) => c.textContent);
  console.log(cellsValues);
  let winner;
  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i];
    if (
      cellsValues[winCondition[0] - 1] == currentPlayer &&
      cellsValues[winCondition[1] - 1] == currentPlayer &&
      cellsValues[winCondition[2] - 1] == currentPlayer
    ) {
      winner = currentPlayer;
      console.log(
        winCondition[0] + 1,
        winCondition[1] + 1,
        winCondition[2] + 1
      );
      console.log(winCondition);
    }
  }
  return winner;
}

function gameOver() {
  cells.forEach((c) => c.classList.add("disabled"));
}

function makeMove(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    winner = checkWinner(currentPlayer);
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    if (winner) {
      gameOver();
      alert(winner);
    }
  }
}

function reset() {
  cells.forEach((c) => {
    c.textContent = "";
    c.classList.remove("disabled");
  });
}

cells.forEach((c) => c.addEventListener("click", () => makeMove(c)));
document.getElementById("reset").onclick = reset;
