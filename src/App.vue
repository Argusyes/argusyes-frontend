<script setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const store = useStore()
const route = useRoute()
const router = useRouter()

const theme = computed(() => {
  if (store.mode)
    return darkTheme
  return null
})
const locale = computed(() => {
  return store.lang === 'zh' ? zhCN : null
})
const dateLocale = computed(() => {
  return store.lang === 'zh' ? dateZhCN : null
})

// 设置页面刷新
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)

// redirect to connection lost page
watch(
  () => store.wsConnection,
  (newVal) => {
    if (!newVal)
      router.push('/connection-lost')
  },
)

// logout
watchEffect(() => {
  if (!store.jwt && route.path !== '/login')
    router.push('/login')
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
    (event, data) => {
      console.log('----- cb: stopRoughMonitor -----', event, data)
    },
  )
})
</script>

<template>
  <n-config-provider :theme="theme" :locale="locale" :date-locale="dateLocale">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <router-view v-if="isRouterAlive" />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
