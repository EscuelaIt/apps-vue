<script setup>
import useUser from '@/composables/useUser'
import { doLogin, doRegister } from '@/infra/api/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const registerMode = ref(false)
const isLoading = ref(false)
const formData = ref({})

const { setUser } = useUser()
const router = useRouter()

const handleAuth = async () => {
  try {
    isLoading.value = true
    const user = registerMode.value
      ? await doRegister({ ...formData.value })
      : await doLogin({ ...formData.value })
    setUser(user)
    router.push('/')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="flex justify-center items-center h-screen">
    <div class="card w-96 bg-base-200 shadow-xl flex items-center p-4 gap-3">
      <input
        v-model="formData.name"
        v-if="registerMode"
        type="text"
        placeholder="Nombre"
        class="input input-bordered w-full max-w-xs"
      />
      <input
        v-model="formData.email"
        type="email"
        placeholder="Email"
        class="input input-bordered w-full max-w-xs"
      />
      <input
        v-model="formData.password"
        type="password"
        placeholder="Contraseña"
        class="input input-bordered w-full max-w-xs"
      />

      <p v-if="!registerMode" @click="registerMode = true">
        ¿No tienes cuenta todavía?
      </p>
      <p v-else @click="registerMode = false">¿Ya tienes cuenta?</p>

      <div>
        <button
          :disabled="isLoading"
          @click="handleAuth"
          class="btn btn-wide btn-success"
        >
          {{ registerMode ? 'Registar' : 'Iniciar sesión' }}
        </button>
        <span
          v-if="isLoading"
          class="loading loading-spinner text-accent"
        ></span>
      </div>
    </div>
  </section>
</template>
