import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import './App.scss';
import './_grid.scss';

import Index from './pages/Index';
import Lobby from './pages/Lobby';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';
import CheckRoom from './pages/CheckRoom';

const CLIENT_VERSION = 'v0.1.1';
const socket = io('http://localhost:4000');
// const socket = io('https://catch-muz.herokuapp.com');

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
          {
            serverVersion === '' ?
            <div className="warning-modal">
              <h1 className="warning-head">서버와 연결할 수 없습니다.</h1>
              <p className="warning-desc">서버가 닫혀 있습니다. 서버 관리자에게 문의하거나 직접 열어 플레이해보세요!</p>
              <a className="warning-help-url" href="https://github.com/kyechan99/catchmuz-server">서버 내가 열기</a>
            </div>
            :
            <div className="warning-modal">
              <h1 className="warning-head">서버와 클라이언트의 버전이 다릅니다.</h1>
              <p className="warning-desc">신규 버전의 클라이언트로 업데이트하거나 구 버전의 서버를 사용해주세요.</p>
              <a className="warning-help-url" href="https://github.com/kyechan99/catchmuz/releases">신규 버전 다운받기</a>
            </div>
          }
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
      <Route path="/checkroom" component={() => 
        <CheckRoom
        />
      }/>
    </div>
  );
}

export default App;
