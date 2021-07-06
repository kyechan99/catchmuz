import React from 'react';
import logo from './logo.svg';
import './App.scss';

import Index from './pages/Index';
import Lobby from './pages/Lobby';


import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Index} exact/>
      <Route path="/lobby" component={Lobby}/>
    </div>
  );
}

export default App;
