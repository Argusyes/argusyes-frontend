<script setup>
const store = useStore()

const processList = computed(() => {
  if (!store.process.process)
    return []

  return store.process.process.map((e) => {
    return {
      pid: e.PID,
      name: e.name,
      cpu: e.CPU,
      mem: e.mem,
      memUnit: e.memUnit,
    }
  })
})
</script>

<template>
  <DetailsBox>
    <div>
      <div class="layout secondary-text">
        <span>PID</span>
        <span>PROCESS</span>
        <span class="justify-self-end">
          CPU %
          <span class="font-semibold">↓</span>
        </span>
        <span class="justify-self-end">MEM</span>
      </div>
      <!-- <div class="border-b-1 border-white/10 my-2" /> -->
      <n-divider />
      <div class="flex flex-col gap-1">
        <ProcessItem
          v-for="item in processList"
          :key="item.pid"
          :pid="item.pid"
          :name="item.name"
          :cpu="item.cpu"
          :mem="item.mem"
          :mem-unit="item.memUnit"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>
.layout {
  @apply grid grid-cols-[6rem,1fr,6rem,6rem] gap-2;
}
</style>
