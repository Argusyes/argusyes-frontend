<script setup>
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div>
    <n-button
      circle
      quaternary
      @click="router.push('/status')"
    >
      <i-material-symbols-arrow-back />
    </n-button>
  </div>
  <div>
    {{ route.params.name }}
  </div>
</template>

<style scoped>

</style>
