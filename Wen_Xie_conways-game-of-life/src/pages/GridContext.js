
import React, { createContext, useContext, useReducer } from 'react';

const GridContext = createContext();


const gridReducer = (state, action) => {
  switch (action.type) {

    case 'INITIALIZE_GRID':
      return { ...state, grid: action.payload };

    case 'TOGGLE_CELL':
        const newGrid = state.grid.map((row, rowIndex) => {
          if (rowIndex === action.payload.row) {
            return row.map((cell, colIndex) => {
              if (colIndex === action.payload.col) {

                return { ...cell, status: cell.status === 1 ? 0 : 1 };
              }
              return cell;
            });
          }
          return row;
        });
        return { ...state, grid: newGrid };
    case 'PROGRESS_SIMULATION':

        return { ...state, grid: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};


export const GridProvider = ({ children }) => {
  const initialState = { grid: [] };
  const [state, dispatch] = useReducer(gridReducer, initialState);

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => useContext(GridContext);
