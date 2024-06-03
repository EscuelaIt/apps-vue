<script setup>
const emit = defineEmits(['update-info'])

const showIntervalsModal = ref(false)
</script>

<template>
  <PlusIcon class="h-6 w-6" @click="showIntervalsModal = true" />

  <IntervalsFormModal
    v-if="showIntervalsModal"
    @close="showIntervalsModal = false"
    @update-info="emit('update-info')"
  />
</template>
