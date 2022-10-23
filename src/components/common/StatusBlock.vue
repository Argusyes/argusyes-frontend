<script setup>
const percentage = ref(10)
</script>

<template>
  <n-card title="Lab" size="huge" :bordered="false" class="rounded-xl cursor-pointer">
    <template #header-extra>
      <i-uil-temperature class="text-red-500" />
      30℃
    </template>
    <div class="flex items-center justify-between">
      <CircleBar
        :width="60"
        :height="60"
        :percentage=".799"
        title="Mem"
        :divide="[.10, .80]"
      />
      <CircleBar
        :width="60"
        :height="60"
        :percentage=".11"
        title="CPU"
      />
      <CircleBar
        :width="60"
        :height="60"
        :percentage=".50"
        title="Swap"
      />
    </div>
  </n-card>
</template>

<style scoped>
</style>
