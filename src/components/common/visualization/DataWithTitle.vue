<script setup>
const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'none',
    validator(value) {
      return ['none', 'gray', 'red', 'green', 'purple', 'yellow'].includes(value)
    },
  },
})
</script>

<template>
  <div>
    <div>
      <ColorHintTitle
        :title="props.title"
        :color="props.color"
      />
    </div>
    <NumWithUnit
      :num="props.num"
      :unit="props.unit"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
