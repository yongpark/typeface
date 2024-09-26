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
  background-color: #F0F0F0;
}

.channels-group-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.channels-group-header {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
  color: #6D72E9;
}

.add-channel-btn {
  border: 1px solid #6D72E9;
  height: 50px;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  padding: 1px 2px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

  &:hover {
    background-color: #6D72E9;
    color: white;
  }
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