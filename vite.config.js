import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    vue(),
    Icons(),
    WindiCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': [
            // named imports
            // 'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            // ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
            'useStorage',
            'useThrottleFn',
            'useDebounceFn',
          ],
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar', 'NButton'],
          'vue-i18n': ['useI18n'],
          'dayjs': [
            ['default', 'dayjs'],
          ],
        },
      ],
      dirs: [
        './src/store',
        './src/api',
        './src/utils',
        './src/constants',
      ],
    }),
    Components({
      resolvers: [
        NaiveUiResolver(),
        IconsResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
