<script setup>
const store = useStore()
const { disk } = storeToRefs(store)

const diskList = computed(() => {
  return store.disk.diskMap ?? []
})
</script>

<template>
  <DetailsBox>
    <div class="flex justify-between">
      <DataWithTitle
        :num="disk.readRate ?? 0"
        :unit="disk.readRateUnit"
        title="read/s"
        class="w-18"
      />
      <DataWithTitle
        :num="disk.writeRate ?? 0"
        :unit="disk.writeRateUnit"
        title="write/s"
        class="w-18"
      />
      <DataWithTitle
        :num="disk.read ?? 0"
        :unit="disk.readUnit"
        title="Read"
        class="w-18"
      />
      <DataWithTitle
        :num="disk.write ?? 0"
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
