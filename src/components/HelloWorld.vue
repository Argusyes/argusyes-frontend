<script setup>
const message = useMessage()
const count = ref(0)

const createMessage = () => {
  message.info(
    'hello, this is message.',
    {
      closable: true,
      duration: 5000,
    },
  )
}
</script>

<template>
  <div>this is hello world</div>
  <div>count: {{ count }}</div>
  <NButton @click="count++">
    hello
  </NButton>
  <NButton @click="createMessage">
    open message
  </NButton>
</template>
