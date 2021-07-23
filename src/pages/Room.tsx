import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import './Room.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import YouTube from '@u-wave/react-youtube';

import { BeforeButton, PrimaryButton, SkipButton } from '../components/Button/Button';
import { SpinnerSM, SpinnerMD, SpinnerLG, SpinnerXL } from '../components/Spinner/Spinner';
import { Chat, MyChat } from '../components/Chat/Chat';
import { Tag } from '../components/Tag/Tag';
import { ProfileSM } from '../components/Profile/Profile'

import LogoImg from '../assets/catchmuz_icon.png';

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
    wantSkip?: boolean
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

const PLAY_TIME = 55;
const WAITING_TIME = 5;

const Room = ({ socket } : RoomProps) => {
    const history = useHistory();

    const user = useSelector((state: RootState) => state.user);

    // 방 고유 번호
    const { roomCode } = useParams<{ roomCode: string }>();

    // 현재까지 진행한 노래 수
    const [playedSong, setPlayedSong] = React.useState<number>(0);
    const [songLength, setSongLength] = React.useState<number>(0);
    // 타이머
    const [time, setTime] = React.useState<number>(0);

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
    const [isPlaying, setPlaying] = React.useState<boolean>(false);

    // 노래 데이터
    const [songData, setSongData] = React.useState<SongType | null>(null);
    // 답 맞춘 유저
    const [answerUser, setAnswerUser] = React.useState<string>('');
    // 방 설정 태그들
    const [roomSongTags, setRoomSongTags] = React.useState<string[]>([]);
    // 스킵 희망 수
    const [skipCount, setSkipCount] = React.useState<number>(0);

    const [volume, setVolume] = React.useState<number>(1);

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

        // 게임 시작 ~ 끝
        socket.on('game start', gameStart);
        socket.on('next song', nextSong);
        socket.on('answer song', answerSong);
        socket.on('receive chat', receiveChat);
        socket.on('game end', gameEnd);
        
        // 방 입장 확인 | 방장일 경우 반환 되지 않음
        socket.on('join room', joinRoom);
        socket.on('your manager', manager);
        socket.on('forced exit', forcedExit);
        socket.on('someone join', someoneJoin);
        socket.on('someone exit', someoneExit);

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

            socket.off('game start', gameStart);
            socket.off('next song', nextSong);
            socket.off('answer song', answerSong);
            socket.off('receive chat', receiveChat);
            socket.off('game end', gameEnd);

            socket.off('join room', joinRoom);
            socket.off('your manager', manager);
            socket.off('forced exit', forcedExit);
            socket.off('someone join', someoneJoin);
            socket.off('someone exit', someoneExit);
        }
    }, []);


    //==== Game Manager ===================================================================
    let timeMng: NodeJS.Timer;
    function gameStart(data: any) {
        setPlayedSong(0);
        setSongLength(data.songLength);
        setTime( 0 );
        setSongData(null);
        setAnswerUser('');
        setPlaying(true);
        setUserList(list => 
            [...list.map(e => {
                e.answer = 0;
                return e;
            })]
        );
    }
    function nextSong(data: SongType) {
        setSkipCount(0);
        setPlayedSong(before => before + 1);
        setTime( PLAY_TIME + WAITING_TIME );
        setSongData(data);
        setAnswerUser('');
        clearInterval(timeMng);
        timeMng = setInterval(timeCounting, 1000);
    }
    function answerSong(data: SongType) {        
        // 정답 제출시간 전에 정답자가 있다면 유지. 아니라면 결과창을 보여주기 위해 빈 유저 변경
        setAnswerUser(before => {
            if (before === '')
                return ' ';
            return before;
        });

        setSongData(data);

        setTime(WAITING_TIME);
    }
    function gameEnd() {
        setSkipCount(0);
        setSongData(null);
        setPlaying(false);
    }
    function timeCounting() {
        let nowTime = 10000;

        setTime(dT => {
            nowTime = --dT;
            return dT;
        })

        let isMng = false;
        setManager(t => {
            isMng = t;
            return t;
        }); 

        // 노래 못맞춤. 기다리는 시간동안 정답 알 수 있게 요청
        if (nowTime === WAITING_TIME && isMng) {
            socket.emit('request answer', { roomCode: roomCode });
        }
        // 모두 기다렸으니 다음 노래로 넘어가기
        else if (nowTime === 0) {
            if (isMng) {
                socket.emit('request next', { roomCode: roomCode });
            }
            clearInterval(timeMng);
        }
    }


    //==== User Manager ===================================================================
    function someoneJoin(data: UserType) {
        setUserList(beforeList => [...beforeList, {
            nickname: data.nickname,
            profile: data.profile,
            color: data.color,
            socketId: data.socketId,
            answer: 0
        }]);
    }
    function someoneExit(data: any) {
        setUserList(beforeUserList => [...beforeUserList.filter(e => {
            return (e.socketId !== data.socketId);
        })]);
    }
    function joinRoom(data: UserType[], tags: string[]) {
        setUserList(beforeUserList => [...beforeUserList, ...data.map(e => {
            e.answer = 0;
            return e;
        })]);

        setRoomSongTags(tags);
    }
    function manager(tags: string[]) {
        setManager(true);

        setRoomSongTags(tags);
    }
    function forcedExit() {
        history.push('/lobby');
    }


    //==== Chat Manager ===================================================================
    function removeSpaceString(data: string) : string {
        return data.replace(/\s/g, '');
    }
    function receiveChat(data: ChatType) {
        if (data.wantSkip) {
            setSkipCount(c => c+1);
        }
        if (data.isAnswer) {
            setUserList((beforeUserList) => {
                let newUserList = [...beforeUserList.map(e => {
                    return {
                        ...e,
                        answer: (e.socketId === data.socketId) ? e.answer + 1 : e.answer
                    }
                })];

                newUserList.sort((a, b) => {
                    if (a.answer < b.answer) return 1;
                    else if (a.answer > b.answer) return -1;
                    return 0;
                });

                return newUserList;
            });
            
            setAnswerUser(data.author);
        }

        setChatLogs(beforeChatLogs => [...(beforeChatLogs.length > 150 ? beforeChatLogs.slice(50) : beforeChatLogs), {
            msg: data.msg,
            socketId: data.socketId,
            author: data.author,
            profileNum: data.profileNum,
            color: data.color,
            isAnswer: data.isAnswer
        }]);
    }
    function sendChatData(msg : string) {
        socket.emit('send chat', {
            roomCode: roomCode,
            msg: msg,
            socketId: user.socketId,
            author: user.nickname,
            profileNum: user.profile,
            color: user.color
        });
    }
    function sendChat() {
        if (removeSpaceString(msg) === '') {
            setMsg('');
            return;
        }

        sendChatData(msg);

        setMsg('');
    }

    return (
        <div className="container-fluid">
            {
                (time > 0 && songData !== null) &&
                <YouTube
                    id="player" 
                    className="song-video"
                    volume={volume}
                    video={songData?.code}
                    startSeconds={songData.start}
                    showInfo={false}
                    controls={false}
                    annotations={false}
                    modestBranding={true}
                    disableKeyboard={true}
                    allowFullscreen={false}
                    showRelatedVideos={false}
                    suggestedQuality={'small'}
                    autoplay
                />
            }

            <div className="row">
                <div className="col-md-11 main">
                    {
                        !isPlaying && 
                        <BeforeButton></BeforeButton>
                    }

                    <div className={`player-list ${ isPlaying ? 'remove-margin': '' }`}>
                        {
                            userList.map((e) => {
                                return  <div className="player-info" key={e.socketId}>
                                            <ProfileSM profileNum={e.profile} color={e.color}></ProfileSM>
                                            <p className="player-name">
                                                {e.nickname}
                                                <span className="player-score"> {e.answer} </span>
                                            </p>
                                        </div>
                            })
                        }
                    </div>

                    <input
                        type="range"
                        className="input-range"
                        min={0}
                        max={1}
                        step={0.02}
                        value={volume}
                        style={{background: `linear-gradient(to right, #7c4fe4 0%, #7c4fe4 ${(volume * 100)}%, #666666 ${(volume * 100)}%, #666666 100%)`}}
                        onChange={event => {
                            setVolume(event.target.valueAsNumber)
                        }}
                    />
                    
                    {
                        playedSong > 0 &&
                        <p className="remaining-songs">{playedSong} / {songLength}</p>
                    }

                    <div className="answer-group">
                        {
                            (songData != null && answerUser !== '' && answerUser !== ' ') &&
                            <h3 className="answer-member">정답자 : {answerUser}</h3>
                        }
                        {
                            (songData != null && answerUser !== '') &&
                            <h2 className="answer-song">{ songData.name }</h2>
                        }
                    </div>

                    <div className="spinner-parent">
                        <SpinnerSM></SpinnerSM>
                        <SpinnerMD></SpinnerMD>
                        <SpinnerLG></SpinnerLG>
                        <SpinnerXL></SpinnerXL>

                        {
                            (isManager && !isPlaying) && 
                            <PrimaryButton 
                                className="btn-start"
                                clicked={() => socket.emit('game start', { roomCode: roomCode })}
                                disabled={userList.length < 1}
                            >
                                게임 시작
                            </PrimaryButton>
                        }
                        
                        <img className="play-icon" src={LogoImg} alt="logo-img"/>
                        
                        <p className={`timer${time <= WAITING_TIME ? ' timer-alert' : ''}`}>
                            {
                                time !== 0 &&
                                (time - WAITING_TIME > 0 ? 
                                    time - WAITING_TIME + ' 초': 
                                    `다음 노래를 기다려주세요 (${time})`)
                            }
                        </p>
    
                        {
                            (isPlaying && time > WAITING_TIME) &&
                            <SkipButton className={'btn-skip'} clicked={ () => sendChatData('!skip') }>
                                { skipCount } / { Math.ceil((userList.length + 1) / 2)}
                            </SkipButton>
                        }
                    </div>

                    {
                        (songData != null && answerUser !== '') &&
                        <div className="song-info">
                            <div className="song-tags">
                                {
                                    songData.tags.map((tag) => {
                                        return <Tag key={tag} className={ roomSongTags.includes(tag) ? 'tag-primary' : ''}>{tag}</Tag>
                                    })
                                }
                            </div>
                        </div>
                    }

                </div>
                <div className="col-md-5 chat-box">
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
