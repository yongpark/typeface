<template>
  <div
      class="dropdown-item"
  >
    {{computedName}}
  </div>
</template>

<style scoped>
  .dropdown-item {
    border-top: none;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    height: 35px;
    padding-left: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: gray;
    }
  }
</style>

<script setup lang="ts">
import {ChannelType} from "@/types/channel";
import {User} from "@/types/user";
import {ItemsType} from "@/types/items";
import {computed} from "vue";

const props = defineProps<{
  item: ChannelType | User;
  type: ItemsType
}>()

const computedName =  computed(() => {
  return props.type === ItemsType.USER ? props.item.name : props.item
})
</script>