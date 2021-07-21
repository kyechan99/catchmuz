import React from 'react';
import './Input.scss';

type InputProps = {
    onChange: (s: string) => void,
    className?: string,
    placeholder?: string
}

export const InputNickname = ({ onChange, placeholder = '', className = '' } : InputProps) => {
    return (
        <input 
            className={`input-nickname ${className}`} 
            onChange={(e) => { 
                onChange(e.target.value);
            }}
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