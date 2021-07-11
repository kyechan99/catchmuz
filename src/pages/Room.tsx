import React from 'react';
import './Room.scss';

import { BeforeButton } from '../components/Button/Button';
import { SpinnerSM, SpinnerMD, SpinnerLG, SpinnerXL } from '../components/Spinner/Spinner';
import { Tag } from '../components/Tag/Tag';

import { Chat, MyChat } from '../components/Chat/Chat';

type ChatType = {
    msg: string
    author: string
    profileNum: number
}

const Room = () => {
    // 현재까지 진행한 노래 수
    const [playedSong, setPlayedSong] = React.useState<number>(1);
    // 타이머
    const [time, setTime] = React.useState<number>(3);

    // 채팅 내역
    const [chatLogs, setChatLogs] = React.useState<ChatType[]>([]);
    // 채팅 로그 Ref
    const chatLogsRef = React.useRef<HTMLDivElement>(null);
    // 메세지 입력
    const [msg, setMsg] = React.useState<string>('');

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

    React.useEffect(() => {
        if (chatLogsRef.current) {
            chatLogsRef.current.addEventListener('DOMNodeInserted', e => {
                chatLogsRef.current?.scroll({
                    top: chatLogsRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }
    }, [])

    function sendChat() {
        if (msg.replace(/\s/g, '') === '') {
            setMsg('');
            return;
        }

        setChatLogs(beforeChatLogs => [...beforeChatLogs, {
            msg: msg,
            author: 'ME2',
            profileNum: 3
        }]);

        setMsg('');
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
                    <div className="chat-logs" ref={chatLogsRef}>
                        {
                            chatLogs.map((chat, idx) => {
                                if (chat.author === 'ME')
                                    return <MyChat key={ idx }>{ chat.msg }</MyChat>
                                
                                return <Chat
                                            profileNum={ chat.profileNum }
                                            author={ chat.author }
                                            key={ idx }
                                        >
                                            { chat.msg }
                                        </Chat>
                            })
                        }

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
