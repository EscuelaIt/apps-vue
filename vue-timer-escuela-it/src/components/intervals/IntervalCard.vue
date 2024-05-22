<script setup>
defineProps({
  project: {
    type: Object,
    default: () => ({}),
  },
  secondsOpened: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ secondsOpened }}</h2>
      <p v-if="project" class="text-xs flex flex-col">
        <span>{{ project.name }}</span>
        <span>{{ project.description }}</span>
      </p>
    </div>
  </div>
</template>
