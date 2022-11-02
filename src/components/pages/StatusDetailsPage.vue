<script setup>
const router = useRouter()
</script>

<template>
  <n-layout
    position="absolute"
    content-style="padding: 2rem 2rem 0;"
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
      <div class="flex-1 overflow-auto p-2 pb-8 flex flex-col gap-4 scrollbar-hide">
        <CPUBox />
        <MemoryBox />
        <GraphicsBox />
        <NetworkBox />
        <HardDiskBox />
      </div>
      <!-- right -->
      <div class="flex-1 overflow-auto p-2 pb-8 flex flex-col gap-4 scrollbar-hide">
        <ProcessBox />
      </div>
    </div>
  </n-layout>
</template>

<style>
.content-box {
  --content-height: calc(100% - 2.25rem);
  height: var(--content-height);
}
</style>
