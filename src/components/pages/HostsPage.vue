<script setup>
import { useDebounce } from '@vueuse/core'

const message = useMessage()
const dialog = useDialog()

const searchFormRef = ref(null)
const model = ref({
  search: '',
})
const rules = {}

const showAddAHostModal = ref(false)
const modalType = ref('add')
const modalData = ref(null)
const showSpin = ref(false)

const hostsList = ref([
  {
    name: 'Lab',
    host: '10.112.230.222',
    port: 10022,
    user: 'root',
    passwd: 'this is the password',
  },
  {
    name: 'Lab-WSR',
    host: '10.112.159.83',
    port: 22222,
    user: 'wangshangrong',
    passwd: 'this is the password',
  },
  {
    name: 'cc',
    host: '192.168.0.106',
    port: 22,
    user: 'cc',
    passwd: 'this is the password',
  },
  {
    name: 'eshop',
    host: '82.156.189.178',
    port: 22,
    user: 'root',
    passwd: 'this is the password',
  },
])

// requests
function getHostList() {
  try {
    showSpin.value = true
    api.hostsPage.getHostList({
      name: model.value.search,
    })
      .then((resp) => {
        if (resp.code !== 200) { message.error(resp.msg) }
        else {
          //
          console.log(resp)
          hostsList.value = resp.data
        }
      })
      .finally(() => {
        showSpin.value = false
      })
  }
  catch (e) {
    message.error(e.toString())
  }
}
function deleteHosts(hostInfo) {
  console.log(hostInfo)
  try {
    showSpin.value = true
    api.hostsPage.deleteHosts({
      data: [
        {
          user: hostInfo.user,
          host: hostInfo.host,
          port: hostInfo.port,
        },
      ],
    })
      .then((resp) => {
        if (resp.code !== 200) { message.error(resp.msg) }
        else {
          //
          console.log(resp)
        }
      })
      .finally(() => {
        showSpin.value = false
        getHostList()
      })
  }
  catch (e) {
    message.error(e.toString())
  }
}

// events
const handleSearch = useDebounceFn(() => {
  // check form
  searchFormRef.value?.validate((errors) => {
    if (!errors)
      getHostList()
  })
}, 300)
function handleAddAHostButtonClick() {
  showAddAHostModal.value = true
  modalType.value = 'add'
  modalData.value = null
}
function handleAddAHostModalClose() {
  showAddAHostModal.value = false
}
function handleEditHost(hostInfo) {
  showAddAHostModal.value = true
  modalType.value = 'edit'
  modalData.value = hostInfo
}
function handleDeleteHost(hostInfo) {
  dialog.warning({
    title: '二次确认',
    content: '确定删除吗?',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      deleteHosts(hostInfo)
    },
    style: {
      borderRadius: '1.5rem',
    },
  })
}

watch(
  () => model.value.search,
  handleSearch,
)

onMounted(() => {
  getHostList()
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
      <div class="flex-1" />
      <n-button
        quaternary
        circle
        class="text-2xl"
        @click="handleAddAHostButtonClick"
      >
        <i-material-symbols-add />
      </n-button>
    </div>
    <n-grid
      x-gap="24"
      y-gap="24"
      cols="1 800:2 1200:3 1600:4"
    >
      <n-gi v-for="item in hostsList" :key="item.name">
        <HostBlock
          :data="item"
          @delete-host="handleDeleteHost"
          @edit-host="handleEditHost"
        />
      </n-gi>
    </n-grid>
  </n-spin>
  <HostModal
    :show-modal="showAddAHostModal"
    :type="modalType"
    :data="modalData"
    @modal-close="handleAddAHostModalClose"
    @refresh-list="getHostList"
  />
</template>

<style scoped>

</style>
