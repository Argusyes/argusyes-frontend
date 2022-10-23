import { h } from 'vue'

export function renderIcon(icon) {
  return () => h(icon)
}
