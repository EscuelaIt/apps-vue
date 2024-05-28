<script setup>
import { format } from 'date-fns'
import BaseModal from '@/components/BaseModal.vue'

defineProps({
  project: {
    type: Object,
    default: () => ({}),
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
})
const emit = defineEmits(['close'])
</script>

<template>
  <BaseModal title="Detalle intervalo" @close="emit('close')">
    <div class="mb-4">
      <h4 class="text-xl">{{ project.name }}</h4>
      <p>{{ project.description }}</p>
    </div>
    <div>
      <p>
        <strong>Start:</strong> {{ format(startTime, 'dd/MM/yyyy HH:mm:ss') }}
      </p>
      <p v-if="endTime">
        <strong>End:</strong> {{ format(endTime, 'dd/MM/yyyy HH:mm:ss') }}
      </p>
    </div>
  </BaseModal>
</template>
