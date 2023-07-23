// Functional implementation of Board.js
import React, { useState } from 'react';
import './Board.css';
import Cell1 from './Cell1';

function Board1({ nRows = 4, nCols = 4, chanceLightStartsOn = 0.25 }) {
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < nRows; i++) {
      const row = [];
      for (let j = 0; j < nCols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  };

  const [board, setBoard] = useState(createBoard());
  const [hasWon, setHasWon] = useState(false);

  const flipCells = (coord) => {
    const newBoard = [...board];
    const [i, j] = coord.split('-').map(Number);

    const flipSingleCell = (i, j) => {
      if (i > 0 && i < nRows && j > 0 && j < nCols) {
        newBoard[i][j] = !newBoard[i][j];
      }
    };

    flipSingleCell(i, j); // flip initital cell
    flipSingleCell(i, j + 1); // flip right
    flipSingleCell(i, j - 1); // flip left
    flipSingleCell(i + 1, j); // flip down
    flipSingleCell(i - 1, j); // flip up

    const isWinner = newBoard.every((row) => row.every((cell) => !cell));
    setBoard(newBoard);
    setHasWon(isWinner);
  };

  const generateGameBoard = () => {
    const gameBoard = [];
    for (let i = 0; i < nRows; i++) {
      const row = [];
      for (let j = 0; j < nCols; j++) {
        const coord = `${i}-${j}`;
        row.push(
          <Cell1
            key={coord}
            coord={coord}
            isLit={board[i][j]}
            toggleColorsAroundMe={flipCells}
          />
        );
      }
      gameBoard.push(<tr key={i}>{row}</tr>);
    }
    return (
      <table className='Board'>
        <tbody>{gameBoard}</tbody>
      </table>
    );
  };

  return (
    <div>
      {hasWon ? (
        <div className='winner'>
          <span className='neon-orange'>You</span>
          <span className='neon-blue'>Win!</span>
        </div>
      ) : (
        <div>
          <span className='neon-orange'>Lights</span>
          <span className='neon-blue'>Out</span>
          {generateGameBoard()}
        </div>
      )}
    </div>
  );
}

export default Board1;
