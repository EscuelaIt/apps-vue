<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import BaseTable from '@/components/BaseTable.vue'
import ProjectFormModal from '@/components/projects/ProjectFormModal.vue'
import SuccessModal from '@/components/SuccessModal.vue'
import { listProjects, removeProject } from '@/infra/api/project'

const projects = ref([])
const showProjectModal = ref(false)
const currentProject = ref({})
const currentProjectId = ref()
const showConfirmModel = ref(false)

const columns = [
  { label: 'Nombre', field: 'name' },
  { label: 'Descripción', field: 'description' },
  { label: 'Creado', field: 'createdAt' },
]

const loadData = async () => {
  projects.value = await listProjects()
}

const updateProjects = (project) => {
  if (!currentProject.value.id) {
    projects.value.push(project)
  } else {
    const index = projects.value.findIndex(
      (p) => p.id === currentProject.value.id,
    )
    projects.value.splice(index, 1, project)
  }

  showProjectModal.value = false
}

const onEditProject = (project) => {
  currentProject.value = project
  showProjectModal.value = true
}
const onClose = () => {
  currentProject.value = {}
  showProjectModal.value = false
}
const onRemoveProject = (id) => {
  currentProjectId.value = id
  showConfirmModel.value = true
}
const onConfirmRemoveProject = async () => {
  try {
    await removeProject(currentProjectId.value)
    const index = projects.value.findIndex(
      (p) => p.id === currentProjectId.value,
    )
    projects.value.splice(index, 1)
  } catch (error) {
    console.error(error)
  } finally {
    showConfirmModel.value = false
    currentProjectId.value = null
  }
}

loadData()
</script>

<template>
  <BaseLayout title="Proyectos">
    <button class="btn btn-info btn-sm" @click="showProjectModal = true">
      Nuevo proyecto
    </button>
    <BaseTable
      :columns="columns"
      :items="projects"
      has-edition
      has-remove-action
      @edit-row="onEditProject"
      @remove-row="onRemoveProject"
    />

    <ProjectFormModal
      v-if="showProjectModal"
      :current-project="currentProject"
      @close="onClose"
      @update-list="updateProjects"
    />

    <SuccessModal
      v-if="showConfirmModel"
      @close="showConfirmModel = false"
      @confirm="onConfirmRemoveProject"
    />
  </BaseLayout>
</template>
