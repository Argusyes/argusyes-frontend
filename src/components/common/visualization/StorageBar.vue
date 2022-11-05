<script setup>
import { round } from 'lodash'

const props = defineProps({
  fileSystem: {
    type: String,
    required: true,
    default: '',
  },
  used: {
    type: Number,
    required: true,
  },
  usedUnit: {
    type: String,
    required: true,
    default: 'MB',
  },
  freeRate: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  totalUnit: {
    type: String,
    required: true,
    default: 'MB',
  },
})
const store = useStore()
</script>

<template>
  <div class="flex gap-2">
    <div class="flex flex-col justify-between items-end">
      <div class="secondary-text">
        {{ props.fileSystem }}
      </div>
      <div>
        <span>
          {{ round(props.used, 1) }} {{ props.usedUnit }}
        </span>
        <span class="secondary-text"> / {{ props.total }} {{ props.totalUnit }}</span>
      </div>
    </div>

    <div class="w-6 h-full green rounded-md overflow-hidden relative">
      <div
        :class="{
          'bg-gray-200': !store.mode,
          'bg-black': store.mode,
        }"
        :style="{
          height: `${props.freeRate * 100}%`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
