<template>
  <div
      class="message-container"
  >
      <MessageIcon
          :user-name="messageUser.name"
          class="left-icon"
      />
      <div>
        <div
            class="message-header"
        >
          <div
              class="message-user"
          >
            {{ messageUser.name }}
          </div>
          <div
              class="message-time"
          >
            {{parsedDate}}
          </div>
        </div>
        {{ message.content }}
      </div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
}

.message-header {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.message-user {
  font-weight: 600;
}

.left-icon {
  margin-right: 10px;
}
</style>

<script setup lang="ts">
import _ from 'lodash'
import {type Message} from '@/types/message'
import {useUserStore} from "@/stores/user";
import {computed} from "vue";
import MessageIcon from "./messageIcon.vue";

defineOptions({
  name: 'MessageItem'
})

const props = defineProps<{
  message: Message
}>()

const userStore = useUserStore()
const users = computed(() => userStore.users)

const messageUser = computed(() => {
  return _.find(users.value, (user) => user.id === props.message.userId)
})

const parsedDate = computed(() => {
  const messageDate = props.message.createdAt
  const hours = messageDate.getHours() < 10 ? `0${messageDate.getHours()}` : messageDate.getHours()
  const minutes = messageDate.getMinutes() < 10 ? `0${messageDate.getMinutes()}` : messageDate.getMinutes()

  return `${messageDate.getMonth()}-${messageDate.getDate()} - ${hours}:${minutes}`
})
</script>