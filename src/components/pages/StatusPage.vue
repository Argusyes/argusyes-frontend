<script setup>
const store = useStore()
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
    ws.api.startRoughMonitor(
      params,
      (event) => {
        console.log('----- cb: startRoughMonitor -----', event)
      },
    )
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
  })
})
onUnmounted(() => {
  const params = data.value.map((e) => {
    return {
      port: e.port,
      host: e.host,
      user: e.user,
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
      cols="1 1376:2 "
    >
      <n-gi v-for="(item, index) in data" :key="index">
        <StatusBlock :data="item" />
      </n-gi>
    </n-grid>
  </n-spin>
</template>

<style scoped>
</style>
