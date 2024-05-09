<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import BaseModal from '@/components/BaseModal.vue'
import { ref } from 'vue'

const showBaseModal = ref(false)
</script>

<template>
  <BaseLayout>
    <h1 class="bg-red-500">Hola Home!</h1>
    <button class="btn" @click="showBaseModal = true">Show modal</button>
    <BaseModal
      v-if="showBaseModal"
      :is-active="showBaseModal"
      @close="showBaseModal = false"
    >
      <p>Contenido!!!</p>
    </BaseModal>
  </BaseLayout>
</template>
