import React from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import './Room.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import { BeforeButton } from '../components/Button/Button';
import { SpinnerSM, SpinnerMD, SpinnerLG, SpinnerXL } from '../components/Spinner/Spinner';
import { Chat, MyChat } from '../components/Chat/Chat';
import { Tag } from '../components/Tag/Tag';
import { ProfileSM } from '../components/Profile/Profile'

type RoomProps = {
    socket: Socket
}

type UserType = {
    nickname: string
    profile: number
    color: number
    socketId: string
    answer: number 
};

type ChatType = {
    msg: string
    socketId: string
    author: string
    profileNum: number
    color: number
    isAnswer: boolean
}

type SongType = {
    name: string
    code: string
    start: number
    tags: string[]
    answer: string[]
}

const Room = ({ socket } : RoomProps) => {
    const user = useSelector((state: RootState) => state.user);

    // TODO : 비정상적 루트로 방으로 들어왔을때 강퇴 (웹 지원하게 될시 필요함. 현재 electron 빌드에선 불필요)
    // 방 고유 번호
    const { roomCode } = useParams<{ roomCode: string }>();

    // 현재까지 진행한 노래 수
    const [playedSong, setPlayedSong] = React.useState<number>(1);
    // 타이머
    const [time, setTime] = React.useState<number>(100);

    // 채팅 내역
    const [chatLogs, setChatLogs] = React.useState<ChatType[]>([]);
    // 채팅 로그 Ref
    const chatLogsRef = React.useRef<HTMLDivElement>(null);
    // 메세지 입력
    const [msg, setMsg] = React.useState<string>('');

    // 유저 목록
    const [userList, setUserList] = React.useState<UserType[]>([]);
    // 방장인지
    const [isManager, setManager] = React.useState<boolean>(false);

    const [songData, setSongData] = React.useState<SongType | null>(null);
    const [answerUser, setAnswerUser] = React.useState<string>('');
    // const [songNum, setSongNum] = React.useState<number>({});

    // React.useEffect(() => {
    //     const countdown = setInterval(() => {
    //       if (time > 0) {
    //         setTime(time - 1);
    //       }
    //       if (time === 0) {
    //         clearInterval(countdown);
    //       }
    //     }, 1000);
    //     return () => clearInterval(countdown);
    // }, [time]);

    React.useEffect(() => {
        if (chatLogsRef.current) {
            chatLogsRef.current.addEventListener('DOMNodeInserted', e => {
                chatLogsRef.current?.scroll({
                    top: chatLogsRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }

        // Input My Data
        someoneJoin({
            nickname: user.nickname,
            profile: user.profile,
            color: user.color,
            socketId: user.socketId,
            answer: 0
        });

        socket.on('receive chat', receiveChat);
        socket.on('someone join', someoneJoin);
        socket.on('someone exit', someoneExit);

        socket.on('game start', gameStart);
        socket.on('next song', nextSong);
        socket.on('game end', gameEnd);
        
        // 방 입장 확인 | 방장일 경우 반환 되지 않음
        socket.on('join room', joinRoom);
        socket.on('your manager', manager);
        
        // 서버에게 방 입장했다고 알림
        socket.emit('join room', {
            roomCode: roomCode,
            user: user
        })

        return () => {
            socket.emit('exit room', { 
                roomCode : roomCode,
                socketId: user.socketId
            });
            socket.off('receive chat', receiveChat);
            socket.off('someone join', someoneJoin);
            socket.off('someone exit', someoneExit);

            socket.off('game start', gameStart);
            socket.off('next song', nextSong);
            socket.off('game end', gameEnd);

            socket.off('join room', joinRoom);
            socket.off('your manager', manager);
        }
    }, []);


    //==== Game Manager ===================================================================
    let timeMng: NodeJS.Timer;
    function gameStart(data: any) {

    }
    function nextSong(data: SongType) {
        console.log('NEXT SONG', data);
        setTime(  15  );
        setSongData(data);
        setAnswerUser('');
        clearInterval(timeMng);
        timeMng = setInterval(timeCounting, 1000);
    }
    function gameEnd() {
        setSongData(null);
    }
    function timeCounting() {
        let nowTime = 10000;

        setTime(dT => {
            nowTime = --dT;
            return dT;
        })

        if (nowTime === 0) {
            if (isManager)
                socket.emit('request next', { roomCode: roomCode });
            clearInterval(timeMng);
        }

        console.log(nowTime);
    }


    //==== User Manager ===================================================================
    function someoneJoin(data: UserType) {
        console.log('someone join ', userList, data);
        setUserList(beforeList => [...beforeList, {
            nickname: data.nickname,
            profile: data.profile,
            color: data.color,
            socketId: data.socketId,
            answer: 0
        }]);
    }
    function someoneExit(data: any) {
        console.log('someone exit', userList, data);

        setUserList(beforeUserList => [...beforeUserList.filter(e => {
            return (e.socketId !== data.socketId);
        })]);
    }
    function joinRoom(data: UserType[]) {
        setUserList(beforeUserList => [...beforeUserList, ...data.map(e => {
            e.answer = 0;
            return e;
        })]);
    }
    function manager() {
        setManager(true);
    }


    //==== Chat Manager ===================================================================
    function removeSpaceString(data: string) : string {
        return data.replace(/\s/g, '');
    }
    function receiveChat(data: ChatType) {
        if (data.isAnswer) {
            setUserList((beforeUserList) => {
                let newUserList = [...beforeUserList.map(e => {
                    return {
                        ...e,
                        answer: (e.socketId === data.socketId) ? e.answer + 1 : e.answer
                    }
                })];

                newUserList.sort((a, b) => {
                    if (a.answer > b.answer) return 1;
                    else if (a.answer < b.answer) return -1;
                    return 0;
                });

                return newUserList;
            });
            
            setAnswerUser(data.author);
        }

        setChatLogs(beforeChatLogs => [...beforeChatLogs, {
            msg: data.msg,
            socketId: data.socketId,
            author: data.author,
            profileNum: data.profileNum,
            color: data.color,
            isAnswer: data.isAnswer
        }]);
    }
    function sendChat() {
        if (removeSpaceString(msg) === '') {
            setMsg('');
            return;
        }

        socket.emit('send chat', {
            roomCode: roomCode,
            msg: msg,
            socketId: user.socketId,
            author: user.nickname,
            profileNum: user.profile,
            color: user.color
        });

        setMsg('');
    }

    return (
        <div className="container-fluid">
            {
                (time > 0 && songData !== null) &&
                <iframe 
                    className="song-video"
                    id="player" 
                    width="560" height="315"
                    src={`https://www.youtube.com/embed/${songData?.code}?autoplay=1&start=${songData.start}`}
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            }

            <div className="row">
                <div className="col-md-8 main">
                    <BeforeButton></BeforeButton>

                    <div className="player-list">
                        {
                            userList.map((e) => {
                                return  <div className="player-info" key={e.socketId}>
                                            {/* <div className="player-color"></div> */}
                                            <ProfileSM profileNum={e.profile} color={e.color}></ProfileSM>
                                            <p className="player-name">
                                                {e.nickname}<span className="player-score"> {e.answer} </span>
                                            </p>
                                        </div>
                            })
                        }
                    </div>
                    
                    <p className="remaining-songs">{playedSong} / 10</p>

                    {
                        (songData != null && answerUser !== '') &&
                        <div className="answer-group">
                            <h3 className="answer-member">정답자 : {answerUser}</h3>
                            <h2 className="answer-song">{ songData.name }</h2>
                        </div>
                    }

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

                    {
                        (songData != null && answerUser !== '') &&
                        <div className="song-info">
                            <div className="song-tags">
                                {
                                    songData.tags.map((tag) => {
                                        return <Tag key={tag}>{tag}</Tag>
                                    })
                                }
                                {/* <Tag className={'tag-primary'}>힙합</Tag>
                                <Tag className={'tag-primary'}>2020</Tag>
                                <Tag>트렌드</Tag> */}
                            </div>
                        </div>
                    }

                </div>
                <div className="col-md-4 chat-box">
                    {
                        isManager && <button onClick={() => socket.emit('game start', { roomCode: roomCode })}>게임 시작</button>
                    }
                    <div className="chat-logs" ref={chatLogsRef}>
                        {
                            chatLogs.map((chat, idx) => {
                                if (chat.socketId === user.socketId)
                                    return <MyChat 
                                                isPrimary={ chat.isAnswer }
                                                key={ idx }
                                            >{ chat.msg }</MyChat>
                                
                                return <Chat
                                            profileNum={ chat.profileNum }
                                            color={ chat.color }
                                            author={ chat.author }
                                            isPrimary={ chat.isAnswer }
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
