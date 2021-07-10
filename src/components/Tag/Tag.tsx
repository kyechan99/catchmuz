import React from 'react';
import './Tag.scss';

type TagProps = {
    className? : string,
    children? : React.ReactNode
}

export const Tag = ({ className, children } : TagProps) => {
    return (
        <div
            className={ "tag " + className }
        >
            { children }
        </div>
    )
}
