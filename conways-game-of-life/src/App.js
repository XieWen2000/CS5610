// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GridProvider } from './pages/GridContext';
import HomePage from './pages/HomePage';
import SimulationPage from './pages/SimulationPage';
import CreditsPage from './pages/CreditsPage';

function App() {
  return (
    <GridProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/SimulationPage" element={<SimulationPage />} />
          <Route path="/CreditsPage" element={<CreditsPage />} />
        </Routes>
      </Router>
    </GridProvider>
  );
}

export default App;
