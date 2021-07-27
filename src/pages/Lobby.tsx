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

            <div className="container-box">
                <div className="info-list row">
                    <div className="col-8">
                        <button className="btn btn-update">
                            업데이트 내용 보기
                        </button>
                    </div>
                    <div className="col-8">
                        <button className="btn btn-help">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
                                <path fill="#FFF" d="M15.33252,9.5A3.5001,3.5001,0,0,0,8.80127,7.75a1.00016,1.00016,0,0,0,1.73242,1A1.50266,1.50266,0,0,1,11.83252,8a1.5,1.5,0,1,1,0,3h-.00244a.94984.94984,0,0,0-.18927.0387,1.03181,1.03181,0,0,0-.19861.04065.98275.98275,0,0,0-.15552.10485,1.00813,1.00813,0,0,0-.162.10975,1.00464,1.00464,0,0,0-.11706.1737.97789.97789,0,0,0-.09668.14417,1.02252,1.02252,0,0,0-.04285.21191A.94847.94847,0,0,0,10.83252,12v1l.00232.01135.0011.49109a1.00016,1.00016,0,0,0,1,.99756h.00244a1.00006,1.00006,0,0,0,.99756-1.00244l-.00153-.66138A3.49363,3.49363,0,0,0,15.33252,9.5Zm-4.20264,6.79A1,1,0,0,0,11.82959,18a1.036,1.036,0,0,0,.71045-.29,1.01517,1.01517,0,0,0,0-1.41992A1.03425,1.03425,0,0,0,11.12988,16.29Z"/>
                            </svg> */}
                            플레이 방법
                        </button>
                    </div>
                </div>

                <div className="room-list">
                    {
                        Object.keys(roomList).length > 0 ?
                        Object.keys(roomList).map((objectKey, idx) => {
                            return <RoomMenu to={`/room/${objectKey}`} curMem={roomList[objectKey].curUserNum} maxMem={roomList[objectKey].maxUserNum} key={objectKey} isPrimary={idx === 0}>
                                {
                                    roomList[objectKey].songTags.map(tag => `#${tag}   `)
                                }
                            </RoomMenu>
                        })
                        :
                        <div className="room-404">
                            <h1>입장 가능한 방이 없습니다.</h1>
                            <p>방을 생성하고 초대해보세요 !</p>
                            <p>새로고침 버튼을 이용해 방 목록을 다시 불러올 수 있습니다.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Lobby;
