import React from 'react';
import './Button.scss';

import { useHistory } from 'react-router-dom';

type ButtonProps = {
    children? : React.ReactNode,
    className? : string,
    clicked? : (e: any) => void,
    disabled? : boolean
    onContextMenu? : any
}

export const Button = ({ children, className = '', clicked, onContextMenu, disabled = false } : ButtonProps) => {
    return (
        <button 
            className={`btn ${className} ${disabled ? 'disabled' : ''}`}
            onClick={ clicked }
            disabled={ disabled }
            onContextMenu={ onContextMenu }
        >
            { children }
        </button>
    )
}
export const PrimaryButton = ({ children, className, clicked, disabled = false } : ButtonProps) => {
    return (
        <Button
            className={`btn-primary ${className}`}
            clicked={ clicked }
            disabled={ disabled }
        >
            { children }
        </Button>
    )
}
export const PointButton = ({ children, className, clicked, disabled = false } : ButtonProps) => {
    return (
        <Button
            className={`btn-point ${className}`}
            clicked={ clicked }
            disabled={ disabled }
        >
            { children }
        </Button>
    )
}
export const SecondaaryButton = ({ children, className, clicked, disabled = false } : ButtonProps) => {
    return (
        <Button
            className={`btn-secondary ${className}`}
            clicked={ clicked }
            disabled={ disabled }
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
export const HomeButton = () => {
    const history = useHistory();
    
    return (
        <Button
            className="btn-outline btn-before"
            clicked={ () => history.push('/lobby') }
        >
            <svg 
                className="svg-home"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="30" 
                height="30"
            >
                <path 
                    fillRule="evenodd" 
                    d="M11.03 2.59a1.5 1.5 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403L12 3.734z"
                >
                </path>
            </svg>
        </Button>
    )
}

type TagButtonProps = {
    children? : React.ReactNode
    clicked : () => void
    isSelected : boolean
    isUnSelected : boolean
}

export const TagButton = ({ children, clicked, isSelected, isUnSelected } : TagButtonProps) => {
    return (
        <Button
            className={"btn-tag" + (isSelected ? " tag-selected " : "") + (isUnSelected ? " tag-unselected " : "")}
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

type SkipButtonProps = {
    className? : string,
    children?: React.ReactNode,
    disabled? : boolean
    clicked? : () => void
}

export const SkipButton = ({ children, clicked, className = '', disabled = false } : SkipButtonProps) => {
    return (
        <Button
            className={ className }
            clicked={ clicked }
            disabled={disabled}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
                <path
                    className="btn-icon"
                    d="M8.46,8.29A1,1,0,1,0,7,9.71L9.34,12,7,14.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3a1,1,0,0,0,0-1.42Zm8.5,3-3-3a1,1,0,0,0-1.42,1.42L14.84,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,17,11.29Z"
                />
            </svg>
            { children }
        </Button>
    )
}