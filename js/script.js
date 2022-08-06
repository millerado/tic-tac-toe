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
}
