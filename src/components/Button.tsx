import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Button.scss';

type ButtonProps = {
    children? : React.ReactNode,
    className? : string
    clicked?: () => void
}

export const Button = ({ children, className, clicked } : ButtonProps) => {
    return (
        <button 
            className={`btn ${className}`}
            onClick={ clicked }
        >
            { children }
        </button>
    )
}
export const PrimaryButton = ({ children, clicked } : ButtonProps) => {
    return (
        <Button
            className="btn-primary"
            clicked={ clicked }
        >
            { children }
        </Button>
    )
}
export const PointButton = ({ children, clicked } : ButtonProps) => {
    return (
        <Button
            className="btn-point"
            clicked={ clicked }
        >
            { children }
        </Button>
    )
}
