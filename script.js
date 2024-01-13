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
    if (gameboard.getBoard()[x][y] !== ' ') return console.log(gameboard.getBoard());;
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
  return {playRound, getActivePlayer}
};

const game = GameController();


