<template>
  <div
      class="message-panel"
  >
    <div
        class="message-container"
    >
      <Message
        v-for="(message) in channelMessages"
        :key="message.id"
        :message="message"
      />
    </div>
    <div
        class="message-input-container"
    >
      <Input
          @input="onInput"
          class="message-input"
          :disabled="disabled"
          :value="message"
      />
      <div
          class="send-button"
          @click="onSend"
      >
        Send
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.message-input-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
}

.message-input {
  width: 80%;
  height: 50px;
  z-index: 1;
  border: 1px solid #6D72E9;
  border-radius: 4px;
}

.send-button {
  border: 1px solid #6D72E9;
  height: 50px;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  padding: 1px 2px;

  &:hover {
    background-color: #6D72E9;
    color: white;
  }
}
</style>

<script setup lang="ts">
import _ from 'lodash'
import { useRoute } from 'vue-router'
import {useChannelStore} from "@/stores/channel";
import {computed, ref} from "vue";
import Message from "@/components/messages/message.vue";
import Input from "@/components/shared/input.vue";

const message = ref()

const route = useRoute()

const channelsStore = useChannelStore()
const {addMessage} = channelsStore

defineOptions({
  name: 'MessagePanel'
})

defineProps<{
  disabled?: boolean;
}>()

const channels = computed(() => channelsStore.channels)

const currentChannel = computed(() => {
  const channelId = route.params.channelId
  return _.find(channels.value, (channel) => channel.id === channelId)
})

const channelMessages = computed(() => currentChannel.value?.messages)

const onInput = (value) => {
  message.value = value
}

const onSend = () => {
  if (message.value) {
    addMessage({
      channelId: currentChannel.value.id,
      message: message.value
    })
  }
  message.value = undefined
}
</script>