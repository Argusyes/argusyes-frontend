<script setup>
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

const hintCounters = computed(() => {
  return {
    sys: Math.round(props.sys * 50),
    user: Math.round(props.user * 50),
    iowait: Math.round(props.iowait * 50),
    steal: Math.round(props.steal * 50),
    remain: 50 - Math.round(props.sys * 50) - Math.round(props.user * 50) - Math.round(props.iowait * 50) - Math.round(props.steal * 50),
  }
})
onMounted(() => {
  window.hintCounters = hintCounters
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
      v-for="i in hintCounters.remain"
      :key="i"
      color="gray"
      class="w-1"
    />
  </div>
</template>

<style scoped>
</style>
