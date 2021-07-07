const NICKNAME = 'user/NICKNAME' as const;
const PROFILE = 'user/PROFILE' as const;

export const setNickname = (name: string) => ({
    type: NICKNAME,
    payload: name
});

export const setProfile = (profileNum: number) => ({
    type: PROFILE,
    payload: profileNum
})

type UserAction =
    | ReturnType<typeof setNickname>
    | ReturnType<typeof setProfile>;


type UserState = {
    nickname: string
    profile: number
};

const initialState: UserState = {
    nickname: '',
    profile: 0
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
        default:
            return state;
    }
}

export default user;