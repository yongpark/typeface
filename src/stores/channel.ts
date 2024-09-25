import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ChannelFactory from "@/factory/channel";
import {useUserStore} from "@/stores/user";
import _ from 'lodash'
import MessageFactory from "@/factory/message";
import {ChannelType, type Channel} from "@/types/channel";
import {useWorkspaceStore} from "@/stores/workspace";

export const useChannelStore = defineStore('channel', () => {
    const channels = ref<Channel[]>([])
    const channelIds = computed(() => {
        return _.map(channels.value, (channel: Channel) => channel.id)
    })
    const currentChannel = ref<string>()

    const initChannels = () => {
        const userStore = useUserStore()
        const currentUser = userStore.currentUser
        const users = userStore.users

        const dmChannelMemberIds =  [
            currentUser.id,
        ]
        const dmChannelMessages = _.map(dmChannelMemberIds, (id: string) => {
            return MessageFactory.build({
                userId: id
            })
        })
        const dmChannel = ChannelFactory.build({
            type: ChannelType.DIRECT,
            memberIds: dmChannelMemberIds,
            messages: dmChannelMessages
        })

        const groupChannelMemberIds =   [
            currentUser.id,
            users[1].id,
            users[2].id
        ]
        const groupChannelMessages = _.map(groupChannelMemberIds, (id: string) => {
            return MessageFactory.build({
                type: ChannelType.DIRECT,
                userId: id
            })
        })
        _.sortBy(groupChannelMessages, (message) => message.createdAt)
        const groupChannel = ChannelFactory.build({
            type: ChannelType.DIRECT,
            memberIds: groupChannelMemberIds,
            messages: groupChannelMessages
        })

        const publicChannelMemberIds =  [
            currentUser.id,
            users[1].id,
            users[2].id,
            users[3].id,
        ]
        const publicChannelMessages = _.map(publicChannelMemberIds, (id: string) => {
            return MessageFactory.build({
                userId: id
            })
        })
        _.sortBy(publicChannelMessages, (message) => message.createdAt)
        const publicChannel = ChannelFactory.build({
            type: ChannelType.PUBLIC,
            memberIds: publicChannelMemberIds,
            messages: publicChannelMessages
        })

        const privateChannelMemberIds =  [
            currentUser.id,
            users[1].id,
            users[2].id,
            users[3].id,
        ]
        const privateChannelMessages = _.map(privateChannelMemberIds, (id: string) => {
            return MessageFactory.build({
                userId: id
            })
        })
        _.sortBy(privateChannelMessages, (message) => message.createdAt)
        const privateChannel = ChannelFactory.build({
            type: ChannelType.PRIVATE,
            memberIds: privateChannelMemberIds,
            messages: privateChannelMessages
        })

        channels.value = [
            dmChannel,
            groupChannel,
            publicChannel,
            privateChannel
        ]

        currentChannel.value = dmChannel.id
    }

    type AddChannelParams = {
        channelName?: string
        channelType: ChannelType
        memberIds: string[]
    }
    const addChannel = ({channelName, channelType, memberIds}: AddChannelParams) => {
        const computedChannelType = channelName?.length > 0 ? channelType : ChannelType.DIRECT

        const newChannel = ChannelFactory.build({
            name: channelName,
            type: computedChannelType,
            memberIds

        })
        channels.value = [
            ...channels.value,
            newChannel
        ]

        const workSpaceStore = useWorkspaceStore()
        const {addWorkSpaceChannel} = workSpaceStore
        addWorkSpaceChannel(newChannel.id)
    }

    const deleteChannel = (channelId) => {
        const clonedChannels = _.cloneDeep(channels.value);
        channels.value = _.remove(clonedChannels, (channel) => channel.id != channelId)

        if (channels.value.length) {
            currentChannel.value = channels.value[0].id
        }
    }

    const selectChannel = (channelId) => {
        currentChannel.value = channelId
    }

    const addMessage = ({channelId, message}) => {
        const userStore = useUserStore()
        const currentUser = userStore.currentUser

        const newMessage = MessageFactory.build({
            content: message,
            userId: currentUser.id,
            createdAt: new Date()
        })

        const channel = _.find(channels.value, (channel) => channel.id === channelId)
        channel.messages = [
            ...channel.messages,
            newMessage
        ]
    }

    return {
        channels,
        channelIds,
        currentChannel,
        initChannels,
        addChannel,
        deleteChannel,
        selectChannel,
        addMessage
    }
})
