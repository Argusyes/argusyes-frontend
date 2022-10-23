<script setup>
import mss from '~icons/material-symbols/settings'
import msl from '~icons/material-symbols/logout'

const store = useStore()
const router = useRouter()

const options = [
  {
    label: '设置',
    key: 'setting',
    icon: renderIcon(mss),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(msl),
  },
]

const handleLogout = () => {
  api.site.logout(store.accountInfo.username).then(() => {
    store.tokenInfo = { token: '', expire: '', xToken: '' }
  })
  router.push('/login')
}
const handleSelect = (key) => {
  switch (key) {
    case 'setting':
      break
    case 'logout':
      handleLogout()
  }
}
</script>

<template>
  <n-dropdown
    trigger="hover"
    placement="bottom-end"
    :options="options"
    :show-arrow="true"
    @select="handleSelect"
  >
    <n-button quaternary circle class="text-base">
      <i-material-symbols-account-circle />
    </n-button>
  </n-dropdown>
</template>

<style lang="scss" scoped>

</style>
