const choices = ["rock", "scisors", "paper"];

function getMachineChoice() {
  let randomNumber = Math.floor(Math.random() * 3); // 0 - 2
  return choices[randomNumber];
}

function getUserChoice() {
  let userChoice;
  while (!choices.includes(userChoice)) {
    userChoice = prompt("Rock, Paper or Scisors\nWhich one you choose?");
    userChoice = userChoice?.toLowerCase();
    if (!choices.includes(userChoice)) {
      alert("Invalid choice, the options are: Rock, Scisors or Paper");
    }
  }
  return userChoice;
}

function getRoundsAmmount() {
  let roundsCount;
  while (!roundsCount || roundsCount <= 0) {
    roundsCount = Number(
      prompt(
        "GAME\nROCK - PAPER - SCISORS\n\nHow many rounds do you want to play?"
      )
    );
    if (!roundsCount || roundsCount <= 0) {
      alert("The ammount of rounds should be a number greater than 0");
    }
  }
  return roundsCount;
}

function playRound(userChoice, machineChoice) {
  let winner;

  if (userChoice === machineChoice) {
    winner = "tie";
  } else if (userChoice === "rock") {
    winner = machineChoice === "scisors" ? userChoice : machineChoice;
  } else if (userChoice === "scisors") {
    winner = machineChoice === "paper" ? userChoice : machineChoice;
  } else if (userChoice === "paper") {
    winner = machineChoice === "rock" ? userChoice : machineChoice;
  } else {
    console.log("invalid choice");
    return;
  }
  return winner;
}

function displayResults(userWinsCount, machineWinsCount, tiesCount) {
  alert(
    `The user won ${userWinsCount} games!
The machine won ${machineWinsCount} games!
${tiesCount} games resulted in a tie!`
  );
  if (userWinsCount === machineWinsCount) {
    alert("Nobody won, its a tie!");
  } else {
    alert(
      `The ${
        userWinsCount > machineWinsCount ? "user" : "machine"
      } wins the game!`
    );
  }
}

function startGame() {
  const roundsCount = getRoundsAmmount();
  console.log("Total rounds: " + roundsCount);
  let userWinsCount = 0,
    machineWinsCount = 0,
    tiesCount = 0;
  for (let i = 0; i < roundsCount; i++) {
    const userChoice = getUserChoice();
    const machineChoice = getMachineChoice();
    console.log(`Round ${i + 1} user: ${userChoice} machine: ${machineChoice}`);
    console.table({
      round: i + 1,
      user: `${userChoice}`,
      machine: `${machineChoice}`,
    });

    const winner = playRound(userChoice, machineChoice);
    if (winner === userChoice) {
      userWinsCount++;
    } else if (winner === machineChoice) {
      machineWinsCount++;
    } else {
      tiesCount++;
    }
  }
  displayResults(userWinsCount, machineWinsCount, tiesCount);
}

startGame();
