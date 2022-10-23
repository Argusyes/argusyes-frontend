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
        :width="100"
        :height="100"
        :percentage=".88999"
      />
      <!-- <n-el v-for="num in 1" :key="num">
        <n-progress
          type="multiple-circle"
          :show-indicator="false"
          :stroke-width="6"
          :circle-gap="0.5"
          :percentage="[
            percentage,
            (percentage + 10) % 100,
            (percentage + 20) % 100,
            (percentage + 30) % 100,
          ]"
          :color="[
            'var(--info-color)',
            'var(--success-color)',
            'var(--warning-color)',
            'var(--error-color)',
          ]"
          :rail-style="[
            { stroke: 'var(--info-color)', opacity: 0.3 },
            { stroke: 'var(--success-color)', opacity: 0.3 },
            { stroke: 'var(--warning-color)', opacity: 0.3 },
            { stroke: 'var(--error-color)', opacity: 0.3 },
          ]"
        />
      </n-el> -->
    </div>
  </n-card>
</template>

<style scoped>
</style>
