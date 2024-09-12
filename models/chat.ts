export interface IChatList{
    chatList:IChat[]
}

export interface IChat{
    id: string
    question: string
    answer: string
    history:IHistory[]
}

export interface IHistory{
    role: Role
    parts:IPart[]
}

export enum Role {
    user='user',
    model='model'
}

export interface IPart{
    text:string
}