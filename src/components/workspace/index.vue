<template>
  <div
      class="workspace-container"
  >
    <Icon
      v-for="(workspace) in workspaces"
      :key="workspace.id"
      :workspace="workspace"
      :selected="currentWorkspace.id === currentWorkspaceId"
    />
  </div>
</template>

<style scoped>
.workspace-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  align-items: center;
  background-color: #D9D9D9;
}
</style>

<script setup lang="ts">
import _ from 'lodash'
import { computed } from 'vue'
import {useWorkspaceStore} from "@/stores/workspace";
import {useAppMetaStore} from "@/stores/appMeta";
import Icon from '../shared/icon.vue'

defineOptions({
  name: 'WorkspaceContainer',
});

const appMetaStore = useAppMetaStore()
const workspaceStore = useWorkspaceStore()

const currentWorkspaceId = computed(() => {
  return appMetaStore.currentWorkSpace.id
})
const workspaces = computed(() => {
  return workspaceStore.workspaces
})

const currentWorkspace = computed(() => {
  return _.find(workspaces.value, (workspace) => workspace.id === currentWorkspaceId.value)
})
</script>