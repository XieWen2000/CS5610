import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useGrid } from './GridContext';
import  GridDisplay  from './GridDisplay';
import ControlPanel from './ControlPanel';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
const createInitialGrid = (rows, cols) => {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let newRow = [];
    for (let j = 0; j < cols; j++) {
 
      newRow.push({ status: Math.random() < 0.05 ? 1 : 0, age: 0 });
    }
    grid.push(newRow);
  }
  return grid;
};

const calculateNextGridState = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const nextGridState = new Array(numRows).fill(null).map(() => new Array(numCols).fill(null));

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cell = grid[row][col];
        let liveNeighbors = 0;


        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const x = row + i;
            const y = col + j;
            if (x >= 0 && x < numRows && y >= 0 && y < numCols && grid[x][y].status === 1) {
              liveNeighbors += 1;
            }
          }
        }

        const isAlive = cell.status === 1;
        if (isAlive && (liveNeighbors < 2 || liveNeighbors > 3)) {
  
          nextGridState[row][col] = { status: 0, age: cell.age + 1 };
        } else if (!isAlive && liveNeighbors === 3) {
  
          nextGridState[row][col] = { status: 1, age: 0 };
        } else {

          nextGridState[row][col] = { ...cell, age: (!isAlive && cell.age > 0) ? cell.age + 1 : cell.age };
        }
      }
    }

    return nextGridState;
};

  
  const SimulationPage = () => {
    const { state, dispatch } = useGrid();
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(20);
    const [errorMessage, setErrorMessage] = useState('');
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [autoplay, setAutoplay] = useState(false);

    const toggleCell = useCallback((rowIndex, colIndex) => {
        dispatch({
            type: 'TOGGLE_CELL',
            payload: { row: rowIndex, col: colIndex }
        });
    }, [dispatch]);

    const handleInputChange = useCallback((e, type) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 3 && value <= 40) {
            setErrorMessage('');
            type === 'rows' ? setRows(value) : setCols(value);
        } else {
            setErrorMessage('Row and Column must be within 3 to 40');
        }
    }, []);

    const getCellColor = (cell, showHeatmap) => {
        if (showHeatmap) {
          const aliveColor = 'rgb(255, 0, 0)'; 
          const deadColor = 'rgb(0, 0, 255)';
      
          if (cell.status === 1) {
            
            return aliveColor;
          } else {
            
            let ageRatio = Math.min(cell.age, 10) / 10; 
            const redComponent = 255 * (1 - ageRatio);
            const blueComponent = 255 * ageRatio;
      
            if (cell.age === 0 && ageRatio === 0) {
      
              return deadColor;
            } else {
      
              return `rgb(${redComponent}, 0, ${blueComponent})`;
            }
          }
        } else {
      
          return cell.status === 1 ? 'black' : 'white';
        }
      };

    useEffect(() => {
        dispatch({ type: 'INITIALIZE_GRID', payload: createInitialGrid(rows, cols) });
    }, [rows, cols, dispatch]);

    const progressSimulation = useCallback(() => {
        dispatch({ type: 'PROGRESS_SIMULATION', payload: calculateNextGridState(state.grid) });
    }, [state.grid, dispatch]);

    useEffect(() => {
        let interval;
        if (autoplay) {
            interval = setInterval(progressSimulation, 100);
        }
        return () => clearInterval(interval);
    }, [autoplay, progressSimulation]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <div>Conway's Game of Life</div>
            <ControlPanel
                rows={rows}
                cols={cols}
                handleInputChange={handleInputChange}
                resetGrid={() => dispatch({ type: 'INITIALIZE_GRID', payload: createInitialGrid(rows, cols) })}
                progressSimulation={progressSimulation}
                toggleAutoplay={() => setAutoplay(!autoplay)}
                autoplay={autoplay}
                showHeatmap={showHeatmap}
                toggleHeatmap={() => setShowHeatmap(!showHeatmap)}
            />
            <ErrorMessage message={errorMessage} />
            <GridDisplay
                grid={state.grid}
                cols={cols}
                toggleCell={toggleCell}
                getCellColor={(cell) => getCellColor(cell, showHeatmap)}
            />
        <p style={{ marginTop: '10px' }}>Living Cells: {
            state.grid.flat().filter(cell => cell.status === 1).length
            }</p>
         {/*Back to HomePage */}
        <Link to="/"style={{ textDecoration: 'none', color: 'white', background: 'blue', padding: '10px 15px', borderRadius: '5px' }}>Go back to homepage</Link>

        </div>
        
    );
};

export default SimulationPage;