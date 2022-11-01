<script setup>
const message = useMessage()

const data = ref([])
const searchFormRef = ref(null)
const model = ref({
  search: '',
})
const showSpin = ref(true)
const rules = {}

function callbackAfterGetHosts(cb) {
  if (typeof cb !== 'function')
    throw new Error('callbackAfterGetHosts: Param is Not a Function')
  let hostList = []
  try {
    showSpin.value = true
    api.hostsPage.getHostList({
      name: model.value.search,
    })
      .then((resp) => {
        if (resp.code !== 200) { message.error(resp.msg) }
        else {
          //
          hostList = resp.data
          cb(hostList)
        }
      })
      .finally(() => {
        showSpin.value = false
      })
  }
  catch (e) {
    message.error(e.toString())
    return result
  }
}

ws.setup.setHandler(
  'onmessage',
  (event) => {
    if (event.data) {
      const data = JSON.parse(event.data)

      if (data.id !== null)
        ws.callbacksCollection.run(data.id, event)

      if (data?.method === 'ssh.notification') {
        const eventName = data?.params?.[0]?.event
        switch (eventName) {
          case 'rough':
            console.log('rough', data)
            break
          case 'temp':
            console.log('temp', data)
            break
          case 'cpuInfo':
            console.log('cpuInfo', data)
            break
          case 'cpuPerformance':
            console.log('cpuPerformance', data)
            break
          case 'uptime':
            console.log('uptime', data)
            break
          case 'loadavg':
            console.log('loadavg', data)
            break
          case 'memoryPerformance':
            console.log('memoryPerformance', data)
            break
          case 'netStat':
            console.log('netStat', data)
            break
          case 'netDev':
            console.log('netDev', data)
            break
          case 'disk':
            console.log('disk', data)
            break
          default:
            console.error(eventName)
        }
      }
    }
  },
)
onMounted(() => {
  callbackAfterGetHosts((hostList) => {
    data.value = hostList
    const params = hostList.map((e) => {
      return {
        port: e.port,
        host: e.host,
        user: e.user,
        passwd: e.passwd,
      }
    })
    const id = ws.api.startRoughMonitor(
      params,
      (event) => {
        console.log('----- cb: startRoughMonitor -----', event)
      },
    )
  })
})
onUnmounted(() => {
  const params = data.value.map((e) => {
    return {
      port: e.port,
      host: e.host,
      user: e.user,
      // passwd: e.passwd,
    }
  })
  const id = ws.api.stopRoughMonitor(
    params,
    (event) => {
      console.log('----- cb: stopRoughMonitor -----', event)
    },
  )
})
</script>

<template>
  <n-spin :show="showSpin">
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
      <n-gi v-for="(item, index) in data" :key="index">
        <StatusBlock :data="item" />
      </n-gi>
    </n-grid>
  </n-spin>
</template>

<style scoped>

</style>
