<script setup>
const store = useStore()

function handleSwitchMode() {
  store.mode = !store.mode
}
</script>

<template>
  <n-button
    quaternary
    circle
    @click="handleSwitchMode"
  >
    <i-material-symbols-light-mode v-if="!store.mode" />
    <i-material-symbols-dark-mode v-else-if="store.mode" />
  </n-button>
  <div />
</template>

<style lang="scss" scoped>

</style>
