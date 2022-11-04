<script setup>
const store = useStore()
const { mem } = storeToRefs(store)
</script>

<template>
  <DetailsBox>
    <div>
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="Math.round(mem.memory?.freeMem ?? 0)"
          :unit="mem.memory?.freeMemUnit ?? ''"
          title="FREE"
        />
        <!-- TODO: backend should apply this info (unit) -->
        <DataWithTitle
          :num="Math.round((mem.memory?.totalMem ?? 0) - (mem.memory?.freeMem ?? 0) - (mem.memory?.cached ?? 0))"
          :unit="mem.memory?.freeMemUnit ?? ''"
          title="USED"
          color="green"
        />
        <DataWithTitle
          :num="Math.round(mem.memory?.cached ?? 0)"
          :unit="mem.memory?.cachedUnit ?? ''"
          title="PAGE CACHE"
          color="gray"
        />
        <!-- TODO: circle bar -->
      </div>
    </div>
  </DetailsBox>
</template>

<style scoped>

</style>
