<template>
  <input
      :value="value"
      @input="onChange"
      :disabled="disabled"
  />
</template>

<script setup lang="ts">

defineOptions({
  name: 'BaseInput'
})

defineProps<{
  disabled?: boolean;
  value: string;
}>()

const emit = defineEmits<{
  'input': [string]
}>()

const onChange = (event) => {
  emit('input', event.target.value)
}
</script>