<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import BaseModal from '@/components/BaseModal.vue'
import useUser from '@/composables/useUser'
import { ref } from 'vue'

const showBaseModal = ref(false)
const { user } = useUser()
</script>

<template>
  <BaseLayout title="Dashboard">
    <button class="btn" @click="showBaseModal = true">Show modal</button>
    <h2>{{ user }}</h2>
    <BaseModal v-if="showBaseModal" @close="showBaseModal = false">
      <p>Contenido!!!</p>
    </BaseModal>
  </BaseLayout>
</template>
