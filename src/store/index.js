import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('main', () => {
  // state
  const jwt = useStorage('jwt', '')
  const lang = useStorage('lang', 'zh')
  const mode = useStorage('mode', true)
  const sidebar = useStorage('sidebar', true)
  const loginInfo = useStorage('login-info', {
    username: '',
    password: '',
  })
  const rememberLoginInfo = useStorage('remember-login-info', true)
  const accountInfo = ref({
    username: '',
  })
  return {
    jwt,
    lang,
    mode,
    sidebar,
    loginInfo,
    rememberLoginInfo,
    accountInfo,
  }
})
