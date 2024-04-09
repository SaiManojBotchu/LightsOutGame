import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nRows: 4,
    nCols: 4,
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  createBoard() {
    const board = [];
    const { nRows, nCols, chanceLightStartsOn } = this.props;
    for (let x = 0; x < nRows; x++) {
      const row = [];
      for (let y = 0; y < nCols; y++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    const { nRows, nCols } = this.props;
    const { board } = this.state;
    // for getting x, y coordinates in Number datatype
    const [x, y] = coord.split('-').map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nRows && y >= 0 && y < nCols) {
        board[x][y] = !board[x][y];
      }
    }
    flipCell(x, y); // flip initital cell
    flipCell(x, y + 1); // flip right
    flipCell(x, y - 1); // flip left
    flipCell(x + 1, y); // flip down
    flipCell(x - 1, y); // flip up

    const hasWon = board.every(row => row.every(cell => !cell));
    // const hasWon = board.every(row => row.every(cell => cell === false));
    this.setState({ board, hasWon });
  }

  generateTableBoard() {
    const tblBoard = [];
    const { nRows, nCols } = this.props;
    for (let x = 0; x < nRows; x++) {
      const row = [];
      for (let y = 0; y < nCols; y++) {
        const coord = `${x}-${y}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[x][y]}
            coord={coord}
            flipCellsAroundMe={this.flipCellsAround}
          />
        );
      }
      tblBoard.push(<tr key={x}>{row}</tr>);
    }
    return (
      <table className='Board'>
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.state.hasWon ? (
          <div className='winner'>
            <span className='neon-orange'>You</span>
            <span className='neon-blue'>Win!</span>
          </div>
        ) : (
          <div>
            <span className='neon-orange'>Lights</span>
            <span className='neon-blue'>Out</span>
            {this.generateTableBoard()}
          </div>
        )}
      </div>
    );
  }
}

export default Board;

// table
// -- tbody
//   -- tr
//     -- td
//     -- td
