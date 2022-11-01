<script setup>
const props = defineProps({
  name: {
    type: String,
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
    <n-ellipsis>{{ props.name }}</n-ellipsis>
    <NumWithUnit
      :num="props.cpu"
      unit="%"
      class="justify-end"
    />
    <NumWithUnit
      :num="props.mem"
      unit="M"
      class="justify-end"
    />
  </div>
</template>

<style scoped>
.layout {
  @apply grid grid-cols-[1fr,6rem,6rem] gap-2;
}
</style>
