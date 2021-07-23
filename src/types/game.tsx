
export type UserType = {
    nickname: string
    profile: number
    color: number
    socketId: string
    answer: number 
};

export type ChatType = {
    msg: string
    wantSkip?: boolean
    socketId: string
    author: string
    profileNum: number
    color: number
    isAnswer: boolean
}

export type SongType = {
    name: string
    code: string
    start: number
    tags: string[]
    answer: string[]
}