<script setup>
import BaseModal from './BaseModal.vue'

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <BaseModal @close="emit('close')">
    <p class="text-2xl text-center mb-6">¿Estás seguro de la operación?</p>
    <div class="flex gap-6 w-full justify-around">
      <button class="btn btn-active" @click="emit('close')">Cancelar</button>
      <button class="btn btn-error" @click="emit('confirm')">Confirmar</button>
    </div>
  </BaseModal>
</template>
