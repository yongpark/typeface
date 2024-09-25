import { ref } from 'vue'
import { defineStore } from 'pinia'
import Workspace from "@/factory/workspace";
import {useUserStore} from "@/stores/user";
import {useChannelStore} from "@/stores/channel";
import _ from 'lodash'
import channel from "@/factory/channel";

export const useWorkspaceStore = defineStore('workspace', () => {
    const currentWorkSpace = ref()
    const workspaces = ref()

    const initWorkSpaces = () => {
        const userStore = useUserStore()
        const channelStore = useChannelStore()

        const users = userStore.users
        const channelIds = channelStore.channelIds
        const memberIds = _.map(users, (user) => user.id)

        const workSpace = Workspace.build({
            memberIds,
            channelIds
        })
        currentWorkSpace.value = workSpace
        workspaces.value = [workSpace]
    }

    const addWorkSpaceChannel = (id) => {
        currentWorkSpace.value.channelIds = [
            ...currentWorkSpace.value.channelIds,
            id
        ]
    }

    const deleteWorkSpaceChannel = (id) => {
        currentWorkSpace.value.channelIds =_.filter(currentWorkSpace.value.channelIds,
            (channelId) => channelId !== id
        )
    }

    return {
        currentWorkSpace,
        workspaces,
        initWorkSpaces,
        addWorkSpaceChannel,
        deleteWorkSpaceChannel
    }
})
