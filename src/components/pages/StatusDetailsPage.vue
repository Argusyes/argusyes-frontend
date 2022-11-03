<script setup>
const router = useRouter()
const route = useRoute()
const message = useMessage()

const hostInfo = ref(undefined)

onMounted(() => {
  ws.api.startMonitor(
    [{
      host: '10.128.248.93',
      user: 'cc',
      port: 22,
      passwd: 'chenchen',
    }],
    (event) => {
      console.log('----- cb: startMonitor -----', event)
    },
  )
  // const resp = await api.hostsPage.getHostList({
  //   name: route.params.name,
  // })
  // if (resp.code !== 200)
  //   message.error(resp.msg)
  // const hostList = resp.data
  // if (hostList.length === 1) {
  //   hostInfo.value = hostList[0]
  //   const [{ host, name, passwd, port, user }] = hostList
  //   console.log(host, name, passwd, port, user)
  //   ws.api.startMonitor(
  //     { port, host, user, passwd },
  //     (event) => {
  //       console.log('----- cb: startMonitor -----', event)
  //     },
  //   )
  // }
})

onUnmounted(() => {
  ws.api.stopMonitor(
    [hostInfo.value],
    (event) => {
      console.log('----- cb: stopMonitor -----', event)
    },
  )
})
</script>

<template>
  <n-layout
    position="absolute"
    content-style="padding: 2rem 2rem 0;"
  >
    <div class="flex items-center gap-2 h-12">
      <n-button
        circle
        quaternary
        @click="router.push('/status')"
      >
        <i-material-symbols-arrow-back />
      </n-button>
      <span class="font-semibold text-3xl">
        {{ route.params.name }}
      </span>
    </div>
    <div class="content-box flex">
      <!-- left -->
      <div class="flex-1 overflow-auto p-2 pb-8 flex flex-col gap-4 scrollbar-hide">
        <CPUBox />
        <MemoryBox />
        <GraphicsBox />
        <NetworkBox />
        <HardDiskBox />
      </div>
      <!-- right -->
      <div class="flex-1 overflow-auto p-2 pb-8 flex flex-col gap-4 scrollbar-hide">
        <ProcessBox />
      </div>
    </div>
  </n-layout>
</template>

<style>
.content-box {
  --content-height: calc(100% - 2.25rem);
  height: var(--content-height);
}
</style>
