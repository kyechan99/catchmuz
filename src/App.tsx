import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import './App.scss';
import './_grid.scss';

import Index from './pages/Index';
import Lobby from './pages/Lobby';
import CreateRoom from './pages/CreateRoom';
import Setting from './pages/Setting';
import Room from './pages/Room';
import CheckRoom from './pages/CheckRoom';

const CLIENT_VERSION = 'v1.0.1';
const server_host = process.env.REACT_APP_SERVER_HOST || "localhost:4000";
const socket = io(server_host);

const NavBar = ({ path } : { path: string }) => {
  return (
    <div className="container navbar">
        <Link className={`navbar-menu ${path==='/lobby' && 'active'}`}  to="/lobby">로비</Link>
        <Link className={`navbar-menu ${path==='/setting' && 'active'}`}  to="/setting">설정</Link>
    </div>

  )
}

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

      {/* 
        [아무 소리 들리자 않는 비디오]
        모든 노래는 유투브 동영상으로 가져오기 때문에 키보드 fn 키 중 소리 조절 및 영상 일시 중지 등의 키가 모두 동작함
        빈 비디오를 틀어 노래 정보가 유출되지 않도록 막아줌
      */}
      <video className="song-video" height="10" width="10" autoPlay loop poster="./logo192.png" >
        <source src="/catch_muz.mp4" type="video/mp4"></source>
      </video>
      
      {
        serverVersion !== CLIENT_VERSION &&
        <div className="warning">
          {
            serverVersion === '' ?
            <div className="warning-modal">
              <h1 className="warning-head">⛔ 서버와 연결할 수 없습니다.</h1>
              <p className="warning-desc">서버가 닫혀 있습니다. 서버 관리자에게 문의하거나 직접 열어 플레이해보세요!</p>
              <a className="warning-help-url" href="https://github.com/kyechan99/catchmuz-server">서버 내가 열기</a>
            </div>
            :
            <div className="warning-modal">
              <h1 className="warning-head">⚠️ 서버와 클라이언트의 버전이 다릅니다.</h1>
              <p className="warning-desc">신규 버전의 클라이언트로 업데이트하거나 구 버전의 서버를 사용해주세요.</p>
              <a className="warning-help-url" href="https://github.com/kyechan99/catchmuz/releases">신규 버전 다운받기</a>
            </div>
          }
        </div>
      }

      <Route path="/" component={() => 
        <Index
        client_version={CLIENT_VERSION}
        server_version={serverVersion}
        />
      } exact/>
      <Route path="/lobby" component={() =>
        <>
          <NavBar path="/lobby" />
          <Lobby
            socket={ socket }
          />
        </>
      }/>
      <Route path="/setting" component={() =>
        <>
          <NavBar path="/setting" />
          <Setting/>
        </>
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
