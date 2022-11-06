<script setup>
const route = useRoute()
const description = `Please check your path again: ${route.fullPath}`
</script>

<template>
  <n-layout
    position="absolute"
    content-style="display: flex; align-items: center; justify-content: center;"
  >
    <n-result
      status="404"
      title="404 Not Found"
      :description="description"
    >
      <template #footer>
        <div
          class="flex justify-center items-center text-xl gap-2"
        >
          <n-button
            circle
            tertiary
            strong
            class="text-xl"
            @click="$router.back()"
          >
            <i-material-symbols-arrow-back />
          </n-button>
          /
          <n-button
            circle
            tertiary
            strong
            class="text-xl"
            @click="$router.push('/status')"
          >
            <i-material-symbols-home />
          </n-button>
        </div>
      </template>
    </n-result>
  </n-layout>
</template>
