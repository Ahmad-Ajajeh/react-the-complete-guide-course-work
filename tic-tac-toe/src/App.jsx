import { useState } from "react";

import Log from "./components/Log.jsx";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameGrid.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameGrid, playersNames) {
  // is there a winer , draw or nothing yet ?
  let winner;

  // checking for game over with a winner .
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameGrid[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameGrid[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameGrid[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playersNames[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameGrid(gameTurns) {
  let gameGrid = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  // setting up the current game grid .
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameGrid[row][col] = player;
  }

  return gameGrid;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const [playersNames, setPlayersNames] = useState(PLAYERS);

  // handling the change of the player name after saveing it .
  function handlePlayerNameChange(symbol, newName) {
    setPlayersNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: newName,
      };
    });
  }

  const gameGrid = deriveGameGrid(gameTurns);

  const winner = deriveWinner(gameGrid, playersNames);

  // checking if the game ended with a draw .
  const hasDraw = gameTurns.length === 9 && !winner;

  // checking who is the active player in order to highlight it .
  const activePlayer = deriveCurrentPlayer(gameTurns);

  // what would happen if a square was selected ? below :
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      // we redefined the current player , because we must not
      // derive the current player from the current game grid immediately
      // rather we must use the function and inside it we can use the ' prevTurns '
      // to derive all the vars related to it .

      const currentPlayer = deriveCurrentPlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  // handling the click of the restart button on the game over board .
  function handleRestart() {
    setGameTurns((prevTurns) => []);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.O}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initialName={PLAYERS.X}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameGrid={gameGrid} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
