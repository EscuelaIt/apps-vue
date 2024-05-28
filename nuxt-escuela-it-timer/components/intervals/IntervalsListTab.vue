<script setup>
import { computed } from 'vue'
import BaseTable from '../BaseTable.vue'

const props = defineProps({
  allIntervals: {
    type: Array,
    default: () => [],
  },
})

const columns = [
  { label: 'Nombre', field: 'name' },
  { label: 'Descripción', field: 'description' },
  { label: 'Desde', field: 'from' },
  { label: 'Hasta', field: 'to' },
]

const intervals = computed(() => {
  return props.allIntervals.map((interval) => ({
    name: interval.project.name,
    description: interval.project.description,
    from: interval.startTime,
    to: interval.endTime,
    id: interval.id,
  }))
})

const onEditInterval = () => {}
const onRemoveInterval = () => {}
</script>

<template>
  <BaseTable
    :columns="columns"
    :items="intervals"
    has-edition
    has-remove-action
    @edit-row="onEditInterval"
    @remove-row="onRemoveInterval"
  />
</template>
