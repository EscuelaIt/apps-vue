<script setup>
import {
  PlusIcon,
  MoonIcon,
  SunIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/vue/24/solid'
import { getColorScheme, setScheme } from '@/utils/colorThemes'
import { doLogout } from '@/infra/api/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const theme = ref(getColorScheme())

const changeTheme = (newTheme) => {
  setScheme(newTheme)
  theme.value = newTheme
}

const logout = async () => {
  try {
    await doLogout()
    router.push('/auth')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <header class="h-11 mb-3 items-center flex justify-end p-4">
        <PlusIcon class="h-6 w-6" />
      </header>
      <slot />
    </div>
    <div
      class="drawer-side p-4 !w-80 min-h-full bg-base-200 !flex flex-col justify-between"
    >
      <div>
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu text-base-content">
          <!-- Sidebar content here -->
          <li><a>Dashboard</a></li>
          <li><a>Projects</a></li>
          <li><a>Reports</a></li>
        </ul>
      </div>

      <div class="flex justify-between w-full">
        <MoonIcon
          v-if="theme === 'light'"
          class="h-6 w-6 cursor-pointer"
          @click="changeTheme('dark')"
        />
        <SunIcon
          v-else
          class="h-6 w-6 cursor-pointer"
          @click="changeTheme('light')"
        />

        <ArrowRightStartOnRectangleIcon
          class="h-6 w-6 cursor-pointer"
          @click="logout()"
        />
      </div>
    </div>
  </div>
</template>
