<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import BaseSelect from '../BaseSelect.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseDatepickerTime from '@/components/BaseDatepickerTime.vue'
import { listProjects } from '@/infra/api/project'
import { createInterval } from '@/infra/api/interval'
import useToast from '@/composables/useToast'

const emit = defineEmits(['close', 'update-info'])

const projects = ref([])
const formData = ref({})
const isLoading = ref(false)

const { showToast } = useToast()
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    startTime: yup.date().required(),
    endTime: yup
      .date()
      .min(yup.ref('startTime'), 'La fecha de fin debe ser mayor a inicio'),
    project: yup.string().required(),
  }),
})

onBeforeMount(() => {
  loadProjects()
})

const loadProjects = async () => {
  try {
    const allProjects = await listProjects()
    projects.value = allProjects.map((project) => ({
      value: project.id,
      text: project.name,
    }))
    console.log(projects)
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = handleSubmit((values) => {
  console.log(values)
  handleNewInterval(values)
})

const handleNewInterval = async (values) => {
  try {
    isLoading.value = true
    const interval = await createInterval({ ...values })
    console.log(interval)
    emit('close')
    emit('update-info')
  } catch (error) {
    console.error(error)
    showToast({ message: error.response.data.message, error: true })
  } finally {
    isLoading.value = true
  }
}
</script>

<template>
  <BaseModal title="Registrar tiempo" @close="emit('close')">
    <form @submit="onSubmit">
      <div class="flex justify-between mb-4">
        <BaseDatepickerTime v-model="formData.startTime" name="startTime" />
        <BaseDatepickerTime
          v-model="formData.endTime"
          name="endTime"
          :min="formData.startTime"
        />
      </div>
      <BaseSelect
        v-model="formData.project"
        title="Selecciona proyecto"
        name="project"
        :options="projects"
      />

      <div class="flex gap-6 justify-end mt-8">
        <button class="btn btn-sm" @click="emit('close')">Cancelar</button>
        <button class="btn btn-sm btn-success" :disabled="isLoading">
          Guardar
        </button>
      </div>
    </form>
  </BaseModal>
</template>
