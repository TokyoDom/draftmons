import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DraftRoom from './components/DraftRoom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <DraftRoom />
      </div>
    </BrowserRouter>
  );
}

export default App;
