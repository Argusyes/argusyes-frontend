<script setup>
import { round } from 'lodash'

const store = useStore()
const { mem } = storeToRefs(store)
</script>

<template>
  <DetailsBox>
    <div>
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="round(mem.memory?.freeMem ?? 0, 1)"
          :unit="mem.memory?.freeMemUnit ?? ''"
          title="FREE"
        />
        <!-- TODO: backend should apply this info (unit) -->
        <DataWithTitle
          :num="round(mem.memory?.usedMem ?? 0, 1)"
          :unit="mem.memory?.usedMemUnit ?? ''"
          title="USED"
          color="green"
        />
        <DataWithTitle
          :num="round(mem.memory?.cached ?? 0, 1)"
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
