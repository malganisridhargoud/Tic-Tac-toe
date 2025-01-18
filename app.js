const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const titleText = document.querySelector('.title');
const resultText = document.querySelector('.result-display');
let currentPlayer = 'X';
let gameActive = true;
let winner =  null;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;

  if (cell.classList.contains('taken') || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  checkWin();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      winner = currentPlayer; // Track the winner correctly
      gameActive = false;
      highlightWinningCells(combination);
    }
  });

  // Check for a tie condition
  if ([...cells].every(cell => cell.classList.contains('taken')) && gameActive) {
    gameActive = false;
    setTimeout(() => resultText.innerText = "It's a Tie",100);
    resetGame();
  }
}


function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].style.animation = 'winHighlight 1s infinite alternate';
  });
  setTimeout(() => resultText.innerText = `${winner} wins!`,100);
  resetButton.addEventListener('click', function() {
    resultText.innerText = "";
  });
}

// Restart the game
resetButton.addEventListener('click', resetGame);
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.style.animation = '';
  });
  currentPlayer = 'X';
  gameActive = true;
  winner= null;
}
