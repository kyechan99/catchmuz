import React from 'react';
import './PlayerInfo.scss';

import { ProfileSM } from '../Profile/Profile';
import { PointButton, SecondaaryButton } from '../Button/Button';

import { UserType } from '../../types/game';

type PlayerInfoProps = {
    isSelectMe : boolean
    user : UserType
    isManager : boolean
    children? : React.ReactNode
    selectUser : (value: string | ((prevVar: string) => string)) => void
    clicked : (target: string) => void
    isMe : boolean
}

export const PlayerInfo = ({ isSelectMe, selectUser, user, children, isManager, clicked, isMe } : PlayerInfoProps) => {
    return (
        <div className="player">
        <button className="player-info" onClick={ () => { if (!isMe) selectUser(before => { return before === user.socketId ? '' : user.socketId }) }}>
            <ProfileSM profileNum={user.profile} color={user.color}></ProfileSM>
            <p className="player-name">
                {user.nickname}
                <span className="player-score"> {user.answer} </span>
            </p>
        </button>
        {
            isSelectMe && 
            <div className="player-detail">
                {
                    isManager ?
                    <>
                        <p className="detail-msg">강제 퇴장 시키겠습니까?</p>
                        <div className="detail-menu">
                            <PointButton clicked={ () => clicked(user.socketId) }>네</PointButton>
                            <SecondaaryButton clicked={ () => selectUser('') }>취소</SecondaaryButton>
                        </div>
                    </>
                    :
                    <>
                        <p className="detail-msg">강제 퇴장은 방장만 가능합니다.</p>
                        <button className="btn-close-detail" onClick={ () => selectUser('') }>X</button>
                    </>
                }
            </div>
        }
        </div>
    )
}
