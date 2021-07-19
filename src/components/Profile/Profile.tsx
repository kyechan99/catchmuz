import React from 'react';
import './Profile.scss';

type ProfileProps = {
    profileNum : number,
    className? : string
    children? : React.ReactNode,
    color? : number
}

export const Profile = ({ profileNum, children, className = '', color = 1 } : ProfileProps) => {
    return (
        <div
            className={ `profile profile-${color} ` + className }
        >
            <img 
                className="profile-img"
                src={ require(`../../assets/profile/profile_${profileNum}.png`).default }
                alt={`profile_${profileNum}`}
            />
        </div>
    )
}

export const ProfileSM = ({ profileNum, className = '', color = 1 } : ProfileProps) => {
    return (
        <Profile
            className={ "profile-sm " + className }
            color={ color }
            profileNum={profileNum}>
        </Profile>
    )
}
