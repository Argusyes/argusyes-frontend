<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  percentage: {
    type: Number,
    default: 50,
  },
})
</script>

<template>
  <div class="relative">
    <svg :width="props.width" :height="props.height" viewBox="0 0 100 100">
      <circle
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        class="bar-background"
      />
      <circle
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="Math.PI * 100"
        :stroke-dashoffset="Math.PI * 100 * (1 - props.percentage)"
        class="bar"
      />
    </svg>
    <div class="percentage-text">
      {{ (props.percentage * 100).toFixed(0) }}%
    </div>
  </div>
</template>

<style scoped>
circle {
  /* stroke-linecap: round; */
  stroke-width: 5%;
  transform-origin: center;
}
.bar-background {
  @apply stroke-gray-600/50;
  transform: scale(0.9091);
}
.bar {
  @apply stroke-red-500;
  transform: scale(0.9091) rotate(270deg);
}
.percentage-text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
