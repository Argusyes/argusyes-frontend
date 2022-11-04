<script setup>
const store = useStore()
const { net } = storeToRefs(store)

const showVirtual = ref(false)
const devList = computed(() => {
  if (!store.net.netDev)
    return []
  const tmpArr = _.values(store.net.netDev)
  return tmpArr.filter((e) => {
    return !e.virtual
  })
})
const virList = computed(() => {
  if (!store.net.netDev)
    return []
  const tmpArr = _.values(store.net.netDev)
  return tmpArr.filter((e) => {
    return e.virtual
  })
})
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
          v-for="item in devList"
          :key="item.name + item.ip"
          :data="item"
        />
        <div v-if="virList.length > 0">
          <div
            class="flex justify-between cursor-pointer secondary-text"
            @click="showVirtual = !showVirtual"
          >
            <span>
              VIRTUAL INTERFACES
            </span>
            <span class="flex items-center gap-1">
              {{ virList.length }}
              <i-ic-outline-keyboard-arrow-down v-if="showVirtual" class="text-red-400 text-lg" />
              <i-ic-outline-keyboard-arrow-right v-else class="text-red-500 text-lg" />
            </span>
          </div>
          <n-collapse-transition :show="showVirtual">
            <div class="flex flex-col gap-4">
              <NetworkInterfaceInfo
                v-for="item in virList"
                :key="item.name + item.ip"
                :data="item"
              />
            </div>
          </n-collapse-transition>
        </div>
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
