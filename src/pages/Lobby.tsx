import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Lobby.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';

import { PointButton } from '../components/Button/Button';

import { RoomMenu } from '../components/Room/RoomMenu'
import { Socket } from 'socket.io-client';

type LobbyProps = {
    socket: Socket
}
type RoomType = {
    [objectKey : string]: {
        songTags: string[]
        maxSongNum: number
        maxUserNum: number
        curUserNum: number
        userList: object[]
        isPlaying: boolean
    }
}

const Lobby = ({ socket } : LobbyProps) => {
    const user = useSelector((state: RootState) => state.user);
    const [roomList, setRoomList] = React.useState<RoomType>({});

    React.useEffect(() => {
        getRoomList();

        socket.on('get room list', refreshRoomList);

        return () => {
            socket.off('get room list', refreshRoomList);
        }
    }, []);

    function getRoomList() {
        socket.emit('get room list');
    }

    function refreshRoomList(data: any) {
        setRoomList(data);
    }

    return (
        <div className="container">
            
            <h1>Lobby{ user.nickname } </h1>
            <div className="room-list">
                {
                    roomList && Object.keys(roomList).map((objectKey) => {
                        return <RoomMenu to={`/${objectKey}`} curMem={roomList[objectKey].curUserNum} maxMem={roomList[objectKey].maxUserNum} key={objectKey}>
                            {
                                roomList[objectKey].songTags.map(tag => `#${tag} `)
                            }
                        </RoomMenu>
                    })
                }
                {/* <RoomMenu to="/dd" curMem={3} maxMem={4}>#랩 #2020</RoomMenu>
                <RoomMenu to="/dd" curMem={3} maxMem={4}>#K-POP #아이돌 #최신</RoomMenu>
                <RoomMenu to="/dd" curMem={3} maxMem={4}>#솔로 #차트</RoomMenu>
                <RoomMenu to="/dd" curMem={3} maxMem={4}>#2021</RoomMenu> */}
            </div>

            <div className="lobby-menu">
                <Link to="/create" className="btn-create-room">
                    <PointButton>
                        방 생성하기
                    </PointButton>
                </Link>
            </div>
        </div>
    )
}

export default Lobby;
