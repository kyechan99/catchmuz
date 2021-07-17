import React from 'react';
import './Chat.scss';

import { ProfileSM } from '../Profile/Profile';

type ChatProps = {
    className? : string
    profileNum : number
    color? : number
    author : string
    children? : React.ReactNode
    isPrimary? : boolean
    isPoint? : boolean
}

export const Chat = ({ children, profileNum, color = 1, author, isPrimary = false, isPoint = false, className = '' } : ChatProps) => {
    return (
        <div className={ `chat ${isPrimary && 'chat-primary'} ${isPoint && 'chat-point'} ${className}` }>
            <div className="chat-info">
                <ProfileSM profileNum={profileNum} color={color}></ProfileSM>
                <span className="chat-author">{ author }</span>
            </div>
            <div className="chat-message">
                { children }
            </div>
        </div>
    )
}

type MyChatProps = {
    className? : string
    children? : React.ReactNode
    isPrimary? : boolean
    isPoint? : boolean
}
export const MyChat = ({ children, isPrimary = false, isPoint = false, className = '' } : MyChatProps) => {
    return (
        <div className={ `chat my-chat ${isPrimary && 'chat-primary'} ${isPoint && 'chat-point'} ${className}` }>
            <div className="chat-message">
                { children }
            </div>
        </div>
    )
}