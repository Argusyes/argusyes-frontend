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

onMounted(() => {
  // callbackAfterGetHosts((hostList) => {
  //   console.log(hostList)
  //   data.value = hostList
  //   const requestParam = {
  //     id: '1',
  //     method: 'ssh.startMonitor',
  //     params: hostList.map((e) => {
  //       return {
  //         port: e.port,
  //         host: e.host,
  //         user: e.user,
  //         passwd: e.passwd,
  //       }
  //     }),
  //   }
  //   socket.send(JSON.stringify(requestParam))
  // })
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
