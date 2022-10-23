import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('main', () => {
  // state
  const jwt = useStorage('jwt', '')
  const lang = useStorage('lang', 'zh')
  const loginInfo = useStorage('login-info', {
    username: '',
    password: '',
  })
  const rememberLoginInfo = useStorage('remember-login-info', true)
  const tokenInfo = useStorage('token-info', {
    xToken: '',
    token: '',
    expire: '',
  })
  const accountInfo = ref({
    username: '',
    role: '',
    isSubAccount: 0,
    authList: [],
  })
  return {
    jwt,
    lang,
    loginInfo,
    rememberLoginInfo,
    accountInfo,
    tokenInfo,
  }
})
