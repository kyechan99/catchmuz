import React from 'react';
import { Link } from 'react-router-dom';
import './Notice.scss';

type NoticeMenuProps = {
    to: string
    children?: React.ReactNode
    curMem: number
    maxMem: number
    isPrimary: boolean
}

export const NoticeMenu = ({ to, children, curMem, maxMem, isPrimary = false } : NoticeMenuProps) => {
    return (
        <Link
            to={ to }
        >
            <div
                className={`notice${isPrimary ? ' notice-primary': ''}`}
            >
                <span
                    className="notice-title"
                >
                    { children }
                </span>
                <span className="notice-member">
                    [ { curMem } / { maxMem } ]
                </span>
            </div>
        </Link>
    )
}
