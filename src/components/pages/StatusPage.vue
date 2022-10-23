<script setup>
const searchFormRef = ref(null)
const model = ref({
  search: '',
})
const rules = {}
</script>

<template>
  <div class="flex">
    <n-form
      ref="searchFormRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item path="search">
        <n-input
          v-model:value="model.search"
          round
        >
          <template #suffix>
            <i-material-symbols-search />
          </template>
        </n-input>
      </n-form-item>
    </n-form>
  </div>
  <n-grid
    x-gap="24"
    y-gap="24"
    cols="1 800:2 1200:3 1600:4"
  >
    <n-gi v-for="item in 16" :key="item">
      <StatusBlock />
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>
