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
    temp: roughInfo?.temp.highestTemp,
    cpu: (roughInfo?.cpu?.utilization ?? 0) / 100,
    loadavg: {
      one: roughInfo?.loadavg.oneOccupy ?? 0,
      five: roughInfo?.loadavg.fiveOccupy ?? 0,
      fifteen: roughInfo?.loadavg.fifteenOccupy ?? 0,
    },
    memory: {
      usedMemOccupy: roughInfo?.memory?.usedMemOccupy ?? 0,
      freeMemOccupy: roughInfo?.memory?.freeMemOccupy ?? 1,
      cacheSwapOccupy: roughInfo?.memory?.cacheSwapOccupy ?? 0,
    },
    net: {
      downBytesH: roughInfo?.net.downBytesH ?? 0,
      downBytesHUnit: roughInfo?.net.downBytesHUnit ?? '',
      downSpeed: roughInfo?.net.downSpeed ?? 0,
      downSpeedUnit: roughInfo?.net.downSpeedUnit ?? '',
      upBytesH: roughInfo?.net.upBytesH ?? 0,
      upBytesHUnit: roughInfo?.net.upBytesHUnit ?? '',
      upSpeed: roughInfo?.net.upSpeed ?? 0,
      upSpeedUnit: roughInfo?.net.upSpeedUnit ?? '',
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
      name: props.data.name,
    },
  })
}
</script>

<template>
  <n-card
    :title="props.data.name"
    size="huge"
    :bordered="!store.mode"
    class="rounded-xl cursor-pointer min-w-[43rem]"
    @click="handleBlockClick"
  >
    <template #header-extra>
      <div
        v-if="data.temp"
        class="flex gap-1 items-center"
      >
        <i-uil-temperature class="text-red-500" />
        {{ data.temp / 1000 }}℃
      </div>
    </template>
    <div class="flex items-center justify-between gap-8">
      <!-- cpu -->
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
      <!-- mem -->
      <div
        class="flex gap-4"
        @click.stop="memToggle = !memToggle"
      >
        <CircleBar
          v-show="memToggle"
          :width="70"
          :height="70"
          :percentage="data.memory.usedMemOccupy"
          title="Mem"
        />
        <CircleBar
          v-show="!memToggle"
          :width="70"
          :height="70"
          :percentage="data.memory.cacheSwapOccupy"
          title="Swap"
        />
      </div>
      <div class="grid grid-cols-4 grid-rows-2 w-min-[25rem]">
        <!-- net -->
        <DataWithTitle
          :num="data.net.upSpeed"
          :unit="data.net.upSpeedUnit"
          title="↑/S"
        />
        <DataWithTitle
          :num="data.net.downSpeed"
          :unit="data.net.downSpeedUnit"
          title="↓/S"
        />
        <DataWithTitle
          :num="data.net.upBytesH"
          :unit="data.net.upBytesHUnit"
          title="↑"
        />
        <DataWithTitle
          :num="data.net.downBytesH"
          :unit="data.net.downBytesHUnit"
          title="↓"
        />
        <!-- disk -->
        <DataWithTitle
          :num="data.disk.readRate"
          :unit="data.disk.readRateUnit"
          title="read/s"
        />
        <DataWithTitle
          :num="data.disk.writeRate"
          :unit="data.disk.writeRateUnit"
          title="write/s"
        />
        <DataWithTitle
          :num="data.disk.read"
          :unit="data.disk.readUnit"
          title="Read"
        />
        <DataWithTitle
          :num="data.disk.write"
          :unit="data.disk.writeUnit"
          title="Write"
        />
      </div>
    </div>
  </n-card>
</template>

<style scoped>
</style>
