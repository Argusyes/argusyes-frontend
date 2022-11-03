<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const store = useStore()
const router = useRouter()

const cpuToggle = ref(true)
const memToggle = ref(true)

const id = computed(() => {
  return `${props.data.user}@${props.data.host}:${props.data.port}`
})
const data = computed(() => {
  const roughInfo = store.rough[id.value]
  return {
    temp: (roughInfo?.temp.highestTemp ?? 0) / 1000,
    cpu: (roughInfo?.cpu?.utilization ?? 0) / 100,
    loadavg: {
      one: (roughInfo?.loadavg.oneOccupy ?? 0) / 100,
      five: (roughInfo?.loadavg.fiveOccupy ?? 0) / 100,
      fifteen: (roughInfo?.loadavg.fifteenOccupy ?? 0) / 100,
    },
    memory: {
      availableMemOccupy: roughInfo?.memory?.availableMemOccupy ?? 1,
      freeMemOccupy: roughInfo?.memory?.freeMemOccupy ?? 1,
      swapFreeOccupy: roughInfo?.memory?.swapFreeOccupy ?? 0,
    },
    net: {
      downBytesH: roughInfo?.net.downBytesH ?? 0,
      downBytesHUnit: roughInfo?.disk.downBytesHUnit ?? '',
      downSpeed: roughInfo?.net.downSpeed ?? 0,
      downSpeedUnit: roughInfo?.disk.downSpeedUnit ?? '',
      upBytesH: roughInfo?.net.upBytesH ?? 0,
      upBytesHUnit: roughInfo?.disk.upBytesHUnit ?? '',
      upSpeed: roughInfo?.net.upSpeed ?? 0,
      upSpeedUnit: roughInfo?.disk.upSpeedUnit ?? '',
    },
    disk: {
      read: roughInfo?.disk.read ?? 0,
      readUnit: roughInfo?.disk.readUnit ?? '',
      readRate: roughInfo?.disk.readRate ?? 0,
      readRateUnit: roughInfo?.disk.readRateUnit ?? '',
      write: roughInfo?.disk.write ?? 0,
      writeUnit: roughInfo?.disk.writeUnit ?? '',
      writeRate: roughInfo?.disk.writeRate ?? 0,
      writeRateUnit: roughInfo?.disk.writeRateUnit ?? '',
    },
  }
})

// events
function handleBlockClick() {
  router.push({
    name: 'statusDetails',
    params: {
      name: 'lab',
    },
  })
}
</script>

<template>
  <n-card
    :title="props.data.name"
    size="huge"
    :bordered="!store.mode"
    class="rounded-xl cursor-pointer"
    @click="handleBlockClick"
  >
    <template #header-extra>
      <i-uil-temperature class="text-red-500" />
      {{ data.temp }}℃
    </template>
    <div class="flex items-center justify-between gap-4">
      <div
        class="flex gap-4"
        @click.stop="cpuToggle = !cpuToggle"
      >
        <CircleBar
          v-show="cpuToggle"
          :width="70"
          :height="70"
          :percentage="data.cpu"
          title="CPU"
        />
        <div
          v-show="!cpuToggle"
          class="flex flex-col justify-between relative"
        >
          <CircleBar
            :width="70"
            :height="70"
            :show-percentage="false"
            :percentage="data.loadavg.one"
            title="Load"
          />
          <CircleBar
            :width="50"
            :height="50"
            :show-percentage="false"
            :percentage="data.loadavg.five"
            class="absolute m-[10px]"
          />
          <CircleBar
            :width="32"
            :height="32"
            :show-percentage="false"
            :percentage="data.loadavg.fifteen"
            class="absolute m-[19px] z-10"
          />
        </div>
      </div>
      <div
        class="flex gap-4"
        @click.stop="memToggle = !memToggle"
      >
        <CircleBar
          v-show="memToggle"
          :width="70"
          :height="70"
          :percentage="1 - data.memory.availableMemOccupy"
          title="Mem"
        />
        <CircleBar
          v-show="!memToggle"
          :width="70"
          :height="70"
          :percentage="data.memory.swapFreeOccupy"
          title="Swap"
        />
      </div>
      <div class="flex flex-col justify-between gap-1">
        <div class="flex justify-between items-center gap-3">
          <DataWithTitle
            :num="8"
            unit="K/s"
            title="↑/S"
          />
          <DataWithTitle
            :num="72"
            unit="K/s"
            title="↓/S"
          />
          <DataWithTitle
            :num="104"
            unit="G"
            title="↑"
          />
          <DataWithTitle
            :num="98"
            unit="G"
            title="↓"
          />
        </div>
        <div class="flex justify-between items-center gap-3">
          <DataWithTitle
            :num="8"
            unit="K/s"
            title="read/s"
          />
          <DataWithTitle
            :num="72"
            unit="K/s"
            title="write/s"
          />
          <DataWithTitle
            :num="104"
            unit="G"
            title="Read"
          />
          <DataWithTitle
            :num="98"
            unit="G"
            title="Write"
          />
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
</style>
