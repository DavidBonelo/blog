const selections = ["rock", "scissors", "paper"];
const userScorePara = document.getElementById("user-score");
const machineScorePara = document.getElementById("machine-score");
const tieScorePara = document.getElementById("tie-score");
const roundResultPara = document.getElementById("round-result");

const selectionButtons = document.querySelectorAll("button.selection");
selectionButtons.forEach((button) =>
  button.addEventListener("click", userRoundChoose)
);
const resetButton = document.getElementById("reset-game");
resetButton.addEventListener("click", resetGame);

let userWinsCount = 0,
  machineWinsCount = 0,
  tiesCount = 0;

function userRoundChoose(e) {
  const userSelection = e.target.id;
  const machineSelection = getMachineSelection();
  console.log(`user: ${userSelection} machine: ${machineSelection}`);

  const winner = playRound(userSelection, machineSelection);

  updateScores(userSelection, machineSelection, winner);
  displayResults();
}

function getMachineSelection() {
  let randomNumber = Math.floor(Math.random() * 3); // 0 - 2
  return selections[randomNumber];
}

function playRound(userSelection, machineSelection) {
  let winner;

  if (userSelection === machineSelection) {
    winner = "tie";
  } else if (userSelection === "rock") {
    winner = machineSelection === "scissors" ? userSelection : machineSelection;
  } else if (userSelection === "scissors") {
    winner = machineSelection === "paper" ? userSelection : machineSelection;
  } else if (userSelection === "paper") {
    winner = machineSelection === "rock" ? userSelection : machineSelection;
  } else {
    console.log("invalid selection");
    return;
  }
  return winner;
}

function updateScores(userSelection, machineSelection, winner) {
  if (winner === userSelection) {
    userWinsCount++;
    roundResultPara.innerHTML = `<b>${userSelection}</b> beats <b>${machineSelection}</b>, the user wins this round!`;
  } else if (winner === machineSelection) {
    machineWinsCount++;
    roundResultPara.innerHTML = `<b>${userSelection}</b> is beaten by <b>${machineSelection}</b>, the machine wins this round!`;
  } else {
    tiesCount++;
    roundResultPara.innerHTML = `<b>${userSelection}</b> vs <b>${machineSelection}</b> ends in a tie!!`;
  }
  if (userWinsCount === 5 || machineWinsCount === 5) {
    gameOver();
  }
}

function gameOver() {
  roundResultPara.classList.add("game-over");
  roundResultPara.innerText = `The ${
    userWinsCount > machineWinsCount ? "user" : "machine"
  } wins the game!`;
  disableUserChoices(true);
}

function displayResults() {
  userScorePara.innerText = `User: ${userWinsCount}`;
  machineScorePara.innerText = `Machine: ${machineWinsCount}`;
  tieScorePara.innerText = `Ties: ${tiesCount}`;
}

function resetGame() {
  tiesCount = 0;
  userWinsCount = 0;
  machineWinsCount = 0;
  roundResultPara.classList.remove("game-over");
  roundResultPara.innerText = "First player to score 5 points wins!";
  disableUserChoices(false);
  displayResults();
}

function disableUserChoices(bool) {
  selectionButtons.forEach((button) => (button.disabled = bool));
}
