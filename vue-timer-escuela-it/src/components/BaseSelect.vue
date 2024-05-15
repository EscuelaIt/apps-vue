<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
})
const model = defineModel()
</script>

<template>
  <select v-model="model" class="select select-bordered w-full max-w-xs">
    <option disabled selected>{{ title }}</option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>
