import { createRouter, createWebHashHistory } from 'vue-router'
// import { useStore } from '@/store/index.js'

// pages
import Site from '@/components/pages/Site.vue' // 框架页
import LoginPage from '@/components/pages/LoginPage.vue' // 登陆页面
import StatusPage from '@/components/pages/StatusPage.vue' // 登陆页面
import HostsPage from '@/components/pages/HostsPage.vue' // 登陆页面

const routes = [
  {
    path: '/',
    name: 'index',
    component: Site,
    children: [
      {
        path: 'status',
        name: 'status',
        component: StatusPage,
      },
      {
        path: 'hosts',
        name: 'hosts',
        component: HostsPage,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 守卫
// router.beforeEach(async (to) => {
//   const store = useStore()
//   // check if jwt is in localStorage
//   if (!['login', 'register'].includes(to.name) && store.jwt === '')
//     return { name: 'login' }
// })

export default router
