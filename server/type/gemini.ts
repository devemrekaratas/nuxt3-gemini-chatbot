export enum Role{
    User = 'user',
    Model = 'model'
}

interface Part{
    text:string
}

export interface Content{
    role: Role
    parts: Part[]
}

export interface AskRequest{
    ask: string
    history : Content[]
}