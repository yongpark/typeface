import { ref } from 'vue'
import { defineStore } from 'pinia'
import {useWorkspaceStore} from "@/stores/workspace";
import {useChannelStore} from "@/stores/channel";
import {useUserStore} from "@/stores/user";

export const useAppMetaStore = defineStore('appMeta', () => {
    const currentUser = ref()
    const currentWorkSpace = ref()

    const initApp = () => {
        const userStore = useUserStore()
        userStore.initUsers()

        const channelStore = useChannelStore()
        channelStore.initChannels()

        const workspaceStore = useWorkspaceStore()
        workspaceStore.initWorkSpaces()

        currentUser.value = userStore.currentUser
        currentWorkSpace.value = workspaceStore.currentWorkSpace
    }

    return {currentUser, currentWorkSpace, initApp}
})
