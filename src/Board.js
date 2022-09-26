import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false
    };
  }

  createBoard() {
    let board = [];
    let { nRows, nCols } = this.props;
    for (let x = 0; x < nRows; x++) {
      let row = [];
      for (let y = 0; y < nCols; y++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    let { nRows, nCols } = this.props;
    let board = this.state.board;
    // for getting x, y coordinates in Number datatype
    let [x, y] = coord.split('-').map(Number);

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

    let hasWon = board.every(row => row.every(cell => !cell));
    // let hasWon = board.every(row => row.every(cell => cell === false));

    this.setState({ board: board, hasWon: hasWon });
  }

  generateTableBoard() {
    let tblBoard = [];
    let { nRows, nCols } = this.props;
    for (let x = 0; x < nRows; x++) {
      let row = [];
      for (let y = 0; y < nCols; y++) {
        let coord = `${x}-${y}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[x][y]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
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
