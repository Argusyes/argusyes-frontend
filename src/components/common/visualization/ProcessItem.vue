<script setup>
import { round } from 'lodash'

const props = defineProps({
  pid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  memUnit: {
    type: String,
    default: '',
    required: true,
  },
  mem: {
    type: Number,
    default: 0,
    required: true,
  },
  cpu: {
    type: Number,
    default: 0,
    required: true,
  },
})
</script>

<template>
  <div class="layout">
    <span>{{ props.pid }}</span>
    <n-ellipsis class="font-semibold">
      {{ props.name }}
    </n-ellipsis>
    <NumWithUnit
      :num="round(props.cpu, 1)"
      unit="%"
      class="justify-end"
    />
    <NumWithUnit
      :num="round(props.mem, 1)"
      :unit="props.memUnit"
      class="justify-end"
    />
  </div>
</template>

<style scoped>
.layout {
  @apply grid grid-cols-[6rem,1fr,6rem,6rem] gap-2;
}
</style>
