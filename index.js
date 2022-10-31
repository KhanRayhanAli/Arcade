let baseBoard;
const player = {
  one: "X",
  two: "O",
  comp: "O",
};

let currentPlayer;
let opponent;
const setBox = document.querySelector(".setBox");
const options = setBox.querySelector(".playOptions");
const computerBtn = setBox.querySelector(".computer");
const friendBtn = setBox.querySelector(".friend");
const playBtn = setBox.querySelector(".play");
const backBtn = setBox.querySelector(".back");

const xName = setBox.querySelector(".nameInput1");
const oName = setBox.querySelector(".nameInput2");
let currentName = document.querySelector("#currentPlayerName").innerText;

const head = document.querySelector(".head");
const game = document.querySelector(".game");
const gameFinish = document.querySelector(".gameover");
const cells = document.querySelectorAll(".cell");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function hideMenu(hidden) {
  hidden.classList.add("hide");
}

function showMenu(shown) {
  shown.classList.remove("hide");
}

function setNameX() {
  let player1Name = document.getElementById("player1").value;
  document.getElementById("playerX").innerText = player1Name;
}

function setNameO() {
  let player2Name = document.getElementById("player2").value;
  document.getElementById("playerO").innerText = player2Name;
}

function computerO() {
  opponent = player.comp;
  document.getElementById("playerO").innerText = "Computer";
}

function playerTwoO() {
  opponent = player.two;
}

function playComputer() {
  computerO();
  hideMenu(options);
  hideMenu(computerBtn);
  hideMenu(friendBtn);
  showMenu(xName);
  showMenu(backBtn);
  showMenu(playBtn);
}

function playFriend() {
  playerTwoO();
  hideMenu(options);
  hideMenu(computerBtn);
  hideMenu(friendBtn);
  showMenu(xName);
  showMenu(oName);
  showMenu(backBtn);
  showMenu(playBtn);
}

function backTrack() {
  hideMenu(xName);
  hideMenu(oName);
  hideMenu(backBtn);
  hideMenu(playBtn);
  showMenu(options);
  showMenu(computerBtn);
  showMenu(friendBtn);
}

function playGame() {
  hideMenu(setBox);
  showMenu(head);
  showMenu(game);
  const currentPlayers = [player.one, opponent];
  currentPlayer =
    currentPlayers[Math.floor(Math.random() * currentPlayers.length)];
    turnIndicator();
}

function backStart() {
  hideMenu(options);
  hideMenu(head);
  hideMenu(game);
  hideMenu(xName);
  hideMenu(oName);
  hideMenu(backBtn);
  hideMenu(playBtn);
  hideMenu(gameFinish);
  showMenu(computerBtn);
  showMenu(friendBtn);
  showMenu(setBox);
  showMenu(options);
  baseBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  };
};

startGame();

function startGame() {
  hideMenu(gameFinish);
  baseBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  };
};

function turnClick(square) {
  if (typeof baseBoard[square.target.id] == 'number') {
    turn(square.target.id, currentPlayer);
    swapPlayer();
  //   if (opponent == player.comp) {
  //     checkTie();
  //     turn(compPlayer(), opponent);
  //   } else 
  }
};

function swapPlayer() {
  if (currentPlayer === player.one) {
    currentPlayer = opponent;
  } else currentPlayer = player.one;
  turnIndicator();
};

function turnIndicator() {
  if (currentPlayer === opponent) {
      document.getElementById("currentPlayerName").innerText =
        document.getElementById("playerO").innerText;
  } else {
    document.getElementById("currentPlayerName").innerText =
      document.getElementById("playerX").innerText;
  }
};

function turn(squareId, player) {
  baseBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWin = checkWin(baseBoard, player);
  if (gameWin) gameOver(gameWin);
};

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWin = null;
  for (let [index, win] of winningConditions.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWin = { index: index, player: player };
      break;
    }
  }
  return gameWin;
};

function gameOver(gameWin) {
  for (let index of winningConditions[gameWin.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWin.player == player.one ? "#6ee2ffff" : "#ff410dff";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  gameWinner(gameWin.player == player.one ? document.getElementById("playerX").innerText + " Wins!" : document.getElementById("playerO").innerText + " Wins!")
};

function gameWinner(winner) {
  showMenu(gameFinish);
  document.querySelector("#winner").innerText = winner;
}

function emptySpace() {
  return baseBoard.filter(s => typeof s == 'number');
};

// function compPlayer() {
//   return emptySpace()[0];
// };

function checkTie() {
  if (emptySpace().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "#95cc5eff";
      cells[i].removeEventListener('click', turnClick, false)
    };
    gameWinner("Tie Game!")
    return true;
  }
  return false;
};