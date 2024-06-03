<script setup>
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

const theme = ref('light')

onMounted(() => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const themeLocalStorage = localStorage.getItem('theme')

  if (themeLocalStorage) {
    setTheme(themeLocalStorage)
  } else {
    setTheme(isDarkMode ? 'dark' : 'light')
  }
})

const setTheme = (t) => {
  localStorage.setItem('theme', t)
  theme.value = t
  document.querySelector('html').setAttribute('data-theme', theme.value)
}
</script>

<template>
  <MoonIcon
    v-if="theme === 'light'"
    class="h-6 w-6 cursor-pointer"
    @click="setTheme('dark')"
  />
  <SunIcon v-else class="h-6 w-6 cursor-pointer" @click="setTheme('light')" />
</template>
