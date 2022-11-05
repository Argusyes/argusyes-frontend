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

  const wsConnection = ref(undefined)

  const rough = ref({})
  const cpu = ref({})
  const mem = ref({})
  const net = ref({})
  const disk = ref({})
  const process = ref({})

  function clearRough() {
    rough.value = {}
  }
  function clearDetails() {
    cpu.value = {}
    mem.value = {}
    net.value = {}
    disk.value = {}
    process.value = {}
  }

  return {
    jwt,
    lang,
    mode,
    sidebar,
    loginInfo,
    rememberLoginInfo,
    /* ------------ */
    accountInfo,
    /* ------------ */
    wsConnection,
    /* ------------ */
    rough,
    cpu,
    mem,
    net,
    disk,
    process,
    /* ------------ */
    clearRough,
    clearDetails,
  }
})
