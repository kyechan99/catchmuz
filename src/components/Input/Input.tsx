import React from 'react';
import './Input.scss';

type InputProps = {
    onChange: (e: any) => void,
    className?: string,
    placeholder?: string
}

export const Input = ({ onChange, placeholder = '', className = '' } : InputProps) => {
    return (
        <input 
            className={`input ${className}`} 
            onChange={(e) => { 
                onChange(e.target.value);
            }}
            placeholder={placeholder}
        />
    )
}


export const InputNickname = ({ onChange, placeholder = '', className = '' } : InputProps) => {
    return (
        <Input 
            className={`input-nickname ${className}`} 
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

type InputGroupProps = {
    label: string
    value: number
    onChange: (s: number) => void
    warning?: boolean
    warningMsg?: string
}
export const InputGroup = ({ label, value, onChange, warning = false, warningMsg = '' } : InputGroupProps) => {
    return (
        <div className={`input-group ${warning ? 'input-warning': ''}`}>
            <label className="input-label">
                { label }
                { warning && <span className="input-warning-msg">{warningMsg}</span> }
            </label>
            <input
                className="input-number" 
                type="number"
                value={value}
                min="2"
                onChange={(e) => {
                    onChange(Number(e.target.value));
                }}
            >
            </input>
            
        </div>
    )
}