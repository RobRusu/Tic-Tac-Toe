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
      mark: 'X',
    },
    {
      name: playerTwoName,
      mark: 'O',
    }
  ]

  let activePlayer = players[0];

  const winnerAnnounce = document.querySelector('.winner');
  const dialog = document.querySelector('.results');
  const board = gameboard.getBoard();
  const restartBtn = document.querySelectorAll('.restart');
  const playerOne = document.querySelector('.one');
  const playerTwo = document.querySelector('.two');

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    if (activePlayer === players[0]){
      playerTwo.removeAttribute('active');
      playerOne.setAttribute('active', 'activePlayer');
    } else if (activePlayer === players[1]){
      playerOne.removeAttribute('active');
      playerTwo.setAttribute('active', 'activePlayer');
    }
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
    let counter = 0;
    gameboard.getBoard().forEach((row) => {
      row.forEach((cell) => {
        if (cell !== ' ') {
          counter++;
        } else {
          counter = 0;
        }
      })
      if (counter === 9) {
        dialog.showModal();
        winnerAnnounce.textContent = 'It is a draw!';
        console.log('It is a draw!');
      }
    })

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
        dialog.showModal();
        winnerAnnounce.textContent = `Winner is ${row[0]}.`;
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
        dialog.showModal();
        winnerAnnounce.textContent = `Winner is ${getActivePlayer().mark}.`;
        console.log(`Winner is ${getActivePlayer().mark}.`);
        }
  } 

  const emptyCells = () => {
    const boardDiv = document.querySelectorAll('.board > button')
    board.forEach((row, index)=> {
      const rowNumber = index;
      row.forEach((cell, index)=> {
        board[rowNumber][index] = ' ';
        cell.textContent = ' ';
      })
    })
    boardDiv.forEach((cell) => {
      cell.textContent = ' ';
    })
    if (activePlayer.mark === 'O') {switchPlayerTurn()};
    dialog.close();
  }
  restartBtn.forEach((btn) => {
    btn.addEventListener('click', emptyCells);
  })
  return {playRound, getActivePlayer, switchPlayerTurn, winner}
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
      boardDiv.appendChild(button);
    })
  })

  const buttons = document.querySelectorAll('.board > button');
  buttons.forEach((button) => {
    button.addEventListener('click', playRound);
  })

  function playRound(){
    if (gameboard.getBoard()[this.dataset.row][this.dataset.column] !== ' ') return;
    board[this.dataset.row][this.dataset.column] = game.getActivePlayer().mark;
    this.textContent = board[this.dataset.row][this.dataset.column];
    game.winner();
    game.switchPlayerTurn();
  }
})();


// IIFE to allow players to input their own names

const Names = (function () {
  const dialogNames = document.querySelector('.names')
  const changeNames = document.querySelector('.changeName');
  const playerOne = document.querySelector('.playerOne');
  const playerTwo = document.querySelector('.playerTwo');
  const playerOneNew = document.querySelector('#playerOne');
  const playerTwoNew = document.querySelector('#playerTwo');
  const finish = document.querySelector('.finish');

  changeNames.addEventListener('click', () => {
    dialogNames.showModal();
  });

  finish.addEventListener('click', () => {
    playerOne.textContent = playerOneNew.value;
    playerTwo.textContent = playerTwoNew.value;
    if (!playerOneNew.value && !playerTwoNew.value){
      playerOne.textContent = 'Player One';
      playerTwo.textContent = 'Player Two';
    } else if(!playerOneNew.value) {
      playerOne.textContent = 'Player One';
    } else if (!playerTwoNew.value) {
      playerTwo.textContent = 'Player Two';
    }
    dialogNames.close();
  })
})();

