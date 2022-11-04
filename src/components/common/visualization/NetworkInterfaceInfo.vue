<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => { return {} },
  },
})

const store = useStore()

const showGreenWifiLogo = computed(() => {
  return Boolean(props.data.upSpeed) || Boolean(props.data.downSpeed)
})
</script>

<template>
  <n-card
    :bordered="false"
    class="rounded-lg"
    :class="{
      'bg-white/2': store.mode,
      'bg-black/2': !store.mode,
    }"
  >
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <i-material-symbols-wifi
            :class="{
              'text-green-500': showGreenWifiLogo,
              'text-gray-500': !showGreenWifiLogo,
            }"
          />
          <span>
            {{ props.data.name }}
          </span>
        </div>
        <span class="secondary-text">10.112.159.83</span>
      </div>
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="Math.round(props.data.downSpeed ?? 0)"
          :unit="props.data.upSpeedUnit ?? ''"
          title="↑/S"
          class="w-14"
        />
        <DataWithTitle
          :num="Math.round(data.downSpeed ?? 0)"
          :unit="props.data.downSpeedUnit ?? ''"
          title="↓/S"
          class="w-14"
        />
        <DataWithTitle
          :num="Math.round(props.data.upBytesH ?? 0)"
          :unit="props.data.upBytesHUnit ?? ''"
          title="↑"
          color="yellow"
          class="w-14"
        />
        <DataWithTitle
          :num="Math.round(props.data.downBytesH ?? 0)"
          :unit="props.data.downBytesHUnit ?? ''"
          title="↓"
          color="green"
          class="w-14"
        />
        <!-- TODO: circle bar -->
      </div>
    </div>
  </n-card>
</template>

<style scoped>
</style>
