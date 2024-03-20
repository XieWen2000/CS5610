import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Welcome to Conway's Game of Life</h1>
      <p>
        Conway's Game of Life is a 'zero-player game' developed by the British mathematician John Horton Conway in 1970.
        The game is a cellular automaton, and it consists of a grid of cells which can live, die or multiply based on a set of mathematical rules.
      </p>
      <h2>Rules of the Game</h2>
      <ul>
        <li>A living cell with less than two living neighbours dies (as if caused by underpopulation).</li>
        <li>A living cell with two or three live neighbours lives on to the next generation.</li>
        <li>A living cell with more than three live neighbours dies (as if by overpopulation).</li>
        <li>A dead cell with exactly three live neighbours becomes a live cell (as if by reproduction).</li>
      </ul>
      <p>
        The initial pattern constitutes the 'seed' of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously.
      </p>
      <p>
        Through these simple rules, the Game of Life can produce a vast array of patterns. Some that are stable, some that oscillate, and others that move across the board.
      </p>
      <Link to="/SimulationPage" style={{ textDecoration: 'none', color: 'white', background: 'blue', padding: '10px 15px', borderRadius: '5px' }}>
        Start Simulation
      </Link>
      <Link to="/CreditsPage" style={{ marginLeft: '5px',textDecoration: 'none', color: 'white', background: 'blue', padding: '10px 15px', borderRadius: '5px' }}>
        Credit Page
      </Link>
    </div>
  );
};

export default HomePage;
