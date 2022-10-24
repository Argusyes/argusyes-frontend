<script setup>
const searchFormRef = ref(null)
const model = ref({
  search: '',
})
const rules = {}

const showAddAHostModal = ref(false)
const modalType = ref('add')
const modalData = ref(null)

const hostsList = [
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
]

// events
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
  //
}
</script>

<template>
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
  <HostModal
    :show-modal="showAddAHostModal"
    :type="modalType"
    :data="modalData"
    @modal-close="handleAddAHostModalClose"
  />
</template>

<style scoped>

</style>
