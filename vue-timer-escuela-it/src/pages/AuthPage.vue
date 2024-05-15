<script setup>
import useUser from '@/composables/useUser'
import useToast from '@/composables/useToast'
import { doLogin, doRegister } from '@/infra/api/auth'
import BaseInput from '@/components/BaseInput.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const registerMode = ref(false)
const isLoading = ref(false)
const formData = ref({})

const { showToast } = useToast()
const { setUser } = useUser()
const router = useRouter()
const { handleSubmit, setFieldError, resetForm } = useForm({
  validationSchema: yup.object({
    name: registerMode.value ? yup.string().required() : yup.string(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  }),
})

watch(registerMode, () => {
  resetForm({
    values: {
      name: '',
      email: '',
      password: '',
    },
  })
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
  handleAuth(values)
})

const handleAuth = async (values) => {
  try {
    isLoading.value = true
    const user = registerMode.value
      ? await doRegister({ ...values })
      : await doLogin({ ...values })
    setUser(user)
    router.push('/')
  } catch (error) {
    console.error(error)

    showToast({ message: error.response.data.message, error: true })

    for (const key in error.response.data.errors) {
      setFieldError(key, error.response.data.errors[key][0])
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="flex justify-center items-center h-screen">
    <form
      class="card w-96 bg-base-200 shadow-xl flex items-center p-4 gap-3"
      @submit="onSubmit"
    >
      <BaseInput
        v-if="registerMode"
        v-model="formData.name"
        placeholder="Nombre"
        name="name"
      />
      <BaseInput
        v-model="formData.email"
        type="email"
        placeholder="Email"
        name="email"
      />
      <BaseInput
        v-model="formData.password"
        type="password"
        placeholder="Contraseña"
        name="password"
      />

      <p v-if="!registerMode" @click="registerMode = true">
        ¿No tienes cuenta todavía?
      </p>
      <p v-else @click="registerMode = false">¿Ya tienes cuenta?</p>

      <div>
        <button
          :disabled="isLoading"
          type="submit"
          class="btn btn-wide btn-success"
        >
          {{ registerMode ? 'Registar' : 'Iniciar sesión' }}
        </button>
        <span
          v-if="isLoading"
          class="loading loading-spinner text-accent"
        ></span>
      </div>
    </form>
  </section>
</template>
