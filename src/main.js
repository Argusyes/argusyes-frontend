import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/locale/i18n'
import 'virtual:windi.css'
import './style.css'
import { ws, wsHandler } from '@/ws'

ws.createSocket()
ws.setup.setHandler(
  'onopen',
  (event) => {
    console.log('open', event)
    createApp(App)
      .use(router)
      .use(createPinia())
      .use(i18n)
      .mount('#app')
  },
)
ws.setup.setHandler(
  'onclose',
  (event) => {
    console.log('closed', event)
  },
)

ws.setup.setHandler(
  'onmessage',
  (event) => {
    if (event.data) {
      const data = JSON.parse(event.data)

      if (data.id !== null)
        ws.callbacksCollection.run(data.id, event)

      if (data?.method === 'ssh.notification') {
        const eventName = data?.params?.[0]?.event
        switch (eventName) {
          case 'rough':
            wsHandler.handleRough(data)
            break
          case 'temp':
            wsHandler.handleTemp(data)
            break
          case 'cpuInfo':
            wsHandler.handleCPUInfo(data)
            break
          case 'cpuPerformance':
            wsHandler.handleCPUPerformance(data)
            break
          case 'uptime':
            wsHandler.handleUptime(data)
            break
          case 'loadavg':
            wsHandler.handleLoadavg(data)
            break
          case 'memoryPerformance':
            wsHandler.handleMemoryPerformance(data)
            break
          case 'netStat':
            wsHandler.handleNetStat(data)
            break
          case 'netDev':
            wsHandler.handleNetDev(data)
            break
          case 'disk':
            wsHandler.handleDisk(data)
            break
          case 'process':
            wsHandler.handleProcess(data)
            break
          default:
            console.error(eventName)
        }
      }
    }
  },
)
