import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Lobby.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';

import { PointButton } from '../components/Button/Button';

import { RoomMenu } from '../components/Room/RoomMenu'

const Lobby = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="container">
            <h1>Lobby</h1>
            <div className="room-list">
                <RoomMenu to="/dd" curMem={3} maxMem={4}>#랩 #2020</RoomMenu>
                <RoomMenu to="/dd" curMem={3} maxMem={4}>#K-POP #아이돌 #최신</RoomMenu>
                <RoomMenu to="/dd" curMem={3} maxMem={4}>#솔로 #차트</RoomMenu>
                <RoomMenu to="/dd" curMem={3} maxMem={4}>#2021</RoomMenu>
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
