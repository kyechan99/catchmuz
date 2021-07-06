import React from 'react';
import { Route, Link } from 'react-router-dom';

const Lobby = () => {
    return (
        <div>
            <h1>Lobby page</h1>

            <iframe 
                id="player" 
                width="560" height="315" 
                src="https://www.youtube.com/embed/QnjslF3V44A?autoplay=1" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

            <Link to="/">메인으로</Link>
        </div>
    )
}

export default Lobby;
