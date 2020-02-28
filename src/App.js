import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DraftRoom from './components/DraftRoom';
import CreateRoom from './components/CreateRoom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={CreateRoom}/>
          <Route path='/room/:id' component={DraftRoom}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
