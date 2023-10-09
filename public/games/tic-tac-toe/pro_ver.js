const winConditions = [
  [0, 1, 2], // [1, 2, 3],
  [3, 4, 5], // [4, 5, 6],
  [6, 7, 8], // [7, 8, 9],
  [0, 3, 6], // [1, 4, 7],
  [1, 4, 7], // [2, 5, 8],
  [2, 5, 8], // [3, 6, 9],
  [0, 4, 8], // [1, 5, 9],
  [2, 4, 6], // [3, 5, 7],
];

function Player(name, mark) {
  return { name, mark };
}

const gameBoard = (function () {
  const cells = new Array(9).fill(""); //  ["", "", "", "", "", "", "", "", ""];
  const getCells = function () {
    return cells;
  };
  const printBoard = function () {
    console.log(cells);
  };
  const makeMove = function (cellIdx, mark) {
    if (cells[cellIdx]) return false;
    cells[cellIdx] = mark;
    return mark;
  };
  const checkWinner = function (player) {
    for (const winCondition of winConditions) {
      if (
        cells[winCondition[0]] == player.mark &&
        cells[winCondition[1]] == player.mark &&
        cells[winCondition[2]] == player.mark
      ) {
        return player;
      }
    }
  };
  const checkDraw = () => cells.every((c) => c); // every cell is filled
  const reset = () => cells.fill("");

  return { getCells, printBoard, makeMove, checkWinner, checkDraw, reset };
})();

const gameController = (function () {
  let players = [Player("Bob", "X"), Player("Martin", "O")];
  let activePlayer = players[0];

  // returns {winner?: player, draw?: bool, move: player.mark | undefined}
  const makeMove = function (idx) {
    const moveMark = gameBoard.makeMove(idx, activePlayer.mark); // if the move is invalid returns false
    if (moveMark) {
      const winner = gameBoard.checkWinner(activePlayer);
      if (winner) return { winner, move: moveMark };
      else if (gameBoard.checkDraw()) return { draw: true, move: moveMark };
      switchPlayer();
    }
    return { move: moveMark };
  };
  const switchPlayer = function () {
    activePlayer = activePlayer == players[0] ? players[1] : players[0];
  };

  const restart = function () {
    gameBoard.reset();
    activePlayer = players[0];
  };

  return { makeMove, restart };
})();

const displayController = (function () {
  const boardContainer = document.querySelector(".ttt");
  const resetBtn = document.getElementById("reset");

  const loadCells = function () {
    boardContainer.replaceChildren();
    gameBoard.getCells().forEach((c, i) => {
      const newCell = document.createElement("button");
      newCell.classList.add("cell");
      newCell.textContent = c;
      newCell.dataset.idx = i;
      boardContainer.appendChild(newCell);
    });
    boardContainer.addEventListener("click", handleClick);
  };
  const handleClick = function (e) {
    const cellIdx = e.target.dataset.idx;
    if (!cellIdx) return; // verify click was on a cell

    const result = gameController.makeMove(cellIdx);
    if (result.move) {
      e.target.textContent = result.move;
      if (result.winner) {
        showWinner(result.winner);
        disableBoard();
      } else if (result.draw) {
        showDraw();
        disableBoard();
      }
    }
  };
  const showWinner = (winner) => alert(`winner: ${winner.name}`);
  const showDraw = () => alert("draw");
  const disableBoard = () => {
    Array.from(boardContainer.children).forEach((c) => (c.disabled = true));
  };

  const restart = () => {
    gameController.restart();
    loadCells();
  };

  resetBtn.onclick = restart;
  loadCells();
})();
