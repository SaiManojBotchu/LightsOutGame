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
  };

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    // let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({ board, hasWon });
  }

  generateTableBoard() {
    let tblBoard = [];
    let { nRows, nCols } = this.props;
    for (let x = 0; x < nRows; x++) {
      let row = [];
      for (let y = 0; y < nCols; y++) {
        let coord = `${x}-${y}`;
        row.push(<Cell key={coord} isLit={this.state.board[x][y]} />);
      }
      tblBoard.push(<tr key={x}>{row}</tr>);
    }
    return tblBoard;
  }

  render() {
    return (
      <table className='Board'>
        <tbody>{this.generateTableBoard()}</tbody>
      </table>
    );
  }
}

export default Board;
