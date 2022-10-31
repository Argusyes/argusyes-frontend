<script setup>
const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: '',
  },
  fontSize: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex items-end gap-1">
    <span v-if="props.num !== 0" class="strong-text" :class="props.fontSize">
      {{ props.num }}
    </span>
    <span v-else-if="props.num === 0" class="secondary-text" :class="props.fontSize">
      {{ props.num }}
    </span>
    <span class="secondary-text">
      {{ props.unit }}
    </span>
  </div>
</template>

<style lang="scss" scoped>

</style>
