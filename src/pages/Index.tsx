import React from 'react';
import { useHistory } from 'react-router-dom';
import './Index.scss';

import { useDispatch } from 'react-redux';

import { PrimaryButton, } from '../components/Button/Button';
import { InputNickname } from '../components/Input/Input';

import { Profile } from '../components/Profile/Profile';

import LogoImg from '../assets/catchmuz_logo.png';


const Index = () => {
    const dispatch = useDispatch();

    const [ nickname, setNickname ] = React.useState('');
    const [ profileNum, setProfileNum ] = React.useState<number>(1);
    const [ colorNum, setColorNum ] = React.useState<number>(1);
    const history = useHistory();

    React.useEffect(() => {
        let randNum = Math.floor(Math.random() * 15) + 1;
        setColorNum(randNum);
        randNum = Math.floor(Math.random() * 17) + 1;
        setProfileNum(randNum);
    }, [])

    function goToLobby() {
        if (nickname.replace(/\s/g, '') === '' || nickname.length > 10)
            return;
        dispatch({type : 'user/NICKNAME', payload: nickname});
        dispatch({type : 'user/PROFILE', payload: { profileNum, colorNum } });
        history.push('/lobby');
    }

    function changeProfile() {
        let randColorNum = Math.floor(Math.random() * 15) + 1;
        setColorNum(randColorNum);

        setProfileNum(bT => {
            if (bT >= 17)
                return 1;
            return bT + 1;
        });
    }

    return (
        <div className="index-page">
            <img className="index-logo" src={LogoImg} alt="logo-img"/>

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
