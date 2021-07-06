import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Index.scss';

import { PrimaryButton, PointButton } from '../components/Button';

const Index = () => {
    return (
        <div className="index-page">
            <h1 className="index-title title-1">CATCH</h1>
            <h1 className="index-title title-2">SONG</h1>

            <input className="input-nickname" />
            <Link to="/lobby">
                <PrimaryButton clicked={() => { console.log('시작 ! '); }}>시작</PrimaryButton>
            </Link>

            <PointButton clicked={() => {}}>종료하기</PointButton>
        </div>
    )
}

export default Index;
