import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/locale/i18n'
import 'virtual:windi.css'
import './style.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(i18n)
  .mount('#app')
