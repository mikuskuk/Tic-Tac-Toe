"use strict";
const size = 3;

const board = document.querySelector('.board');
board.style.fontSize = (16 * 4 / size) + 'px';
let state = {
  symbol: 'o',
  moves: {}
};

const storage_name = 'tic_tac_toe';


if (localStorage.getItem(storage_name) != null) {
  state = JSON.parse(localStorage.getItem(storage_name));
}

for (let index = 0; index < (size * size); index++) {
  const template = document.querySelector('.template.cell');
  const cell = template.cloneNode();
  cell.classList.remove('template');

  cell.textContent = state.moves[index];

  cell.onclick = function () {
    const move = state.moves[index];
    if (move != undefined) return;
    state.symbol = (state.symbol == 'x') ? 'o' : 'x';

    this.textContent = state.symbol;
    state.moves[index] = state.symbol;
    localStorage.setItem(storage_name, JSON.stringify(state));

    if (checkWinner()) {
      displayMessage('Player: "' + state.symbol + '" has won!');
    }
   
  }
  board.append(cell);
}


document.querySelector('.reset').onclick = resetHandle;

const win_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

/**
 * @return true - ir uzvarētājs, false - uzvarētāja nav
 */
function checkWinner() {
  for (let index = 0; index < win_combinations.length; index++) {
    const win_combination = win_combinations[index],
          coord1 = win_combination[0],
          coord2 = win_combination[1],
          coord3 = win_combination[2];

    if (
      state.moves[coord1] == state.symbol &&
      state.moves[coord2] == state.symbol &&
      state.moves[coord3] == state.symbol
    ) {
      return true;
    }
  }

  return false;
}

function resetHandle() {
  displayMessage('');
  const cells = board.children;

  for (let index = 0; index < cells.length; index++) {
    const cell = cells[index];
    cell.textContent = '';
  }

  state = {
    symbol: 'o',
    moves: {}
  };

  localStorage.setItem(storage_name, JSON.stringify(state));
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}


/**

 */







