let baseBoard;
const player = {
    "one": "X",
    "two": "O",
    "computer": "O"
}
let opponent;
const setBox = document.querySelector(".setBox");
const options = setBox.querySelector(".playOptions")
const computerBtn = setBox.querySelector(".computer");
const friendBtn = setBox.querySelector(".friend");
const playBtn = setBox.querySelector(".play");
const xName = setBox.querySelector(".nameInput1")
const oName = setBox.querySelector(".nameInput2")

const winningConditions = [
    [0, 1, 2],
    [3 ,4 ,5],
    [6 ,7 ,8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


function playComputer() {
    opponent = player.computer;
    hideMenu(options)
    hideMenu(computerBtn)
    hideMenu(friendBtn)
    showMenu(xName)
}

function playFriend() {
    opponent = player.two;
    hideMenu(options)
    hideMenu(computerBtn)
    hideMenu(friendBtn)
    showMenu(xName)
    showMenu(oName)
    showMenu(playBtn)
}

function hideMenu(hidden) {
    hidden.classList.add("hide")
}

function showMenu(shown) {
    shown.classList.remove("hide")
}

function setNameX(){
    let player1Name = document.getElementById('player1').value;
    document.getElementById('playerX').innerText = player1Name;
}

function setNameO(){
    let player2Name = document.getElementById('player2').value;
    document.getElementById('playerO').innerText = player2Name;
}

const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
    document.querySelector(".gameover").getElementsByClassName.display = "none";
    baseBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
        turn(square.target.id, player1)
}

// function turnSwitch(square) {
//     if (turn(square.target.id, player1)){
//         turn(square.target.id, player2)
//     }
// }

function turn(squareId, player) {
    baseBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWin = checkWin(baseBoard, player)
    if (gameWin) gameOver(gameWin)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWin = null;
    for (let [index, win] of winningConditions.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWin = {index: index, player: player};
            break;
        }
    }
    return gameWin;
}

function gameOver(gameWin) {
    for (let index of winningConditions[gameWin.index]) {
        document.getElementById(index).style.backgroundColor = gameWin.player == player1 ? "#6ee2ffff" : "#ff410dff";
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
}