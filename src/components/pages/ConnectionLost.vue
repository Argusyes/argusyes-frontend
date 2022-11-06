<script setup>
const router = useRouter()
const description = 'Websocket connection is lost, please try to reconnect later'

function handleReconnect() {
  ws.createSocket()
  ws.setup.setupBasic()
  ws.setup.setHandler(
    'onopen',
    () => {
      router.push('/status')
    },
  )
}
</script>

<template>
  <n-layout
    position="absolute"
    content-style="display: flex; align-items: center; justify-content: center;"
  >
    <n-result
      title="Websocket Connection Lost"
      :description="description"
    >
      <template #icon>
        <i-tabler-plug-connected-x class="text-7xl" />
      </template>
      <template #footer>
        <n-button
          round
          tertiary
          strong
          class="text-lg"
          @click="handleReconnect"
        >
          <template #icon>
            <i-tabler-plug-connected />
          </template>
          <span>Reconnect</span>
        </n-button>
      </template>
    </n-result>
  </n-layout>
</template>
