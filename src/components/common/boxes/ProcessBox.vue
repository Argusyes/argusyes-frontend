<script setup>
const tmpData = [
  {
    name: 'this is a very very very very very very very very very very very very very very very long name',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 85,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 8,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'this is a very very very very very very very very very very very very very very very long name',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 85,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 8,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'this is a very very very very very very very very very very very very very very very long name',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 85,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 8,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
  {
    name: 'process1',
    cpu: 100,
    mem: 58,
  },
]
</script>

<template>
  <DetailsBox class="max-h-full overflow-auto scrollbar-hide">
    <div class="relative">
      <div class="layout secondary-text">
        <span>PROCESS</span>
        <span class="justify-self-end">CPU %</span>
        <span class="justify-self-end">MEM</span>
      </div>
      <!-- <div class="border-b-1 border-white/10 my-2" /> -->
      <n-divider />
      <div class="flex flex-col gap-1">
        <ProcessItem
          v-for="(item, index) in tmpData"
          :key="index"
          :name="item.name"
          :cpu="item.cpu"
          :mem="item.mem"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>
.layout {
  @apply grid grid-cols-[1fr,6rem,6rem] gap-2;
}
</style>
