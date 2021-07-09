import React from 'react';
import './App.scss';
import './_grid.scss';

import Index from './pages/Index';
import Lobby from './pages/Lobby';
import CreateRoom from './pages/CreateRoom';

import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Index} exact/>
      <Route path="/lobby" component={Lobby}/>
      <Route path="/create" component={CreateRoom}/>
    </div>
  );
}

export default App;
