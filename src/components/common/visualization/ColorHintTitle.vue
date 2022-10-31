<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
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
  <div class="flex items-center gap-2">
    <div
      v-if="props.color !== 'none'"
      class="rounded-lg h-4 w-2"
      :class="props.color"
    />
    <span v-if="props.title !== ''" class="secondary-text">
      {{ props.title }}
    </span>
  </div>
</template>

<style scoped>
</style>
