<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
})
const emit = defineEmits([
  'editHost',
  'deleteHost',
])

// events
function handleEditHost() {
  emit('editHost', props.data)
}
function handleDeleteHost() {
  emit('deleteHost', props.data)
}
</script>

<template>
  <n-card
    :title="props.data.name"
    size="huge"
    :bordered="false"
    class="rounded-xl cursor-pointer"
  >
    <template #header-extra>
      <div class="flex gap-1">
        <n-button
          quaternary
          circle
          @click="handleEditHost"
        >
          <i-material-symbols-edit />
        </n-button>
        <n-button
          quaternary
          circle
          @click="handleDeleteHost"
        >
          <i-material-symbols-delete class="text-red-500" />
        </n-button>
      </div>
    </template>
    <span class="text-gray-400">
      {{ props.data.user }}@{{ props.data.host }}:{{ props.data.port }}
    </span>
  </n-card>
</template>

<style scoped>
</style>
