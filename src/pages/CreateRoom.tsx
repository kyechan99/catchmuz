import React from 'react';
import { useHistory } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import './CreateRoom.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import { BeforeButton, PointButton, TagButton, ImgButton } from '../components/Button/Button';
import { InputGroup } from '../components/Input/Input';

import BaladMode from '../assets/mode/balad.png'
import HiphopMode from '../assets/mode/hiphop.png'
import GirlGroupMode from '../assets/mode/girlgroup.png'
import Top100Mode from '../assets/mode/top100.png'
import OldSeriesMode from '../assets/mode/oldseries.png'

type CreateRoomProps = {
    socket: Socket
}

const CreateRoom = ({ socket } : CreateRoomProps) => {
    const user = useSelector((state: RootState) => state.user);
    const history = useHistory();

    type TagsType = {
        [type: string]: string[]
    }
    const tags : TagsType = {
        singer: [
            '남성 가수','여성 가수','남자 아이돌','여자 아이돌', '밴드',
        ],
        genre: [
            '발라드','힙합','싱잉랩','알앤비','록',
            '포크','시티팝','국악','트로트','인디음악','영화ost','랩','케이팝','OST','가요'
        ],
        year: [
            '2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2008','2009','2007',
            '2006','2005','2004','2003','2002','2001','2000','1999',
        ],
        fast: [
            '트렌드','최신곡','TOP100','추억의그노래','놀면뭐하니','유닛','감성','노래방','슈가맨프로젝트'
        ]
    };

    const jpTags : TagsType = {
        singer: [
            'Vocaloid'
        ],
        genre: [
            'J-pop','애니op','애니ed','애니ost','록',
            '헤비메탈'
        ],
        year: [
            '2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2008','2009','2007',
            '2006','2005','2004'
        ],
        fast: [
            'Tiktok'
        ]
    };

    const enTags : TagsType = {
        singer: [
        ],
        genre: [
        ],
        year: [
        ],
        fast: [
        ]
    };
    
    // 선택한 태그들 저장
    const [selectTags, setSelectTags] = React.useState<string[]>([ ]);
    // 언어권 지정
    const [language,  setLanguage] = React.useState<string>('kr');
    // 태그 타입 지정 - all, singer, genre, language, year, fast
    const [tagType, setTagType] = React.useState<string>('all');
    // 커스텀 모드인지 빠른 모드인지 확인 (커스텀 모드:true, 빠른 모드: false)
    const [isCustomMode, setCustomMode] = React.useState<boolean>(false);
    // 최대 노래 개수
    const [maxSongNum,  setMaxSongNum] = React.useState<number>(60);
    // 최대 인원 수
    const [maxUserNum,  setMaxUserNum] = React.useState<number>(10);

    React.useEffect(() => {
        socket.on('get room code', getRoomCode);

        return () => {
            socket.off('get room code', getRoomCode);
        }
    }, []);

    // <방 커스텀 할때 태그 선택시 호출>
    //- tag - 선택한 태그 명
    //- 만약 선택한 태그라면 선택해제 | 미선택 태그라면 선택
    function selectTag(tag: string) {
        if (!selectTags.includes(tag)) {
            setSelectTags([...selectTags, tag]);
            return;
        }

        setSelectTags(selectTags.filter(item => item !== tag));
    }

    // <태그 데이터들을 모두 묶어서 불러올때 사용>
    //- 차후 태그들을 종류별로 나누어서 사용할 수도 있어 분리해 둠
    function getTags(tags : TagsType, type: string = 'all') {
        if (type === 'all')
            return tags.singer.concat(tags.genre).concat(tags.year).concat(tags.fast);
        return tags[type];
    }

    // <방 생성. 입력한 데이터들을 서버로 전송>
    function createRoom() {
        socket.emit('create room', {
            tags: selectTags,
            language: language,
            maxSongNum: maxSongNum,
            maxUserNum: maxUserNum,
            user: user
        });
    }

    // <서버로 부터 방 코드 받아옴. 이후 생성된 방으로 이동>
    function getRoomCode(data: any) {
        history.push(`/room/${data.roomCode}`);
    }

    // <언어별 태그 선택>
    function getLanguageTags(lang: string) {
        if (lang === 'jp')
            return jpTags;
        else if (lang === 'en')
            return enTags;
        return tags;
    }

    function changeLanguage(lang: string) {
        setSelectTags([]);
        setLanguage(lang);
    }

    return (
        <div className="container createroom-container">
            <BeforeButton></BeforeButton>

            <div className="room-info">
                <InputGroup
                    label="최대 노래 수"
                    value={maxSongNum}
                    onChange={setMaxSongNum}
                    warning={maxSongNum > 1000 || maxSongNum < 2}
                    warningMsg={"2곡 ~ 1000곡"}
                ></InputGroup>
                
                <InputGroup
                    label="최대 인원 수"
                    value={maxUserNum}
                    onChange={setMaxUserNum}
                    warning={maxUserNum > 10 || maxUserNum < 2}
                    warningMsg={"2명 ~ 10명"}
                ></InputGroup>
            </div>

            <div className="room-mode">
                <div className="mode-menu">
                    <button 
                        className={"btn-mode " + (isCustomMode && "un-selected")}
                        onClick={()=> {
                            setSelectTags([]);
                            setCustomMode(false);
                        }}
                    >
                        빠른 모드
                    </button>
                    <button 
                        className={"btn-mode " + (!isCustomMode && "un-selected")}
                        onClick={()=> {
                            setSelectTags([]);
                            setCustomMode(true);
                        }}
                    >
                        커스텀 모드
                    </button>
                </div>

                {
                    !isCustomMode &&
                    <div className="fast-select-list">
                        <ImgButton
                            clicked={()=> setSelectTags(['TOP100'])}
                            isActive={selectTags.includes('TOP100')}
                            src={Top100Mode}>
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['추억의그노래'])}
                            isActive={selectTags.includes('추억의그노래')}
                            src={OldSeriesMode}>
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['여자 아이돌'])}
                            isActive={selectTags.includes('여자 아이돌')}
                            src={GirlGroupMode}>
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['발라드'])}
                            isActive={selectTags.includes('발라드')}
                            src={BaladMode}>
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['힙합'])}
                            isActive={selectTags.includes('힙합')}
                            src={HiphopMode}>
                        </ImgButton>
                    </div>
                }

                {
                    isCustomMode && 
                    <div className="tags-menu">
                        <button 
                            className={"btn-mode btn-sm " + (language !== 'kr' && " un-selected ")}
                            onClick={()=>changeLanguage('kr')}
                        >
                            한국
                        </button>
                        <button 
                            className={"btn-mode btn-sm " + (language !== 'en' && " un-selected ")}
                            onClick={()=>changeLanguage('en')}
                        >
                            영어
                        </button>
                        <button 
                            className={"btn-mode btn-sm " + (language !== 'jp' && " un-selected ")}
                            onClick={()=>changeLanguage('jp')}
                        >
                            일본
                        </button>
                    </div>
                }
                
                {
                    isCustomMode && 
                    <div className="tags-list">
                        {
                            getTags(getLanguageTags(language), tagType).map((tag: string) => 
                                <TagButton 
                                    clicked={() => selectTag(tag)}
                                    isSelected={selectTags.includes(tag)}
                                    key={tag}
                                >
                                    { tag }
                                </TagButton>
                            )
                        }
                    </div>
                }
            </div>
            
            <div className="create-mng-list">
                <PointButton disabled={ selectTags.length === 0 || maxUserNum < 2 || maxUserNum > 10 || maxSongNum > 1000 || maxSongNum < 2 } clicked={createRoom}>
                    <svg className="create-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="#FFFFFF">
                        <path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z">
                        </path>
                    </svg>
                    방 생성
                </PointButton>
            </div>
        </div>
    )
}

export default CreateRoom;
