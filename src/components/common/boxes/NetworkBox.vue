<script setup>
const store = useStore()
const { net } = storeToRefs(store)
</script>

<template>
  <DetailsBox>
    <div>
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="Math.round(net.netDevTotal?.upSpeed ?? 0)"
          :unit="net.netDevTotal?.upSpeedUnit ?? ''"
          title="↑/S"
          class="w-14"
        />
        <DataWithTitle
          :num="Math.round(net.netDevTotal?.downSpeed ?? 0)"
          :unit="net.netDevTotal?.downSpeedUnit ?? ''"
          title="↓/S"
          class="w-14"
        />
        <DataWithTitle
          :num="Math.round(net.netDevTotal?.upBytesH ?? 0)"
          :unit="net.netDevTotal?.upBytesHUnit ?? ''"
          title="↑"
          color="yellow"
        />
        <DataWithTitle
          :num="Math.round(net.netDevTotal?.downBytesH ?? 0)"
          :unit="net.netDevTotal?.downBytesHUnit ?? ''"
          title="↓"
          color="green"
        />
        <!-- TODO: circle bar -->
      </div>
      <n-divider />
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="8"
          unit="%"
          title="RETRANS"
        />
        <DataWithTitle
          :num="net.netTCP?.activeOpens ?? 0"
          title="ACTIVE"
        />
        <DataWithTitle
          :num="net.netTCP?.passiveOpens ?? 0"
          title="PASSIVE"
        />
        <DataWithTitle
          :num="net.netTCP?.failOpens ?? 0"
          title="FAILS"
        />
      </div>
      <n-divider />
      <div class="flex flex-col gap-4">
        <NetworkInterfaceInfo
          v-for="i in 2"
          :key="i"
        />
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
