<template>
  <div
      class="modal-container"
      @click="closeDropdown"
  >
    <div
        class="dropdowns-container"
    >
      <Input
          v-if="isNotDirectChannelType"
          class="chat-name-input"
          :value="chatName"
          @input="onInput"
      />
      <Dropdown
          :type="userType"
          :items="workspaceUsers"
          :selected="selectedUsers"
          class="user-dropdown"
          @open="onUsersOpen"
          @select="onUserSelect"
      />
      <Dropdown
          v-if="selectedUsers.length > 1"
          :type="channelType"
          @select="selectedChatType = $event"
          :selected="selectedChatType"
      />
    </div>
    <div
        class="footer"
    >
      <div
          class="button close"
          @click="emit('close')"
      >
        Close
      </div>
      <div
          class="button create"
          @click="onCreate"
      >
        Create Chat
      </div>
    </div>
  </div>
</template>

<style>
.modal-container {
  z-index: 2;
  position: absolute;
  width: 500px;
  height: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(245 245 245);
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
}

.chat-name-input {
  width: 99%;
  margin-bottom: 15px;
  height: 30px;
}

.user-dropdown {
  margin-bottom: 20px;
}

.footer {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  gap: 20px;
  justify-content: end;
  width: 100%;
  right: 20px;

  .button {
    border: 1px solid gray;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-bottom: 20px;
    cursor: pointer
  }

  .close {
    width: 75px;
  }

  .create {
    width: 100px;
  }
}
</style>

<script setup lang="ts">
import {ItemsType} from "@/types/items";
import {computed, ref} from "vue";
import Dropdown from "@/components/shared/dropdown.vue";
import {useWorkspaceStore} from "@/stores/workspace";
import {useUserStore} from "@/stores/user";
import _ from "lodash";
import {ChannelType} from "@/types/channel";
import Input from "@/components/shared/input.vue";
import {useChannelStore} from "@/stores/channel";
import {storeToRefs} from "pinia";

defineOptions({
  name: 'CreateChannelModal'
})

const isUsersDropdownOpen = ref(false)

const workspaceStore = useWorkspaceStore();
const channelStore = useChannelStore();
const userStore = useUserStore();
const selectedUsers = ref([])
const selectedChatType = ref()
const chatName = ref()
const { addChannel } = channelStore

const emit = defineEmits<{
  'close': []
}>()

const currentUser = computed(() => userStore.currentUser)
const isNotDirectChannelType = computed(() => {
  return selectedChatType.value === ChannelType.PRIVATE ||
      selectedChatType.value === ChannelType.PUBLIC
})
const channelType = computed(() => ItemsType.CHANNEL)
const userType = computed(() => ItemsType.USER)
const workspaceUsers = computed(() => {
  const workspaceMemberIds = workspaceStore.currentWorkSpace.memberIds

  return _.map(workspaceMemberIds, (id) => {
    return _.find(userStore.users, (user) => {
      return user.id === id
    })
  })
})

const onUsersOpen = (val) => {
  isUsersDropdownOpen.value = val
}

const onUserSelect = (user) => {
  if (_.find(selectedUsers.value, (selectedUser) => selectedUser.id === user.id)) {
    selectedUsers.value = _.filter(selectedUsers.value, (selectedUser) => selectedUser.id !== user.id)
  } else {
    selectedUsers.value = [
        ...selectedUsers.value,
        user
    ]
  }
}

const onInput = (value) => {
  chatName.value = value
}

const onCreate = () => {
  let memberIds = _.filter(_.map(selectedUsers.value, (user) => user.id),
      (memberId) => memberId !== currentUser.value.id
  )
  memberIds = [
      ...memberIds,
      currentUser.value.id
  ]
  const channelType = selectedChatType.value ?
      selectedChatType.value : ChannelType.DIRECT

  addChannel({
    channelName: chatName.value || '',
    channelType: channelType,
    memberIds
  })
  emit('close')
}
</script>