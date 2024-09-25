<template>
 <div
     class="app-container"
     :class="[
         isModalShowing ? 'modal-open' : ''
     ]"
 >
   <ModalContainer
       v-if="isModalShowing"
       @close="isModalShowing = false"
   />
   <WorkSpaceContainer
       class="workspace-container"
   />
   <ChannelsContainer
       class="channels-container"
       @create-channel="toggleModal"
   />
   <RouterView
        class="message-pane"
        :disabled="isModalShowing"
   />
 </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.workspace-container {
  width: 5%;
  border-right: 1px solid gray;
}

.channels-container {
  width: 20%;
  border-right: 1px solid gray;
}

.modal-open {
  background-color: rgb(231 229 228);
}

.message-pane {
  width: 75%;
}
</style>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useAppMetaStore} from "@/stores/appMeta";
import {useChannelStore} from "@/stores/channel";
import WorkSpaceContainer from './workspace/index.vue'
import ChannelsContainer from '@/components/channels/index.vue'
import ModalContainer from '@/components/modal/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const appMetaStore = useAppMetaStore()
const channelStore = useChannelStore()

const isModalShowing = ref(false)

onMounted(() => {
  appMetaStore.initApp()

  router.push({path: `/messages/${channelStore.currentChannel}`})
})

const toggleModal = () => {
  isModalShowing.value = !isModalShowing.value
}
</script>