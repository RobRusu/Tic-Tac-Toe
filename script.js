// create the gameboard
const gameboard = (function () {
  // create variables for the board size and create the array for the board
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < columns; j++){
      board[i].push(' ');
    }
  }

  const getBoard = () => board;

  return {getBoard}
})();


function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
){
  const players = [
    {
      name: playerOneName,
      mark: 'x',
    },
    {
      name: playerTwoName,
      mark: 'o',
    }
  ]

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (x, y) => {
    if (gameboard.getBoard()[x][y] !== ' ') return console.log(gameboard.getBoard());
    gameboard.getBoard()[x][y] = getActivePlayer().mark;
    winner();
    switchPlayerTurn();
    console.log(gameboard.getBoard());
  }

  const winner = () => {
    gameboard.getBoard().forEach((row) => {
      let counter = 0;
      row.forEach((cell) => {
        if (cell === getActivePlayer().mark) {
          counter++;
        } else {
          counter = 0;
        }
      })
      if (counter === 3) {
        console.log(`Winner is ${row[0]}.`);
      }
    })
    if (
      (gameboard.getBoard()[0][0] + gameboard.getBoard()[1][0] + gameboard.getBoard()[2][0] === getActivePlayer().mark.repeat(3)) || 
      (gameboard.getBoard()[0][1] + gameboard.getBoard()[1][1] + gameboard.getBoard()[2][1] === getActivePlayer().mark.repeat(3)) || 
      (gameboard.getBoard()[0][2] + gameboard.getBoard()[1][2] + gameboard.getBoard()[2][2] === getActivePlayer().mark.repeat(3)) ||
      (gameboard.getBoard()[0][2] + gameboard.getBoard()[1][1] + gameboard.getBoard()[2][0] === getActivePlayer().mark.repeat(3)) ||
      (gameboard.getBoard()[0][0] + gameboard.getBoard()[1][1] + gameboard.getBoard()[2][2] === getActivePlayer().mark.repeat(3))
      ){
        console.log(`Winner is ${getActivePlayer().mark}.`);
        }
  } 
  return {playRound, getActivePlayer, switchPlayerTurn}
};

const game = GameController();



// create IIFE to display the gameboard

const display = (function () {
  const board = gameboard.getBoard();
  const boardDiv = document.querySelector('.board')
  board.forEach((row, index) =>{
    const rowNumber = index;
    row.forEach((element, index) => {
      const button = document.createElement('button');
      button.textContent = element;
      button.classList.add('cell');
      button.dataset.row = rowNumber;
      button.dataset.column = index;
      // button.addEventListener('click', game.playRound(rowNumber, index))
      boardDiv.appendChild(button);
    })
  })

  const buttons = document.querySelectorAll('.board > button');
  buttons.forEach((button) => {
    button.addEventListener('click', playRound);
  })

  function playRound(){
    board[this.dataset.row][this.dataset.column] = game.getActivePlayer().mark;
    console.log(`I am ${board[this.dataset.row][this.dataset.column]}`);
    GameController.switchPlayerTurn;
  }

  const displayBoard = () => board;

  return {displayBoard}

})();

function placeholder() {
  console.log("I am working!");
}



