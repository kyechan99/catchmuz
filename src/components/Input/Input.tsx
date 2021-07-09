import React from 'react';
import './Input.scss';

type InputProps = {
    onChange: (s: string) => void
}

export const InputNickname = ({ onChange } : InputProps) => {
    return (
        <input 
            className="input-nickname" 
            onChange={(e) => { 
                onChange(e.target.value);
            }}
            placeholder="닉네임을 입력해주세요."
        />
    )
}

type InputGroupProps = {
    label: string
    value: number
    onChange: (s: number) => void
}
export const InputGroup = ({ label, value, onChange } : InputGroupProps) => {
    return (
        <div className="input-group">
            <label className="input-label">{ label }</label>
            <input
                className="input-number" 
                type="number"
                value={value}
                onChange={(e) => {
                    onChange(Number(e.target.value));
                }}
            >
            </input>
        </div>
    )
}