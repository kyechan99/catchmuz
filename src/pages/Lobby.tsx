import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Lobby.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';

import { PointButton } from '../components/Button/Button';

import { Room } from '../components/Room/Room'

const Lobby = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="container">
            <h1>Lobby</h1>
            <div className="room-list">
                <Room to="/dd" curMem={3} maxMem={4}>#랩 #2020</Room>
                <Room to="/dd" curMem={3} maxMem={4}>#K-POP #아이돌 #최신</Room>
                <Room to="/dd" curMem={3} maxMem={4}>#솔로 #차트</Room>
                <Room to="/dd" curMem={3} maxMem={4}>#2021</Room>
            </div>

            {/* { user.nickname }
            { user.profile }
            <iframe 
                id="player" 
                width="560" height="315" 
                src="https://www.youtube.com/embed/QnjslF3V44A?autoplay=1" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

            <Link to="/">메인으로</Link> */}
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
