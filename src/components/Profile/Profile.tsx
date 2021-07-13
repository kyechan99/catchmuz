import React from 'react';
import './Profile.scss';

type ProfileProps = {
    profileNum : number,
    className? : string
    children? : React.ReactNode
}

export const Profile = ({ profileNum, children, className } : ProfileProps) => {
    return (
        <div
            className={ "profile " + className }
        >
            <img 
                className="profile-img"
                src={`/profile/profile_${profileNum}.png`}
                alt="profile"
            />
        </div>
    )
}

export const ProfileSM = ({ profileNum, className } : ProfileProps) => {
    return (
        <Profile
            className={ "profile-sm " + className }
            profileNum={profileNum}>
        </Profile>
    )
}
