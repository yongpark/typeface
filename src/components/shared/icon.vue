<template>
  <div
      class="workspace-icon"
      :class="[selected ? 'selected' : '']"
  >
    {{ workspaceShorthand }}
  </div>
</template>

<style scoped>
.workspace-icon {
  border: 1px solid #787878;
  padding: 5px;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 3px solid #6D72E9;
  }
}

.selected {
  background-color: #6D72E9;
  color: white;
}
</style>

<script setup lang="ts">
import { type Workspace } from '@/types/workspace'
import {computed} from "vue";

defineOptions({
  name: 'WorkspaceIcon',
})

const props = defineProps<{
  workspace: Workspace,
  selected: boolean
}>()

defineEmits<{
  'select-workspace': [string]
}>()

const workspaceShorthand = computed(() => {
  const workspaceName = props.workspace.name

  return workspaceName.slice(0, 2).toUpperCase()
})

</script>