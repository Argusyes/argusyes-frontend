<script setup>
</script>

<template>
  <n-card
    :bordered="false"
    class="rounded-lg bg-white/5"
  >
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <i-material-symbols-wifi class="text-green-500" />
          <span>eno1</span>
        </div>
        <span class="secondary-text">10.112.159.83</span>
      </div>
      <div class="flex justify-between items-center">
        <DataWithTitle
          :num="8"
          unit="K/s"
          title="↑/S"
        />
        <DataWithTitle
          :num="72"
          unit="K/s"
          title="↓/S"
        />
        <DataWithTitle
          :num="104"
          unit="G"
          title="↑"
          color="yellow"
        />
        <DataWithTitle
          :num="98"
          unit="G"
          title="↓"
          color="green"
        />
        <!-- TODO: circle bar -->
      </div>
    </div>
  </n-card>
</template>

<style scoped>
</style>
