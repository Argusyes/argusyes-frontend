<script setup>
import { round } from 'lodash'

const props = defineProps({
  sys: {
    type: Number,
    default: 0,
  },
  user: {
    type: Number,
    default: 0,
  },
  iowait: {
    type: Number,
    default: 0,
  },
  steal: {
    type: Number,
    default: 0,
  },
})
const TOTAL_HINTS = 60
const hintCounters = computed(() => {
  return {
    sys: round(props.sys * TOTAL_HINTS),
    user: round(props.user * TOTAL_HINTS),
    iowait: round(props.iowait * TOTAL_HINTS),
    steal: round(props.steal * TOTAL_HINTS),
    remain: TOTAL_HINTS - round(props.sys * TOTAL_HINTS) - round(props.user * TOTAL_HINTS) - round(props.iowait * TOTAL_HINTS) - round(props.steal * TOTAL_HINTS),
  }
})
</script>

<template>
  <div class="flex gap-1 justify-between">
    <!-- sys -->
    <ColorHint
      v-for="i in hintCounters.sys"
      :key="i"
      color="red"
      class="w-1"
    />
    <!-- user -->
    <ColorHint
      v-for="i in hintCounters.user"
      :key="i"
      color="green"
      class="w-1"
    />
    <!-- iowait -->
    <ColorHint
      v-for="i in hintCounters.iowait"
      :key="i"
      color="purple"
      class="w-1"
    />
    <!-- steal -->
    <ColorHint
      v-for="i in hintCounters.steal"
      :key="i"
      color="yellow"
      class="w-1"
    />
    <!-- remain -->
    <ColorHint
      v-for="i in (hintCounters.remain >= 0 ? hintCounters.remain : 0)"
      :key="i"
      color="background-gray"
      class="w-1"
    />
  </div>
</template>

<style scoped>
</style>
