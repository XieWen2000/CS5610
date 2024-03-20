import React from 'react';

const GridDisplay = ({ grid, cols, toggleCell, getCellColor }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 20px)`, marginTop: '10px' }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => toggleCell(rowIndex, colIndex)}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: getCellColor(cell), 
              border: 'solid 1px grey',
              cursor: 'pointer',
            }}
          ></div>
        ))
      )}
    </div>
  );
  
export default GridDisplay;
