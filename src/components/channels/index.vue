<template>
  <div
      class="channels-container"
  >
    <div
        class="channels-group-container"
    >
      <div
          class="channels-group"
      >
        <div
            class="channels-group-header"
        >
          Channels
        </div>
        <ChannelItem
            v-for="(channel) in normalChannels"
            :key="channel.id"
            :channel="channel"
            @click="onChannelClick(channel.id)"
            @delete="onChannelDelete"
        />
      </div>

      <div
          class="channels-group"
      >
        <div
            class="channels-group-header"
        >
          Direct Messages
        </div>
      <ChannelItem
        v-for="(channel) in directChannels"
        :key="channel.id"
        :channel="channel"
        @click="onChannelClick(channel.id)"
        @delete="onChannelDelete"
      />
      </div>
    </div>
    <div
        class="add-channel-btn"
        @click.stop="() => emit('create-channel')"
    >
      + Add Chat
    </div>
  </div>
</template>

<style scoped>
.channels-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.channels-group-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.add-channel-btn {
  text-align: center;
  padding: 20px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import _ from 'lodash'
import ChannelItem from './channelItem.vue'
import {useChannelStore} from "@/stores/channel";
import {useWorkspaceStore} from "@/stores/workspace";
import {computed} from "vue";
import {ChannelType} from "@/types/channel";
import { useRouter } from 'vue-router'

const router = useRouter()

defineOptions({
  name: 'ChannelsContainer',
});

const emit = defineEmits<{
  'create-channel': []
}>()

const workspaceStore = useWorkspaceStore()
const channelsStore = useChannelStore()

const currentChannelId = computed(() => channelsStore.currentChannel)
const storeChannels = computed(() => channelsStore.channels)

const workspaceChannelIds = computed(() => {
  return workspaceStore.currentWorkSpace.channelIds
})

const workspaceChannels = computed(() => {
  return _.filter(storeChannels.value, (channel) =>
    _.includes(workspaceChannelIds.value, channel.id)
  )
})

const directChannels = computed(() => {
  return _.filter(workspaceChannels.value, (channel) =>
    channel.type === ChannelType.DIRECT
  )
})

const normalChannels = computed(() => {
  return _.filter(workspaceChannels.value, (channel) =>
      channel.type !== ChannelType.DIRECT
  )
})

const onChannelClick = (id) => {
  channelsStore.selectChannel(id)
  router.push({path: `/messages/${id}`})
}

const onChannelDelete = (id) => {
  channelsStore.deleteChannel(id)
  onChannelClick(currentChannelId.value)
}
</script>