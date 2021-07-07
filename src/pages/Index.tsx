import React from 'react';
import { useHistory } from 'react-router-dom';
import './Index.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setNickname, setProfile } from '../modules/user';

import { PrimaryButton, } from '../components/Button/Button';
import { InputNickname } from '../components/Input/Input';

const Index = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [nickname, setNickname] = React.useState('');
    const history = useHistory();

    function goToLobby() {
        console.log(nickname);
        if (nickname == '')
            return;
        dispatch({type : 'user/NICKNAME', payload: nickname});
        // dispatch(setNickname(nickname));
        history.push('/lobby');    
    }

    return (
        <div className="index-page">
            <h1 className="index-title title-1">CATCH</h1>
            <h1 className="index-title title-2">MUZ</h1>

            <InputNickname onChange={setNickname}></InputNickname>

            <br/>
                        
            <PrimaryButton clicked={goToLobby}>시작</PrimaryButton>
        </div>
    )
}

export default Index;
