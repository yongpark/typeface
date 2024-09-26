<template>
  <div
      class="dropdown-container"
  >
    <div
        class="dropdown-launcher"
        @click="toggleOpen"
    >
      {{computedSelected}}
    </div>
    <div
        v-if="isOpen"
        class="dropdown-items-container"
    >
      <DropdownItem
          v-for="(item, i) in computedItems"
          :key="i"
          :item="item"
          :type="type"
          @click="onSelectItem(item)"
      />
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  width: 100%;
  height: 50px;
  border: 1px solid #6D72E9;
  border-radius: 4px;
}

.dropdown-launcher {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 5px;
  cursor: pointer;
}

.dropdown-items-container {
  margin-top: 10px;
  border-top: 1px solid #6D72E9;
  border-radius: 4px;
}
</style>

<script setup lang="ts">
import _ from "lodash";
import {ChannelType} from "@/types/channel";
import type {User} from "@/types/user";
import {ItemsType} from "@/types/items";
import {computed, ref} from "vue";
import DropdownItem from "@/components/shared/dropdownItem.vue";

defineOptions({
  name: 'DropdownContainer'
})

const props = defineProps<{
  items?: User[],
  selected?: ChannelType | User[]
  type: ItemsType
}>()

const emit = defineEmits<{
  'open': [boolean]
  'select': [ChannelType | User]
}>()

const isOpen = ref(false)

const computedItems = computed(() => {
  return props.type === ItemsType.USER ? props.items :
      [
        ChannelType.PUBLIC,
        ChannelType.PRIVATE,
        ChannelType.DIRECT,
      ]
})

const computedSelected = computed(() => {
  if (!props.selected && props.type === ItemsType.CHANNEL) {
    return 'Select Channel Type'
  }

  if (!props.selected.length && props.type === ItemsType.USER) {
    return 'Select Users'
  }

  return props.type === ItemsType.USER ? _.map(props.selected, (user) => {
    return user.name
  }).join(', ') : props.selected
})

const toggleOpen = () => {
  emit('open', !isOpen.value)
  isOpen.value = !isOpen.value
}

const onSelectItem = (item) => {
  emit('select', item)
  toggleOpen()
}
</script>
