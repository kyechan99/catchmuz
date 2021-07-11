import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import './App.scss';
import './_grid.scss';

import Index from './pages/Index';
import Lobby from './pages/Lobby';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

const socket = io('http://localhost:4000');

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    socket.on('my socket id', (msg) => {
      console.log('my socket id', msg);

      dispatch({type : 'user/SOCKET_ID', payload: msg.socketId});
    });
  }, []);

  return (
    <div className="App">
      <Route path="/" component={Index} exact/>
      <Route path="/lobby" component={Lobby}/>
      <Route path="/create" component={CreateRoom}/>
      <Route path="/room/:id" component={Room}/>
    </div>
  );
}

export default App;
