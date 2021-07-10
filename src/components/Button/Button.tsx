import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Button.scss';

import { useHistory } from 'react-router-dom';

type ButtonProps = {
    children? : React.ReactNode,
    className? : string
    clicked? : () => void
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
export const PrimaryButton = ({ children, className, clicked } : ButtonProps) => {
    return (
        <Button
            className={`btn-primary ${className}`}
            clicked={ clicked }
        >
            { children }
        </Button>
    )
}
export const PointButton = ({ children, className, clicked } : ButtonProps) => {
    return (
        <Button
            className={`btn-point ${className}`}
            clicked={ clicked }
        >
            { children }
        </Button>
    )
}
export const BeforeButton = () => {
    const history = useHistory();
    
    return (
        <Button
            className="btn-outline btn-before"
            clicked={ history.goBack }
        >
            <svg 
                className="svg-before"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="30" 
                height="30"
            >
                <path 
                    fillRule="evenodd" 
                    d="M8.854 11.646l5.792-5.792a.5.5 0 01.854.353v11.586a.5.5 0 01-.854.353l-5.792-5.792a.5.5 0 010-.708z"
                >
                </path>
            </svg>
        </Button>
    )
}

type TagButtonProps = {
    children? : React.ReactNode,
    clicked? : () => void,
    isSelected : boolean
}

export const TagButton = ({ children, clicked, isSelected } : TagButtonProps) => {
    return (
        <Button
            className={"btn-tag " + (isSelected && "tag-selected")}
            clicked={ clicked }
        >
            { children }   
        </Button>
    )
}

type ImgButtonProps = {
    children? : React.ReactNode,
    clicked? : () => void,
    src : string,
    isActive?: boolean
}
export const ImgButton = ({ children, clicked, src, isActive = false } : ImgButtonProps) => {
    return (
        <Button
            className={"btn-img " + (isActive && "active")}
            clicked={ clicked }
        >
            <img 
                className="img"
                src={src}
                alt="img-bt"
            />   
        </Button>
    )
}
