<script setup>
const store = useStore()
const message = useMessage()
const { locale } = useI18n()

// 将 App.vue 中 provide 的刷新页面函数 reload 导入，
// 用来解决语言切换时候没有重新渲染导致的排版错误等
const reload = inject('reload')

// dropdown 组件的配置
const options = [
  {
    label: '中文',
    key: 'zh',
  },
  {
    label: 'Eng',
    key: 'en',
  },
]

// 组件显示的文字
const langText = ref('')

watchEffect(() => {
  locale.value = store.lang
  langText.value = localeMaps.localeValueToLangTextMap[store.lang]
})

const handleSelect = (key) => {
  locale.value = key
  store.lang = key
  langText.value = localeMaps.localeValueToLangTextMap[key]
  reload()
}
</script>

<template>
  <n-dropdown
    :options="options"
    :show-arrow="true"
    @select="handleSelect"
  >
    <n-button quaternary round>
      <i-material-symbols-language class="mr-1" />
      {{ langText }}
    </n-button>
  </n-dropdown>
</template>
