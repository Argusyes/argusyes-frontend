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
.none {
  @apply bg-red-500;
}
.gray {
  @apply bg-gray-500;
}
.red {
  @apply bg-red-500;
}
.green {
  @apply bg-green-500;
}
.purple {
  @apply bg-purple-500;
}
.yellow {
  @apply bg-yellow-500;
}
</style>
