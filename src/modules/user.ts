const NICKNAME = 'user/NICKNAME' as const;
const PROFILE = 'user/PROFILE' as const;
const SOCKET_ID = 'user/SOCKET_ID' as const;

export const setNickname = (name: string) => ({
    type: NICKNAME,
    payload: name
});

export const setProfile = (profileNum: number) => ({
    type: PROFILE,
    payload: profileNum
});

export const setSocketId = (socketId: string) => ({
    type: SOCKET_ID,
    payload: socketId
});

type UserAction =
    | ReturnType<typeof setNickname>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setSocketId>;


type UserState = {
    nickname: string
    profile: number
    socketId: string
};

const initialState: UserState = {
    nickname: '',
    profile: 0,
    socketId: ''
};

function user(
    state: UserState = initialState,
    action: UserAction
) : UserState {
    switch (action.type) {
        case NICKNAME:
            state.nickname = action.payload;
            return state;
        case PROFILE:
            state.profile = action.payload;
            return state;
        case SOCKET_ID:
            state.socketId = action.payload;
            return state;
        default:
            return state;
    }
}

export default user;