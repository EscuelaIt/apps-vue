<script setup>
defineProps({
  showClose: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
})
defineEmits(['close'])
</script>

<template>
  <div class="modal pointer-events-auto opacity-100">
    <div class="modal-box" :class="showClose && 'pt-11'">
      <button
        v-if="showClose"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="$emit('close')"
      >
        x
      </button>

      <h3 v-if="title" class="font-bold text-lg mb-8">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>
