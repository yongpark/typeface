<template>
  <div
    class="channel-item"
    @mouseenter="showDelete = true"
    @mouseleave="showDelete = false"
  >
    <div
        class="channel-name"
    >
      {{suffix}} {{ channelName }}
    </div>
    <div
        v-if="showDelete"
        class="delete-channel"
        @click.stop="emits('delete', channel.id)"
    >
      x
    </div>
  </div>
</template>

<style scoped>
.channel-item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.channel-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-channel {
  cursor: pointer
}
</style>

<script setup lang="ts">
import _ from 'lodash'
import {type Channel, ChannelType} from "@/types/channel";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";

const showDelete = ref(false)

const props = defineProps<{
  channel: Channel
}>()

const emits = defineEmits<{
  'delete': [string]
}>()

const userStore = useUserStore()

const currentUserId = computed(() => userStore.currentUser.id)

const suffix = computed(() => {
  return props.channel.type !== ChannelType.DIRECT ? '#' : ''
})

const channelName = computed(() => {
  const workspaceUsers = userStore.users
  const channelUsersFromStore = _.filter(workspaceUsers, (user) =>
    _.includes(props.channel.memberIds, user.id)
  )

  const filteredUsers = channelUsersFromStore.length === 1 ? channelUsersFromStore :
      _.filter(channelUsersFromStore, (user) => user.id !== currentUserId.value)

  return props.channel.type !== ChannelType.DIRECT ? props.channel.name :
      _.map(filteredUsers, (user) => user.name.split(' ')[0]).join(', ')
})

</script>