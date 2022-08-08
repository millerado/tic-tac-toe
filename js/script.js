const mainEl = document.querySelector("section");
const boardEl = document.createElement("div");
const turnEl = document.getElementById("turn-display");

// Connect reset button to reset function
document.getElementById("btn-reset").addEventListener("click", resetGame);

// Define game state variables
let boardArray = [null, null, null, null, null, null, null, null, null];
let playerTurn = 1; // 1 = player1, -1 = player2
let winner = null; // 1 = player1, -1 = player2, 'T' for tied

function initalizeBoard() {
  // Add board to main element
  mainEl.appendChild(boardEl);
  // Set board board ID
  boardEl.setAttribute("id", "board");
  // create the 9 elements which will be the game tiles
  for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.setAttribute("class", "game-space");
    boardEl.appendChild(box);
    box.setAttribute("id", `box-${i}`);
    box.addEventListener("click", function () {
      oneTurn(box);
    });
  }
}

initalizeBoard();

// needs to reinitilize the board as well. Add once we make initilization function
function resetGame() {
  boardArray = [null, null, null, null, null, null, null, null, null];
  playerTurn = 1;
  turnEl.textContent = "Turn: Player 1";
  winner = null;
  // loop through each cell and remove classes to reset the board
  // Probably wont need this once we put inializeBorad into here
  for (let i = 0; i < boardEl.childElementCount; i++) {
    const box = boardEl.children[i];
    box.classList.remove("blue-x", "red-o");
    box.textContent = "";
  }
}

function switchPlayerTurn() {
  playerTurn *= -1;
  if (playerTurn === 1) {
    turnEl.textContent = "Turn: Player 1";
  } else {
    turnEl.textContent = "Turn: Player 2";
  }
}

// called when player clicks on game tile. Recieves box element that was clicked on from event listener
function markBox(box) {
  if (
    playerTurn === 1 &&
    !(box.classList[1] === "red-o") &&
    !(box.classList[1] === "stop-fill")
  ) {
    box.textContent = "X";
    box.classList.add("blue-x");
    const index = parseInt(box.id.slice(-1), 10);
    boardArray[index] = 1;
  }
  if (
    playerTurn === -1 &&
    !(box.classList[1] === "blue-x") &&
    !(box.classList[1] === "stop-fill")
  ) {
    box.textContent = "O";
    box.classList.add("red-o");
    const index = parseInt(box.id.slice(-1), 10);
    boardArray[index] = -1;
  }
}

function checkWinState() {
  // Check Column Sum
  for (let i = 0; i < 3; i++) {
    if (Math.abs(boardArray[i] + boardArray[i + 3] + boardArray[i + 6]) === 3) {
      playerTurn === 1 ? (winner = 1) : (winner = -1);
      break;
    }
  }
  // Check Row Sum
  let j = 0;
  while (j < 7) {
    if (Math.abs(boardArray[j] + boardArray[j + 1] + boardArray[j + 2]) === 3) {
      playerTurn === 1 ? (winner = 1) : (winner = -1);
      break;
    }
    j += 3;
  }
  // Check Diagonal Sum
  if (Math.abs(boardArray[0] + boardArray[4] + boardArray[8]) === 3) {
    playerTurn === 1 ? (winner = 1) : (winner = -1);
  }
  if (Math.abs(boardArray[2] + boardArray[4] + boardArray[6]) === 3) {
    playerTurn === 1 ? (winner = 1) : (winner = -1);
  }
  // Check for Tie Game
  if (!boardArray.includes(null)) {
    winner = "T";
  }
}

// add stop-fill class to empty game tiles once the game is won so those tiles can't be filled after game is won
function stopMarkBox() {
  for (let i = 0; i < boardEl.childElementCount; i++) {
    const box = boardEl.children[i];
    if (box.classList.length < 2) {
      box.classList.add("stop-fill");
    }
  }
}

function oneTurn(box) {
  markBox(box);
  checkWinState();
  if (winner === 1) {
    turnEl.textContent = "Player 1 wins!";
    stopMarkBox();
  } else if (winner === -1) {
    turnEl.textContent = "Player 2 wins!";
    stopMarkBox();
  } else if (winner === "T") {
    turnEl.textContent = "Tie Game!";
  } else {
    switchPlayerTurn();
  }
}
