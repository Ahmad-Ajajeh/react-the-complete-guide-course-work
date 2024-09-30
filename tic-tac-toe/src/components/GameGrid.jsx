import { useState } from "react";

export default function GameBoard({ onSelectSquare, gameGrid }) {
  // const [gameGrid, setGameGrid] = useState(intialGameGrid);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   //when you update the state of an array or object ,
  //   // you should update it in an immutable way
  //   setGameGrid((prevGameGrid) => {
  //     const updatedGrid = [
  //       ...prevGameGrid.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedGrid[rowIndex][colIndex] = activePlayer;
  //     return updatedGrid;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameGrid.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
