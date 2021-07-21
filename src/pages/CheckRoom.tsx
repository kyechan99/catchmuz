import React from 'react';
import './CheckRoom.scss';

import { BeforeButton } from '../components/Button/Button';
import { InputNickname } from '../components/Input/Input';

const Index = () => {
    const [code, setCode] = React.useState<string>('');

    return (
        <div className="container check-room">
            <BeforeButton></BeforeButton>

            <InputNickname onChange={setCode} placeholder="유튜브 코드"></InputNickname>

            <iframe 
                className="song-video"
                id="player" 
                width="560" height="315"
                src={`https://www.youtube.com/embed/${code}?autoplay=1`}
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>


        </div>
    )
}

export default Index;
