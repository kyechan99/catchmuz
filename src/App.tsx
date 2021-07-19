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
    socket.on('my socket id', (data) => {
      console.log('my socket id', data);

      dispatch({type : 'user/SOCKET_ID', payload: data.socketId});
    });

    // socket.on('get room list', (data) => {
    //   console.log('grl', data);
    //   // TODO : 

    // });

    return () => {
      socket.close();
    };

  }, []);



  return (
    <div className="App">
      <h1>App</h1>
      <Route path="/" component={Index} exact/>
      <Route path="/lobby" component={() =>
        <Lobby
          socket={ socket }
        />
      }/>
      <Route path="/create" component={() => 
        <CreateRoom
          socket={ socket }
        />
      }/>
      <Route path="/room/:roomCode" component={() => 
        <Room
          socket={ socket }
        />
      }/>
    </div>
  );
}

export default App;
