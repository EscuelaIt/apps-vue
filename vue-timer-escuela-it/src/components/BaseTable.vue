<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

defineProps({
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
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-for="(column, index) in columns" :key="index">
            {{ column }}
          </th>
          <th v-if="hasEdition"></th>
          <th v-if="hasRemoveAction"></th>
        </tr>
      </thead>
      <tbody v-if="items.length">
        <tr v-for="item in items" :key="item.id" class="hover">
          <th>{{ item.id }}</th>
          <td v-if="columns.includes('Nombre')">{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.createdAt }}</td>
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
