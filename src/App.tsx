import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import './App.scss';
import './_grid.scss';

import Index from './pages/Index';
import Lobby from './pages/Lobby';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

const CLIENT_VERSION = 'v0.1.0';
const socket = io('http://localhost:4000');

const App = () => {
  const dispatch = useDispatch();

  const [serverVersion, setServerVersion] = React.useState<string>('');

  React.useEffect(() => {
    socket.on('my socket id', (data) => {
      console.log('my socket id', data);

      dispatch({type : 'user/SOCKET_ID', payload: data.socketId});

      console.log('Server Version ', data.server_version);

      setServerVersion(data.server_version);

      if (data.server_version === CLIENT_VERSION) {
        // serverVersion
      }

    });

    return () => {
      socket.close();
    };

  }, []);

  return (
    <div className="App">
      {
        serverVersion !== CLIENT_VERSION &&
        <div className="warning">
          <div className="warning-modal">
            <h1 className="warning-head">서버와 버전이 다릅니다.</h1>
            <p className="warning-desc">최신 클라이언트 버전으로 업데이트 하거나 구 서버를 사용해주세요.</p>
          </div>
        </div>
      }

      <Route path="/" component={() => 
        <Index
          client_version={CLIENT_VERSION}
        />
      } exact/>
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
