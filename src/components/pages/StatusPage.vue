<script setup>

</script>

<template>
  <n-grid
    x-gap="24"
    y-gap="24"
    cols="1 800:2 1200:3 1600:4"
  >
    <n-gi v-for="item in 10" :key="item">
      <StatusBlock />
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>

</style>
