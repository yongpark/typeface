<template>
  <div
      class="user-icon"
  >
    {{userIconText}}
  </div>
</template>

<style scoped>
.user-icon {
  border: 2px solid #6D72E9;
  padding: 5px;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  userName: string
}>()

const userIconText = computed(() => {
  const splitName = props.userName.split(' ')

  return `${splitName[0][0]}${splitName[1][0]}`
})

</script>