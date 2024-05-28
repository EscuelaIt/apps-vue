<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { format } from 'date-fns'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  hasEdition: {
    type: Boolean,
    default: false,
  },
  hasRemoveAction: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['edit-row', 'remove-row'])

const includesField = (field) => {
  return props.columns.some((column) => column.field === field)
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
          <th v-if="hasEdition"></th>
          <th v-if="hasRemoveAction"></th>
        </tr>
      </thead>
      <tbody v-if="items.length">
        <tr v-for="item in items" :key="item.id" class="hover">
          <th>{{ item.id }}</th>
          <td v-if="includesField('name')">{{ item.name }}</td>
          <td v-if="includesField('description')">{{ item.description }}</td>
          <td v-if="includesField('createdAt')">{{ item.createdAt }}</td>
          <td v-if="includesField('from')">
            {{ format(new Date(item.from), 'dd/MM/yyyy HH:mm:ss') }}
          </td>
          <td v-if="includesField('to')">
            {{
              item.to ? format(new Date(item.to), 'dd/MM/yyyy HH:mm:ss') : '-'
            }}
          </td>
          <td v-if="hasEdition">
            <PencilIcon
              class="h-3 w-3 cursor-pointer"
              @click="emit('edit-row', item)"
            />
          </td>
          <td v-if="hasRemoveAction">
            <TrashIcon
              class="h-3 w-3 cursor-pointer"
              @click="emit('remove-row', item.id)"
            />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="columns.length + 1" class="text-center">
            No hay items
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
