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
