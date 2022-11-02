<script setup>
const store = useStore()
</script>

<template>
  <n-card
    :bordered="!store.mode"
    class="rounded-xl"
  >
    <slot />
  </n-card>
</template>

<style scoped>
</style>
