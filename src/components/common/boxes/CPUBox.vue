<script setup>
const store = useStore()
const { cpu } = storeToRefs(store)

const coresNum = computed(() => {
  return _.keys(store.cpu.cpuPerformance).length
})

const coresUsageList = computed(() => {
  if (!store.cpu.cpuPerformance)
    return []

  return _.values(store.cpu.cpuPerformance).map((e) => {
    return {
      sys: e.system / 100,
      user: e.user / 100,
      iowait: e.IO / 100,
      steal: e.steal / 100,
    }
  })
})
</script>

<template>
  <DetailsBox>
    <div>
      <div class="grid grid-cols-5">
        <NumWithUnit
          :num="Math.round(cpu.total?.utilization ?? 0)"
          unit="%"
          font-size="text-4xl"
        />
        <DataWithTitle
          :num="Math.round(cpu.total?.system ?? 0)"
          unit="%"
          title="SYS"
          color="red"
          class="justify-self-end"
        />
        <DataWithTitle
          :num="Math.round(cpu.total?.user ?? 0)"
          unit="%"
          title="USER"
          color="green"
          class="justify-self-end"
        />
        <DataWithTitle
          :num="Math.round(cpu.total?.IO ?? 0)"
          unit="%"
          title="IOWAIT"
          color="purple"
          class="justify-self-end"
        />
        <DataWithTitle
          :num="Math.round(cpu.total?.steal ?? 0)"
          unit="%"
          title="STEAL"
          color="yellow"
          class="justify-self-end"
        />
      </div>
      <n-divider />
      <CPUCoresUsage :data="coresUsageList" />
      <n-divider />
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="coresNum"
          title="CORES"
        />
        <DataWithTitle
          :num="Math.round(cpu.total?.free ?? 100)"
          unit="%"
          title="IDLE"
        />
        <DataWithTitle
          :num="Math.round(cpu.total?.totalTime ?? 0)"
          :unit="cpu.total?.totalTimeUnit ?? ''"
          title="UPTIME"
        />
        <!--  TODO: load 1/5/15m -->
        <DataWithTitle
          :num="0"
          unit="%"
          title="LOAD"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
