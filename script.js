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
    gameboard.getBoard()[x][y] = getActivePlayer().mark;
    switchPlayerTurn();
    console.log(gameboard.getBoard());
  }
  
  return {playRound}
};

const game = GameController();


