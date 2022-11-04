<script setup>
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
      :num="props.cpu"
      unit="%"
      class="justify-end"
    />
    <NumWithUnit
      :num="props.mem"
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
