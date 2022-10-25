<script setup>
const router = useRouter()
const store = useStore()
const { t } = useI18n()
const message = useMessage()

const tabsValue = ref('login')
const tabsInstRef = ref(null)
const loginFormRef = ref(null)
const registerFormRef = ref(null)
const loginModel = ref({
  username: store.loginInfo.username,
  password: store.loginInfo.password,
})
const registerModel = ref({
  username: undefined,
  password: undefined,
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
const handleLoginClick = () => {
  message.info(`${loginModel.value.username} - ${loginModel.value.password} - ${store.rememberLoginInfo}`)
  // 验证表单
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      try {
        const requestBody = {
          username: loginModel.value.username,
          passwd: loginModel.value.password,
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
    store.loginInfo.username = loginModel.value.username
    store.loginInfo.password = loginModel.value.password
  }
  else {
    store.loginInfo.username = ''
    store.loginInfo.password = ''
  }
}
const handleRegisterClick = () => {
  message.info(`${registerModel.value.username} - ${registerModel.value.password} - ${store.rememberLoginInfo}`)
  // 验证表单
  registerFormRef.value?.validate((errors) => {
    if (!errors) {
      try {
        const requestBody = {
          username: registerModel.value.username,
          passwd: registerModel.value.password,
        }
        api.loginPage.register(requestBody)
          .then((resp) => {
            // eslint-disable-next-line no-console
            console.log(resp)
            if (resp.code !== 200) { message.error(resp.msg) }
            else {
              tabsValue.value = 'login'
              nextTick(() => tabsInstRef.value?.syncBarPosition())
            }
          })
      }
      catch (e) {
        message.error(e.toString())
      }
    }
  })
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
        <n-card
          hoverable
          class="w-max-[40rem] rounded-4xl"
        >
          <n-tabs
            ref="tabsInstRef"
            v-model:value="tabsValue"
          >
            <!-- login -->
            <n-tab-pane name="login" tab="登录">
              <n-form ref="loginFormRef" :model="loginModel" :rules="rules" label-placement="left" label-width="auto">
                <n-form-item path="username" :label="$t('login.account.label')">
                  <n-input v-model:value="loginModel.username" :placeholder="$t('login.account.placeholder')" round />
                </n-form-item>
                <n-form-item path="password" :label="$t('login.password.label')">
                  <n-input
                    v-model:value="loginModel.password"
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
              <n-button strong secondary round class="mt-6 w-full" @click="handleLoginClick">
                {{ $t('login.login') }}
              </n-button>
            </n-tab-pane>
            <!-- register -->
            <n-tab-pane name="register" tab="注册">
              <n-form ref="registerFormRef" :model="registerModel" :rules="rules" label-placement="left" label-width="auto">
                <n-form-item path="username" :label="$t('login.account.label')">
                  <n-input v-model:value="registerModel.username" :placeholder="$t('login.account.placeholder')" round />
                </n-form-item>
                <n-form-item path="password" :label="$t('login.password.label')">
                  <n-input
                    v-model:value="registerModel.password"
                    type="password"
                    show-password-on="mousedown"
                    :placeholder="$t('login.password.placeholder')"
                    round
                  />
                </n-form-item>
              </n-form>
              <n-button strong secondary round class="mt-6 w-full" @click="handleRegisterClick">
                {{ $t('login.register') }}
              </n-button>
            </n-tab-pane>
          </n-tabs>
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
