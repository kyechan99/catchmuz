const MY_SOCKETID = 'socket/MY_SOCKETID' as const;
const SEND_CHAT = 'socket/SEND_CHAT' as const;
const RECEIVE_CHAT = 'socket/RECEIVE_CHAT' as const;

export const setMySocketId = (socketId: string) => ({
    type: MY_SOCKETID,
    payload: socketId
});

export const sendChat = (msg: string) => ({
    type: SEND_CHAT,
    payload: msg
});

export const receiveChat = (msg: string) => ({
    type: RECEIVE_CHAT,
    payload: msg
})

type SocketAction =
    | ReturnType<typeof setMySocketId>
    | ReturnType<typeof sendChat>
    | ReturnType<typeof receiveChat>;


type SocketState = {
    socketId: string
};

const initialState: SocketState = {
    socketId: ''
};

function socket(
    state: SocketState = initialState,
    action: SocketAction
) : SocketState {
    switch (action.type) {
        case MY_SOCKETID:
            state.socketId = action.payload;
            return state;
        case SEND_CHAT:
            return state;
            // return { socketId : action.payload };
        default:
            return state;
    }
}

export default socket;