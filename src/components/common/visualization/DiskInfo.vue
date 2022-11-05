<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const store = useStore()
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
    <div class="flex justify-between">
      <div class="flex flex-col gap-1">
        <span>
          {{ props.data.mount }}
        </span>
        <span class="secondary-text">
          {{ props.data.devName }}
        </span>
      </div>
      <StorageBar
        :file-system="props.data.fileSystem"
        :free="props.data.free"
        :free-unit="props.data.freeUnit"
        :free-rate="props.data.freeRate"
        :total="props.data.total"
        :total-unit="props.data.totalUnit"
      />
    </div>
    <!-- <n-divider /> -->
    <div class="grid grid-cols-5 grid-rows-3">
      <!-- first line -->
      <div class="secondary-text">
        <!-- TODO: change to an animated logo -->
        logo
      </div>
      <div class="secondary-text">
        SPEED
      </div>
      <div class="secondary-text">
        BYTES
      </div>
      <div class="secondary-text">
        IOPS
      </div>
      <div class="secondary-text">
        WAIT
      </div>
      <!-- second line -->
      <div class="secondary-text">
        R
      </div>
      <NumWithUnit
        :num="props.data.readRate ?? 0"
        :unit="`${props.data.readRateUnit ?? 'B'}/s`"
      />
      <NumWithUnit
        :num="props.data.read ?? 0"
        :unit="props.data.readUnit ?? 'B'"
      />
      <NumWithUnit
        :num="props.data.readIOPS"
      />
      <NumWithUnit
        :num="0"
      />
      <!-- third line -->
      <div class="secondary-text">
        W
      </div>
      <NumWithUnit
        :num="props.data.writeRate ?? 0"
        :unit="`${props.data.writeRateUnit ?? 'B'}/s`"
      />
      <NumWithUnit
        :num="props.data.write ?? 0"
        :unit="props.data.writeUnit ?? 'B'"
      />
      <NumWithUnit
        :num="props.data.writeIOPS"
      />
      <NumWithUnit
        :num="0"
      />
    </div>
  </n-card>
</template>

<style scoped>
</style>
