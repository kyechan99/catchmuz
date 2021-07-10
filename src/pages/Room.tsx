import React from 'react';
import './Room.scss';

import { BeforeButton } from '../components/Button/Button';
import { SpinnerSM, SpinnerMD, SpinnerLG, SpinnerXL } from '../components/Spinner/Spinner';
import { Tag } from '../components/Tag/Tag';

import { Chat, MyChat } from '../components/Chat/Chat';

const Room = () => {
    const [playedSong, setPlayedSong] = React.useState<number>(1);
    const [time, setTime] = React.useState<number>(3);

    const [msg, setMsg] = React.useState<string>('');
    
    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const countdown = setInterval(() => {
          if (time > 0) {
            setTime(time - 1);
          }
          if (time === 0) {
            clearInterval(countdown);
          }
        }, 1000);
        return () => clearInterval(countdown);
    }, [time]);

    function sendChat() {
        if (msg === '') {
            return;
        }
        setMsg('');
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
            console.log(bottomRef.current);
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        }
    }

    return (
        <div className="container-fluid">
            {
                time > 0 &&
                <iframe 
                    className="song-video"
                    id="player" 
                    width="560" height="315"
                    src="https://www.youtube.com/embed/QnjslF3V44A?autoplay=1" 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            }

            <div className="row">
                <div className="col-md-8 main">
                    <BeforeButton></BeforeButton>
                    
                    <p className="remaining-songs">{playedSong} / 10</p>

                    <div className="answer-group">
                        <h3 className="answer-member">정답자 : AABB</h3>
                        <h2 className="answer-song">광장동에서 - 창모</h2>
                    </div>

                    <div className="spinner-parent">
                        <SpinnerSM></SpinnerSM>
                        <SpinnerMD></SpinnerMD>
                        <SpinnerLG></SpinnerLG>
                        <SpinnerXL></SpinnerXL>
                        <svg className="play-icon" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor"></path>
                        </svg>
                        <p className="timer">{time} 초</p>
                    </div>

                    <div className="song-info">
                        <div className="song-tags">
                            <Tag className={'tag-primary'}>힙합</Tag>
                            <Tag className={'tag-primary'}>2020</Tag>
                            <Tag>트렌드</Tag>
                        </div>
                    </div>

                </div>
                <div className="col-md-4 chat-box">
                    <div className="chat-logs" ref={bottomRef}>
                        <Chat author={'닉네임'} profileNum={3}>시간을 달려서</Chat>
                        <Chat isPrimary={true} author={'우정잉'} profileNum={5}>광장동에서</Chat>
                        <Chat author={'궁시렁궁시렁'} profileNum={6}>아 이거 진짜 모르겠는데 ㅋㅋㅋ 아시는분?</Chat>
                        <MyChat isPrimary={true}>와 이걸 모른다고??</MyChat>
                        <Chat author={'닉네임'} profileNum={3}>시간을 달려서</Chat>
                        <Chat author={'궁시렁궁시렁'} profileNum={6}>아 이거 진짜 모르겠는데 ㅋㅋㅋ 아시는분?</Chat>
                        <Chat author={'닉네임'} profileNum={3}>시간을 달려서</Chat>
                        <Chat author={'우정잉'} profileNum={5}>광장동에서</Chat>
                        <Chat author={'궁시렁궁시렁'} profileNum={6}>아 이거 진짜 모르겠는데 ㅋㅋㅋ 아시는분?</Chat>
                    </div>
                    <div className="chat-send">
                        <input 
                            className="chat-input"
                            type="text"
                            value={msg}
                            onChange={ (e) => {
                                setMsg(e.target.value);
                            }}
                            onKeyPress={ (e) => {
                                if (e.key === 'Enter') sendChat();
                            }}
                        >
                        </input>
                        <button className="chat-submit" onClick={sendChat}>전송</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;
