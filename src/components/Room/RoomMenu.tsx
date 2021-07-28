import React from 'react';
import { Link } from 'react-router-dom';
import './RoomMenu.scss';

type RoomMenuProps = {
    to: string
    children?: React.ReactNode
    curMem: number
    maxMem: number
    isPrimary?: boolean
}

export const RoomMenu = ({ to, children, curMem, maxMem, isPrimary = false } : RoomMenuProps) => {
    return (
        <Link
            to={ to }
        >
            <div
                className={`room${isPrimary ? ' room-primary': ''}`}
            >
                <span
                    className="room-title"
                >
                    { children }
                </span>
                <span className="room-member">
                    [ { curMem } / { maxMem } ]
                </span>
            </div>
        </Link>
    )
}
