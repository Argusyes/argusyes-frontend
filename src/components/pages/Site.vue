<script setup>
import StatusIcon from '~icons/icon-park-solid/dashboard-one'
import HostsIcon from '~icons/icon-park-solid/server'

const store = useStore()
const router = useRouter()
const menuSelected = ref(router.currentRoute.value.name)

const menuOptions = [
  {
    label: 'Status',
    key: 'status',
    icon: renderIcon(StatusIcon),
  },
  {
    label: 'Hosts',
    key: 'hosts',
    icon: renderIcon(HostsIcon),
  },
]

const handleUpdateValue = (key, item) => {
  // eslint-disable-next-line no-console
  console.log(key, item, router.currentRoute)
  router.push(`/${key}`)
}
</script>

<template>
  <n-layout position="absolute" content-style="display: flex; flex-direction: column;">
    <n-layout-header
      :bordered="!store.mode"
      class="p-2 flex justify-between items-center"
    >
      <i-ic-baseline-remove-red-eye
        class="text-2xl mr-2"
        :class="{
          'text-gray-800': store.mode,
          'text-gray-300': !store.mode,
        }"
      />
      <n-gradient-text class="text-2xl" type="danger">
        Argusyes
      </n-gradient-text>
      <div class="flex-1" />
      <Time />
      <Lang />
      <LightDarkSwitch />
      <NavAccount />
    </n-layout-header>
    <n-layout has-sider class="flex-1">
      <n-layout-sider
        :bordered="!store.mode"
        collapse-mode="width"
        :collapsed-width="50"
        :width="240"
        show-trigger="bar"
        :show-collapse-content="false"
        :native-scrollbar="false"
      >
        <n-menu
          v-model:value="menuSelected"
          :collapsed-width="50"
          :collapsed-icon-size="22"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout-content
        content-style="padding: 2rem;"
        :native-scrollbar="false"
      >
        <router-view />
      </n-layout-content>
    </n-layout>
    <!-- <n-layout-footer class="p-2 flex justify-between items-center">
      footer
    </n-layout-footer> -->
  </n-layout>
</template>

<style scoped>
</style>
