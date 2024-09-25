import type {Message} from "@/types/message";

export enum ChannelType {
    DIRECT = 'direct',
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export type Channel = {
    id: string
    name?: string
    type: ChannelType
    memberIds: string[]
    messages: Message[]
}