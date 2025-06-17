const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function updateStatus(message) {
  statusText.textContent = message;
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    updateStatus(`Player ${currentPlayer} Wins!`);
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    updateStatus("It's a Tie!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Current Turn: ${currentPlayer}`);
  }
}

function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCells(condition);
      return true;
    }
  }
  return false;
}

function highlightWinningCells(winningCells) {
  winningCells.forEach(index => {
    cells[index].classList.add("winning");
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning");
  });
  currentPlayer = "X";
  gameActive = true;
  updateStatus(`Current Turn: ${currentPlayer}`);
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
