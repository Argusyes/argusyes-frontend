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
  name: undefined,
  host: undefined,
  port: 22,
  user: 'root',
  passwd: undefined,
})

// 表单的校验规则
const rules = {}

// requests

// events
function handleSaveButtonClick() {
  //
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
