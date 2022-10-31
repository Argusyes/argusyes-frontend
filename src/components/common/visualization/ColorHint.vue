<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'gray', 'red', 'green', 'purple', 'yellow'].includes(value)
    },
  },
})
</script>

<template>
  <div
    v-if="props.color !== 'none'"
    class="rounded-lg h-3"
    :class="props.color"
  />
</template>

<style scoped>
</style>
