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
import { useRouter, RouterLink } from 'vue-router'
import IntervalsFormModal from '@/components/intervals/IntervalsFormModal.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update-info'])

const router = useRouter()

const showIntervalsModal = ref(false)
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
        <PlusIcon class="h-6 w-6" @click="showIntervalsModal = true" />
      </header>
      <section class="px-4 pb-4">
        <h1 class="text-2xl font-semibold mb-4">{{ title }}</h1>
        <slot />
      </section>
    </div>
    <div
      class="drawer-side p-4 !w-52 min-h-full bg-base-200 !flex flex-col justify-between"
    >
      <div>
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu text-base-content">
          <li>
            <RouterLink to="/">Dashboard</RouterLink>
          </li>
          <li>
            <RouterLink to="/projects">Projects</RouterLink>
          </li>
          <li>
            <RouterLink to="/reports">Reportes</RouterLink>
          </li>
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

  <IntervalsFormModal
    v-if="showIntervalsModal"
    @close="showIntervalsModal = false"
    @update-info="emit('update-info')"
  />
</template>
