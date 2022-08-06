// Creating the elements using the DOM

const mainEl = document.querySelector("main");

// create the board element
const boardEl = document.createElement("div");
mainEl.appendChild(boardEl);
boardEl.setAttribute("id", "board");

// create the 9 elements which will be the game tiles
for (let i = 0; i < 9; i++) {
  const box = document.createElement("div");
  box.setAttribute("class", "game-space");
  boardEl.appendChild(box);
  box.setAttribute("id", `box-${i}`);
  box.addEventListener("click", function () {
    markBox(box);
  });
}

// Assign game tiles to variables
const box0 = document.getElementById("box-0");
const box1 = document.getElementById("box-1");
const box2 = document.getElementById("box-2");
const box3 = document.getElementById("box-3");
const box4 = document.getElementById("box-4");
const box5 = document.getElementById("box-5");
const box6 = document.getElementById("box-6");
const box7 = document.getElementById("box-7");
const box8 = document.getElementById("box-8");

// Define game state variables
let boardArray = [null, null, null, null, null, null, null, null, null];
let playerTurn = 1; // 1 = player1, -1 = player2
let winner = null; // 1 = player1, -1 = player2, 'T' for tied

function resetGame() {
  boardArray = [null, null, null, null, null, null, null, null, null];
  playerTurn = 1;
  winner = null;
  // loop through each cell and remove classes to reset the board
  for (let i = 0; i < boardEl.childElementCount; i++) {
    const box = boardEl.children[i];
    box.classList.remove("blue-x", "red-o");
  }
}

function switchPlayerTurn() {
  playerTurn *= -1;
}

function markBox(box) {
  if (playerTurn === 1 && !(box.classList[1] === "red-o")) {
    box.classList.add("blue-x");
    const index = parseInt(box.id.slice(-1), 10);
    boardArray[index] = 1;
    switchPlayerTurn();
  }
  if (playerTurn === -1 && !(box.classList[1] === "blue-x")) {
    box.classList.add("red-o");
    const index = parseInt(box.id.slice(-1), 10);
    boardArray[index] = -1;
    switchPlayerTurn();
  }
}

function checkWinState() {
  // Check Column Sum
  for (let i = 0; i < 3; i++) {
    if (boardArray[i] + boardArray[i + 3] + boardArray[i + 6] === 3) {
      winner = 1;
      break;
    }
    if (boardArray[i] + boardArray[i + 3] + boardArray[i + 6] === -3) {
      winner = -1;
      break;
    }
  }
  // Check Row Sum
  let j = 0;
  while (j < 7) {
    if (boardArray[j] + boardArray[j + 1] + boardArray[j + 2] === 3) {
      winner = 1;
      break;
    }
    if (boardArray[j] + boardArray[j + 1] + boardArray[j + 2] === -3) {
      winner = -1;
      break;
    }
    j += 3;
  }
  // Check Diagonal Sum
  if (boardArray[0] + boardArray[4] + boardArray[8] === 3) {
    winner = 1;
  }
  if (boardArray[0] + boardArray[4] + boardArray[8] === -3) {
    winner = -1;
  }
  if (boardArray[2] + boardArray[4] + boardArray[6] === 3) {
    winner = 1;
  }
  if (boardArray[2] + boardArray[4] + boardArray[6] === -3) {
    winner = -1;
  }
}
