<script setup>
const store = useStore()

const timeInfoFirLine = ref(dayjs().format('MM/DD/YYYY'))
const timeInfoSecLine = ref(dayjs().format('ddd'))
const timeInfoThirdLine = ref(dayjs().format('HH:mm:ss'))
const options = [{
  key: 'header',
  type: 'render',
  render: renderCustomHeader,
}]
function renderCustomHeader() {
  return h(
    'div',
    {
      class: `p-2 flex flex-col justify-center items-center gap-2 text-${store.mode ? 'white' : 'black'}`,
    },
    [
      h(
        'span',
        null,
        {
          default: () => {
            return timeInfoFirLine.value
          },
        },
      ),
      h(
        'span',
        null,
        {
          default: () => {
            return timeInfoSecLine.value
          },
        },
      ),
      h(
        'span',
        null,
        {
          default: () => {
            return timeInfoThirdLine.value
          },
        },
      ),
    ],
  )
}

onMounted(() => {
  setInterval(() => {
    timeInfoFirLine.value = dayjs().format('MM/DD/YYYY')
    timeInfoSecLine.value = dayjs().format('ddd')
    timeInfoThirdLine.value = dayjs().format('HH:mm:ss')
  }, 1000)
})
</script>

<template>
  <n-dropdown
    trigger="hover"
    :show-arrow="true"
    :options="options"
  >
    <n-button quaternary circle>
      <i-material-symbols-nest-clock-farsight-analog-outline />
    </n-button>
  </n-dropdown>
</template>

<style scoped>

</style>
