import React from 'react';
import { useHistory } from 'react-router-dom';
import './Index.scss';

import { useDispatch } from 'react-redux';

import { PrimaryButton, } from '../components/Button/Button';
import { InputNickname } from '../components/Input/Input';

import { Profile } from '../components/Profile/Profile';

const Index = () => {
    const dispatch = useDispatch();

    const [ nickname, setNickname ] = React.useState('');
    const [ profileNum, setProfileNum ] = React.useState<number>(1);
    const [ colorNum, setColorNum ] = React.useState<number>(1);
    const history = useHistory();

    function goToLobby() {
        if (nickname.replace(/\s/g, '') === '')
            return;
        dispatch({type : 'user/NICKNAME', payload: nickname});
        dispatch({type : 'user/PROFILE', payload: { profileNum, colorNum } });
        history.push('/lobby');
    }

    function changeProfile() {
        setColorNum(bT => {
            if (bT >= 5)
                return 1;
            return bT + 1;
        });

        setProfileNum(bT => {
            if (bT >= 17)
                return 1;
            return bT + 1;
        });
    }

    return (
        <div className="index-page">
            <h1 className="index-title title-1">CATCH</h1>
            <h1 className="index-title title-2">MUZ</h1>

            <div className="index-input-profile">
                <button className="btn-profile" onClick={changeProfile}>
                    <Profile profileNum={ profileNum } color={ colorNum }/>
                </button>
                <br/>
                <InputNickname onChange={setNickname}></InputNickname>
            </div>

            <br/>
                        
            <PrimaryButton clicked={goToLobby}>시작</PrimaryButton>
        </div>
    )
}

export default Index;
