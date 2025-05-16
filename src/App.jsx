import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import PickChar from './pages/PickChar'
import DiePage from './pages/DiePage'
import Game from './pages/Game'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pickchar" element={<PickChar />} />
        <Route path="/diepage" element={<DiePage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>

  );
}

export default App
