<script setup>
const props = defineProps({
  showModal: Boolean,
  type: {
    type: String,
    default: 'add',
    validator(value) {
      return ['add', 'edit'].includes(value)
    },
  },
  data: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits([
  'modalClose',
  'refreshList',
])

const formRef = ref(null)
const model = ref({
  name: '',
  host: '',
  port: 22,
  user: 'root',
  passwd: '',
})

// 表单的校验规则
const rules = {}

// requests
function addHosts() {
  try {
    const requestBody = {
      data: [
        model.value,
      ],
    }
    api.hostsPage.addHosts(requestBody)
      .then((resp) => {
        console.log(resp)
        if (resp.code !== 200) { message.error(resp.msg) }
        else {
          //
          console.log('success', resp)
          emit('refreshList')
          emit('modalClose')
        }
      })
  }
  catch (e) {
    message.error(e.toString())
  }
}
function updateHosts() {
  try {
    const requestBody = {
      data: [
        {
          oldName: props.data.name,
          oldHost: props.data.host,
          oldPort: props.data.port,
          oldUser: props.data.user,
          oldPasswd: props.data.passwd,
          newName: model.value.name,
          newHost: model.value.host,
          newPort: model.value.port,
          newUser: model.value.user,
          newPasswd: model.value.passwd,
        },
      ],
    }
    api.hostsPage.updateHosts(requestBody)
      .then((resp) => {
        console.log(resp)
        if (resp.code !== 200) { message.error(resp.msg) }
        else {
          //
          console.log('success', resp)
          emit('refreshList')
          emit('modalClose')
        }
      })
  }
  catch (e) {
    message.error(e.toString())
  }
}

// events
function handleSaveButtonClick() {
  if (props.type === 'add')
    addHosts()
  else if (props.type === 'edit')
    updateHosts()
  else
    throw new Error('Host Modal: Unknown props.type')
}

watch(
  () => props.data,
  () => {
    model.value = {
      ...props.data,
    }
  },
)
</script>

<template>
  <n-modal
    :show="props.showModal"
    class="w-[25rem]"
    preset="card"
    title="Add Server"
    size="huge"
    style="border-radius: 1rem;"
    @mask-click="emit('modalClose')"
    @esc="emit('modalClose')"
    @close="emit('modalClose')"
  >
    <!-- content -->
    <div>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="top"
        label-width="auto"
      >
        <n-form-item
          path="name"
          label="Name"
        >
          <n-input
            v-model:value="model.name"
            round
            placeholder="Display Name"
          />
        </n-form-item>
        <n-form-item
          path="host"
          label="Host"
        >
          <n-input
            v-model:value="model.host"
            round
            placeholder="IP or Domain"
          />
        </n-form-item>
        <n-form-item
          path="port"
          label="Port"
        >
          <n-input-number
            v-model:value="model.port"
            placeholder="Port"
            class="w-28"
            :min="1"
            :max="65535"
          />
        </n-form-item>
        <n-divider />
        <n-form-item
          path="user"
          label="User"
        >
          <n-input
            v-model:value="model.user"
            round
            placeholder="Username"
          />
        </n-form-item>
        <n-form-item
          path="passwd"
          label="Password"
        >
          <n-input
            v-model:value="model.passwd"
            type="password"
            show-password-on="mousedown"
            round
            placeholder="Password"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <n-button
          secondary
          round
          @click="emit('modalClose')"
        >
          Cancel
        </n-button>
        <n-button
          secondary
          round
          type="primary"
          @click="handleSaveButtonClick"
        >
          Save
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<style lang="scss" scoped>

</style>
