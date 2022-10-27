<script setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const store = useStore()
const route = useRoute()
const router = useRouter()

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

// logout
watchEffect(() => {
  if (!store.jwt && route.path !== '/login')
    router.push('/login')
})
</script>

<template>
  <n-config-provider :theme="darkTheme" :locale="locale" :date-locale="dateLocale">
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
