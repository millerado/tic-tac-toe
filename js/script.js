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
const boardArray = [null, null, null, null, null, null, null, null, null];
let playerTurn = 1; // 1 = player1, -1 = player2
let winner = null; // 1 = player1, -1 = player2, 'T' for tied

function resetGame() {
  boardArray = [null, null, null, null, null, null, null, null, null];
  playerTurn = 1;
  winner = null;
}

function switchPlayerTurn() {
  if (playerTurn === 1) {
    playerTurn = -1;
  } else {
    playerTurn = 1;
  }
}

function markBox(box) {
  if (playerTurn === 1) {
    box.classList.add("blue-x");
  } else {
    box.classList.add("red-o");
  }
}
