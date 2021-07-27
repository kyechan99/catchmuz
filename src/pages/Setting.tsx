import './Setting.scss';

import { Button, PointButton } from '../components/Button/Button';
import { RoomMenu } from '../components/Room/RoomMenu';
import { Link } from 'react-router-dom';



const Setting = ( ) => {
    return (
        <div className="container">
            <div className="container-box">
                <div className="setting-group">
                    <h1>그래픽</h1>
                    <p><strong>F11</strong>  키를 통해 창 화면과 전체화면을 조절합니다.</p>
                </div>
                <div className="setting-group">
                    <h1>볼륨</h1>
                    <p>볼륨 조절은 인게임(방 입장) 안에서 조절 가능합니다.</p>
                </div>
                <div className="setting-group">
                    <h1>노래 추가</h1>
                    <p>노래 추가는 중복과 오작동 방지를 위해 수동작업 하고 있습니다.</p>
                    <p>
                        <Link to="/checkroom" className="a">
                        노래 생성 페이지
                    </Link>
                    에서 생성된 코드를 보내주시면 추가하겠습니다.</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Setting;
