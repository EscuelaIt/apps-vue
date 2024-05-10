<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import BaseModal from '@/components/BaseModal.vue'
import useUser from '@/composables/useUser'
import { ref } from 'vue'

const showBaseModal = ref(false)
const { user } = useUser()
</script>

<template>
  <BaseLayout>
    <h1 class="bg-red-500">Hola Home!</h1>
    <button class="btn" @click="showBaseModal = true">Show modal</button>
    <h2>{{ user }}</h2>
    <BaseModal
      v-if="showBaseModal"
      :is-active="showBaseModal"
      @close="showBaseModal = false"
    >
      <p>Contenido!!!</p>
    </BaseModal>
  </BaseLayout>
</template>
