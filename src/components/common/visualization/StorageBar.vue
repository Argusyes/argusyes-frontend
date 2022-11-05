<script setup>
import _ from 'lodash'
const props = defineProps({
  fileSystem: {
    type: String,
    required: true,
    default: '',
  },
  free: {
    type: Number,
    required: true,
  },
  freeUnit: {
    type: String,
    required: true,
    default: 'GB',
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
    default: 'GB',
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
          <!-- TODO: need usage, cannot calculate with different unit -->
          {{ _.round(props.total - props.free, 2) }} {{ props.totalUnit }}
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
