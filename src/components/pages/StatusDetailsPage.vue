<script setup>
const route = useRoute()
const router = useRouter()
</script>

<template>
  <n-layout
    position="absolute"
    content-style="padding: 2rem;"
  >
    <div class="flex items-center h-9">
      <n-button
        circle
        quaternary
        @click="router.push('/status')"
      >
        <i-material-symbols-arrow-back />
      </n-button>
    </div>
    <div class="content-box flex">
      <!-- left -->
      <div class="flex-1 overflow-auto p-4 border">
        <div v-for="i in 100" :key="i">
          {{ i }}
        </div>
      </div>
      <!-- right -->
      <div class="flex-1 overflow-auto p-4 border">
        <div v-for="i in 100" :key="i">
          {{ i }}
        </div>
      </div>
    </div>
  </n-layout>
</template>

<style>
.content-box {
  --content-height: calc(100% - 2.25rem);
  height: var(--content-height);
}

.content-box > div::-webkit-scrollbar {
  display: none;
}
</style>
