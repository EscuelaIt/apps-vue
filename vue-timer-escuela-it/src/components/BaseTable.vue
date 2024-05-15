<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
})
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
        </tr>
      </thead>
      <tbody v-if="items.length">
        <tr v-for="item in items" :key="item.id" class="hover">
          <th>{{ item.id }}</th>
          <td v-if="columns.includes('Nombre')">{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.createdAt }}</td>
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
