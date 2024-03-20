import React from 'react';

const ControlPanel = ({ rows, cols, handleInputChange, resetGrid, progressSimulation, toggleAutoplay, autoplay, showHeatmap, toggleHeatmap }) => (
    <div>
      <label>Row: </label>
      <input type="number" value={rows} onChange={(e) => handleInputChange(e, 'rows')} min="3" max="40" />
      <label>Column: </label>
      <input type="number" value={cols} onChange={(e) => handleInputChange(e, 'cols')} min="3" max="40" />
      <button onClick={toggleHeatmap}>{showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}</button>
      <button onClick={resetGrid} style={{ marginTop: '10px' }}>Reset</button>
      <button onClick={progressSimulation}>Next Frame</button>
      <button onClick={toggleAutoplay}>{autoplay ? 'Stop Autoplay' : 'Start Autoplay'}</button>
      
    </div>
  );

  export default ControlPanel;