<script setup>
import BaseModal from '../BaseModal.vue'
import BaseInput from '../BaseInput.vue'
import { createProject, updateProject } from '@/infra/api/project'
import { useForm } from 'vee-validate'
import useToast from '@/composables/useToast'
import * as yup from 'yup'
import { ref, onMounted } from 'vue'

const props = defineProps({
  currentProject: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['close', 'update-list'])

const isLoading = ref(false)
const editionMode = ref(false)
const formData = ref({})

const { showToast } = useToast()
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    description: yup.string(),
  }),
})

onMounted(() => {
  if (Object.keys(props.currentProject).length) {
    editionMode.value = true
    formData.value.name = props.currentProject.name
    formData.value.description = props.currentProject.description
  }
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
  handleNewProject(values)
})

const handleNewProject = async (values) => {
  try {
    isLoading.value = true
    const newProject = editionMode.value
      ? await updateProject({ ...values, id: props.currentProject.id })
      : await createProject(values)
    emit('update-list', newProject)
  } catch (error) {
    console.error(error)
    showToast({ message: error.response.data.message, error: true })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseModal
    :title="editionMode ? 'Editar proyecto' : 'Nuevo proyecto'"
    @close="emit('close')"
  >
    <form @submit="onSubmit" class="flex flex-col gap-6">
      <BaseInput v-model="formData.name" name="name" placeholder="Nombre" />
      <BaseInput
        v-model="formData.description"
        name="description"
        placeholder="Descripción"
      />

      <button type="submit" class="btn btn-sm btn-success">Guardar</button>
    </form>
  </BaseModal>
</template>
