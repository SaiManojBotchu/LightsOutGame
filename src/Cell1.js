import React from 'react';

function Cell1({ coord, isLit, toggleColorsAroundMe }) {
  const handleClick = () => {
    toggleColorsAroundMe(coord);
  };

  const className = `Cell${isLit ? ' Cell-lit' : ''}`;
  return <td className={className} onClick={handleClick} />;
}

export default Cell1;
