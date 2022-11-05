<script setup>
import { round } from 'lodash'

const store = useStore()
const { disk } = storeToRefs(store)

const diskList = computed(() => {
  return _.values(store.disk.diskMap).sort((a, b) => {
    if (a.mount > b.mount)
      return 1
    if (a.mount < b.mount)
      return -1
    return 0
  }) ?? []
})
</script>

<template>
  <DetailsBox>
    <div class="flex justify-between">
      <DataWithTitle
        :num="round(disk.readRate ?? 0, 1)"
        :unit="disk.readRateUnit"
        title="read/s"
        class="w-18"
      />
      <DataWithTitle
        :num="round(disk.writeRate ?? 0, 1)"
        :unit="disk.writeRateUnit"
        title="write/s"
        class="w-18"
      />
      <DataWithTitle
        :num="round(disk.read ?? 0, 1)"
        :unit="disk.readUnit"
        title="Read"
        class="w-18"
      />
      <DataWithTitle
        :num="round(disk.write ?? 0, 1)"
        :unit="disk.writeUnit"
        title="Write"
      />
    </div>
    <div class="flex flex-col gap-4 mt-4">
      <DiskInfo
        v-for="item in diskList"
        :key="item.devName"
        :data="item"
      />
    </div>
  </DetailsBox>
</template>

<style scoped>
</style>
