<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const router = useRouter()
const percentage = ref(10)

// events
function handleBlockClick() {
  router.push({
    name: 'statusDetails',
    params: {
      name: 'lab',
    },
  })
}
</script>

<template>
  <n-card
    :title="props.data.name"
    size="huge"
    :bordered="false"
    class="rounded-xl cursor-pointer"
    @click="handleBlockClick"
  >
    <template #header-extra>
      <i-uil-temperature class="text-red-500" />
      30℃
    </template>
    <div class="flex items-center justify-between">
      <CircleBar
        :width="60"
        :height="60"
        :percentage=".799"
        title="Mem"
        :divide="[.10, .80]"
      />
      <CircleBar
        :width="60"
        :height="60"
        :percentage=".11"
        title="CPU"
      />
      <CircleBar
        :width="60"
        :height="60"
        :percentage=".50"
        title="Swap"
      />
    </div>
  </n-card>
</template>

<style scoped>
</style>
