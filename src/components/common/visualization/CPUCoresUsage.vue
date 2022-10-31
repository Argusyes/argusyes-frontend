<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const tmpData = [
  {
    sys: 0.2,
    user: 0.2,
    iowait: 0.2,
    steal: 0.2,
  },
  {
    sys: 0.1,
    user: 0.2,
    iowait: 0.3,
    steal: 0.4,
  },
  {
    sys: 0.5,
    user: 0,
    iowait: 0.2,
    steal: 0.2,
  },
  {
    sys: 0.1,
    user: 0.6,
    iowait: 0.11,
    steal: 0.15,
  },
  {
    sys: 0.2,
    user: 0.2,
    iowait: 0.2,
    steal: 0.2,
  },
  {
    sys: 0.1,
    user: 0.2,
    iowait: 0.3,
    steal: 0.4,
  },
  {
    sys: 0.5,
    user: 0,
    iowait: 0.2,
    steal: 0.2,
  },
  {
    sys: 0.1,
    user: 0.6,
    iowait: 0.11,
    steal: 0.15,
  },
]
</script>

<template>
  <div class="flex flex-col gap-2">
    <CoreUsage
      v-for="(item, key) in tmpData"
      :key="key"
      :sys="item.sys"
      :user="item.user"
      :iowait="item.iowait"
      :steal="item.steal"
    />
  </div>
</template>

<style scoped>

</style>
