<template>
  <input
      :value="value"
      @input="onChange"
      :disabled="disabled"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";

defineOptions({
  name: 'BaseInput'
})

const value = ref()

const props = defineProps<{
  disabled?: boolean;
}>()

const emit = defineEmits<{
  'input': [string]
}>()

const onChange = (event) => {
  value.value = event.target.value
  emit('input', value.value)
}
</script>