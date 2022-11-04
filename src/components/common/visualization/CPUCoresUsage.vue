<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return []
    },
  },
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <CoreUsage
      v-for="(item, key) in props.data"
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
