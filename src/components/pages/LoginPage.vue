<script setup>
const router = useRouter()
const store = useStore()
const { t } = useI18n()
const message = useMessage()
const formRef = ref(null)
const model = ref({
  username: store.loginInfo.username,
  password: store.loginInfo.password,
})
// rules
const rules = {
  username: [
    {
      required: true,
      message: t('rules.canNotBeEmpty'),
    },
  ],
  password: [
    {
      required: true,
      message: t('rules.canNotBeEmpty'),
    },
  ],
}

// handle events
const handleLoginClick = (e) => {
  message.info(`${model.value.username} - ${model.value.password} - ${store.rememberLoginInfo}`)
  // 验证表单
  formRef.value?.validate((errors) => {
    if (!errors) {
      try {
        const requestBody = {
          username: model.value.username,
          passwd: model.value.password,
        }
        api.loginPage.login(requestBody)
          .then((resp) => {
            // eslint-disable-next-line no-console
            console.log(resp)
            if (resp.code !== 200) { message.error(resp.msg) }
            else {
              const jwt = resp.data
              router.push('/status')
            }
          })
      }
      catch (e) {
        message.error(e.toString())
      }
    }
  })
  // 根据是否记住密码决定 localStorage 中的 loginInfo
  if (store.rememberLoginInfo) {
    store.loginInfo.username = model.value.username
    store.loginInfo.password = model.value.password
  }
  else {
    store.loginInfo.username = ''
    store.loginInfo.password = ''
  }
}
</script>

<template>
  <n-layout position="absolute" content-style="display: flex; flex-direction: column;">
    <n-layout-header bordered class="p-2 flex justify-between items-center">
      <i-ic-baseline-remove-red-eye class="text-gray-800 text-2xl mr-2" />
      <n-gradient-text class="text-2xl" type="danger">
        Argusyes
      </n-gradient-text>
      <div class="flex-1" />
      <Time />
      <Lang />
      <NavAccount />
    </n-layout-header>
    <n-layout has-sider class="flex-1">
      <n-layout-content content-style="display: flex; justify-content: center; align-items: center;">
        <n-card :title="$t('login.login')" hoverable class="w-max-[40rem] rounded-4xl">
          <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto">
            <n-form-item path="username" :label="$t('login.account.label')">
              <n-input v-model:value="model.username" :placeholder="$t('login.account.placeholder')" round />
            </n-form-item>
            <n-form-item path="password" :label="$t('login.password.label')">
              <n-input
                v-model:value="model.password"
                type="password"
                show-password-on="mousedown"
                :placeholder="$t('login.password.placeholder')"
                round
              />
            </n-form-item>
          </n-form>
          <div class="flex justify-center gap-2">
            <span>
              {{ $t('login.remember') }}
            </span>
            <n-switch v-model:value="store.rememberLoginInfo" />
          </div>
          <template #footer>
            <n-button strong secondary round class="w-full" @click="handleLoginClick">
              {{ $t('login.login') }}
            </n-button>
          </template>
        </n-card>
      </n-layout-content>
    </n-layout>
    <n-layout-footer bordered class="p-2 flex justify-between items-center">
      footer
    </n-layout-footer>
  </n-layout>
</template>

<style scoped>
</style>
