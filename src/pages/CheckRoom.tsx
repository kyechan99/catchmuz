import React from 'react';
import './CheckRoom.scss';

import { BeforeButton } from '../components/Button/Button';
import { Input } from '../components/Input/Input';

const Index = () => {
    const [name, setName] = React.useState<string>('뚜두뚜두 - 블랙핑크');
    const [code, setCode] = React.useState<string>('???');
    const [start, setStart] = React.useState<number>(0);
    const [tags, setTags] = React.useState<string>('"여자 아이돌", "2018", "블랙핑크", "케이팝"');
    const [answers, setAnswers] = React.useState<string>('"솔로", "solo"');
    // const [code, setCode] = React.useState<string>('');

    return (
        <div className="container check-room">
            <BeforeButton></BeforeButton>

            <div>
                <h3>노래 제목 - 가수 명</h3>
                <Input onChange={setName} placeholder="뚜두뚜두 - 블랙핑크"></Input>
            </div>
            <div>
                <h3>유튜브 코드</h3>
                <Input onChange={setCode} placeholder="RMc9qFrCqno"></Input>
            </div>
            <div>
                <h3>시작 시간</h3>
                <Input onChange={setStart} placeholder="0"></Input>
            </div>
            <div>
                <h3>태그 목록</h3>
                <Input onChange={setTags} placeholder={`"여자 아이돌", "2018", "블랙핑크", "케이팝"`}></Input>
            </div>
            <div>
                <h3>정답's</h3>
                <Input onChange={setAnswers} placeholder={`"솔로", "solo"`}></Input>
            </div>

            <br/>
            <p>태그 들은 모두 {`""`} 로 묶고 {`,`} 로 분리해주세요.</p>
            <p>정답으로 허용될 것들을 모두 {`""`} 로 묶고 {`,`} 로 분리해주세요.</p>
            <p>띄어쓰기는 모두 없어야 하며 영문 정답은 소문자로 작성합니다.</p>

            <iframe 
                className="song-video"
                id="player" 
                width="370" height="210"
                src={`https://www.youtube.com/embed/${code}?autoplay=1&start=${start}`}
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

            <div className="copy-content">
                <pre>{`{
    "name": "${name}",
    "code": "${code}",
    "start": ${start},
    "tags": [${tags}],
    "answer": [${answers}]
}`}</pre>
            </div>
            <p>해당 글자를 개발자에게 보내주시면 추가하겠습니다.</p>
            <p>(개발자라면 직접 PR 주시면 감사하겠습니다.)</p>

        </div>
    )
}

export default Index;
