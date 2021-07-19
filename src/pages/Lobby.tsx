import React from 'react';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import './Lobby.scss';

import { Button, PointButton } from '../components/Button/Button';
import { RoomMenu } from '../components/Room/RoomMenu';

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
    const [roomList, setRoomList] = React.useState<RoomType>({});

    React.useEffect(() => {
        getRoomList();

        socket.on('get room list', refreshRoomList);

        return () => {
            socket.off('get room list', refreshRoomList);
        }
    }, []);

    // 방 목록 새로고침 원할때 호출
    function getRoomList() {
        socket.emit('get room list');
    }

    // 받아온 데이터로 방 목록을 새로고침
    function refreshRoomList(data: any) {
        console.log(data);
        setRoomList(data);
    }

    return (
        <div className="container">
            <h1 className="lobby-title">로비</h1>

            <div className="lobby-menu">
                <Button clicked={getRoomList}>
                    새로고침
                </Button>
                <Link to="/create" className="btn-create-room">
                    <PointButton>
                        방 생성하기
                    </PointButton>
                </Link>
            </div>

            <div className="room-list">
                {
                    roomList ?
                    Object.keys(roomList).map((objectKey) => {
                        return <RoomMenu to={`/room/${objectKey}`} curMem={roomList[objectKey].curUserNum} maxMem={roomList[objectKey].maxUserNum} key={objectKey}>
                            {
                                roomList[objectKey].songTags.map(tag => `#${tag} `)
                            }
                        </RoomMenu>
                    })
                    :
                    <p>생성된 방이 없습니다.</p>
                }
            </div>
        </div>
    )
}

export default Lobby;
