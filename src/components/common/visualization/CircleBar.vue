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
    default: 0,
  },
  showPercentage: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  divide: {
    type: Array,
    default: () => [(1 / 3), (2 / 3)],
  },
  strokeWidth: {
    type: String,
    default: '10%',
  },
})

const colorCSSClass = computed(() => {
  let result = 'green'
  const percentageFixed2 = props.percentage.toFixed(2)
  if (props.divide?.length === 2) {
    if (percentageFixed2 < props.divide[0])
      result = 'green'
    else if (percentageFixed2 >= props.divide[1])
      result = 'red'
    else
      result = 'yellow'
  }
  return `${result}-bar`
})
</script>

<template>
  <div class="flex flex-col items-center gap-1 text-gray-400">
    <div class="relative">
      <svg
        :width="props.width"
        :height="props.height"
        viewBox="0 0 100 100"
        class="hover:scale-110"
      >
        <circle
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          class="bar-background"
          :style="{
            strokeWidth: props.strokeWidth,
          }"
        />
        <circle
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          :stroke-dasharray="Math.PI * 100"
          :stroke-dashoffset="Math.PI * 100 * (1 - props.percentage)"
          class="bar"
          :class="[colorCSSClass]"
          :style="{
            strokeWidth: props.strokeWidth,
          }"
        />
      </svg>
      <div
        v-if="props.showPercentage"
        class="percentage-text font-light"
      >
        {{ (props.percentage * 100).toFixed(0) }}%
      </div>
    </div>
    <span v-if="props.title !== ''">
      {{ props.title }}
    </span>
  </div>
</template>

<style scoped>
circle {
  stroke-linecap: round;
  stroke-width: 10%;
  transform-origin: center;
}
.bar-background {
  @apply stroke-gray-600/30;
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
.green-bar {
  stroke: rgb(16, 185, 129)
}
.yellow-bar {
  stroke: rgb(245, 158, 11)
}
.red-bar {
  stroke: rgb(239, 68, 68)
}
</style>
