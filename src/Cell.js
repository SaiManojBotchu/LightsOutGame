import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe(this.props.coord);
  }

  render() {
    const classes = `Cell${this.props.isLit ? ' Cell-lit' : ''}`;
    return <td className={classes} onClick={this.handleClick} />;
  }
}

export default Cell;
