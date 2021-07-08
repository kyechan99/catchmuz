import React from 'react';
import { Link } from 'react-router-dom';
import './Room.scss';

type RoomProps = {
    to: string
    children: string
    curMem: number
    maxMem: number
}

export const Room = ({ to, children, curMem, maxMem } : RoomProps) => {
    return (
        <Link
            to={ to }
        >
            <div
                className="room"
            >
                <span
                    className="room-title"
                >
                    { children }
                </span>
                <span className="room-member">
                    { curMem } / { maxMem }
                </span>
            </div>
        </Link>
    )
}
