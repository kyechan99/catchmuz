import React from 'react';
import { Route, Link } from 'react-router-dom';
import './CreateRoom.scss';

import { BeforeButton, PointButton, TagButton, ImgButton } from '../components/Button/Button';
import { InputGroup } from '../components/Input/Input';

const CreateRoom = () => {
    type TagsType = {
        [type: string]: string[]
    }
    const tags : TagsType = {
        singer: [
            '솔로',
            '그룹',
            '남성 가수',
            '여성 가수',
            '남자아이돌',
            '여자아이돌',
            '남성밴드',
            '여성밴드',
            '혼성밴드',
        ],
        genre: [
            '발라드',
            '트로트',
            '힙합',
            '팝'
        ],
        language: [
            '한국어',
            '영어',
            '일본어'
        ],
        year: [
            '2018',
            '2019',
            '2020',
            '2021',
        ],
        fast: [
            '슬픈 발라드',
            '요즘 국힙',
            '90년대 가요',
            '90년대 POP'
        ]
    };
    
    // 선택한 태그들 저장
    const [selectTags, setSelectTags] = React.useState<string[]>([ ]);
    // 태그 타입 지정 - all, singer, genre, language, year, fast
    const [tagType, setTagType] = React.useState<string>('all');
    // 커스텀 모드인지 빠른 모드인지 확인 (커스텀 모드:true, 빠른 모드: false)
    const [isCustomMode, setCustomMode] = React.useState<boolean>(false);
    // 최대 노래 개수
    const [maxSongNum,  setMaxSongNum] = React.useState<number>(30);
    // 최대 인원 수
    const [maxMemNum,  setMemNum] = React.useState<number>(10);

    function selectTag(tag: string) {
        if (!selectTags.includes(tag)) {
            setSelectTags([...selectTags, tag]);
            return;
        }

        setSelectTags(selectTags.filter(item => item !== tag));
    }

    function getTags(type: string = 'all') {
        if (type === 'all')
            return tags.singer.concat(tags.genre).concat(tags.language).concat(tags.year);
        return tags[type];
    }

    return (
        <div className="container">
            <BeforeButton></BeforeButton>

            <div className="room-info">
                <InputGroup label="최대 노래 수" value={maxSongNum} onChange={setMaxSongNum}></InputGroup>
                
                <InputGroup label="최대 인원 수" value={maxMemNum} onChange={setMemNum}></InputGroup>
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
                            clicked={()=> setSelectTags(['슬픈 발라드'])}
                            isActive={selectTags.includes('슬픈 발라드')}
                            src="https://music-phinf.pstatic.net/20190717_231/1563371969001XG9e6_PNG/dj_3_genre_5.png?type=f360">
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['요즘 국힙'])}
                            isActive={selectTags.includes('요즘 국힙')}
                            src="https://music-phinf.pstatic.net/20190717_19/1563371989398zXTlJ_PNG/dj_3_genre_7.png?type=f360">
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['90년대 가요'])}
                            isActive={selectTags.includes('90년대 가요')}
                            src="https://music-phinf.pstatic.net/20190717_71/1563372076149daOFL_PNG/dj_3_genre_15.png?type=f360">
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['90년대 POP'])}
                            isActive={selectTags.includes('90년대 POP')}
                            src="https://music-phinf.pstatic.net/20190717_25/1563372086749r0Jfe_PNG/dj_3_genre_16.png?type=f360">
                        </ImgButton>
                        <ImgButton
                            clicked={()=> setSelectTags(['여자 아이돌'])}
                            isActive={selectTags.includes('여자 아이돌')}
                            src="https://music-phinf.pstatic.net/20190717_279/1563371941301koKcB_PNG/dj_3_genre_3.png?type=f360">
                        </ImgButton>
                    </div>
                }
                {
                    isCustomMode && 
                    <div className="tags-list">
                        {
                            getTags(tagType).map((tag: string) => 
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

            {
            /* <div className="tags-menu">
                <button onClick={()=>setTagType('all')}>전체</button>
                <button onClick={()=>setTagType('singer')}>가수</button>
                <button onClick={()=>setTagType('genre')}>장르</button>
                <button onClick={()=>setTagType('language')}>언어</button>
                <button onClick={()=>setTagType('year')}>연도</button>
            </div> */
            }
            
            <div className="create-mng-list">
                <Link to="/room/10" className="create">
                    <PointButton className={ (selectTags.length === 0) ? "disabled" : "" }>
                        <svg className="create-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="#FFFFFF">
                            <path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z">
                            </path>
                        </svg>
                        방 생성
                    </PointButton>
                </Link>
            </div>
        </div>
    )
}

export default CreateRoom;
