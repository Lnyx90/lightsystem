import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import PickChar from './pages/PickChar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pickchar" element={<PickChar />} />
      </Routes>
    </Router>

  );
}

export default App
