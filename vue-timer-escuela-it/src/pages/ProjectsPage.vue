<script setup>
import { onMounted, ref, computed } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { listProjects } from '@/infra/api/project'

const projects = ref([])

onMounted(() => {
  loadData()
})

const projectsOptions = computed(() => {
  return projects.value.map((project) => ({
    value: project.id,
    text: project.name,
  }))
})

const loadData = async () => {
  projects.value = await listProjects()
}
</script>

<template>
  <BaseLayout title="Proyectos">
    <BaseSelect title="Selecciona proyecto" :options="projectsOptions" />
    <BaseTable
      :columns="['Nombre', 'Descripción', 'Creado']"
      :items="projects"
    />
  </BaseLayout>
</template>
