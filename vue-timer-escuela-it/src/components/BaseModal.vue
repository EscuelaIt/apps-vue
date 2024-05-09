<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
})
defineEmits(['close'])
</script>

<template>
  <div
    class="modal pointer-events-auto"
    :class="isActive ? 'opacity-100' : 'opacity-0'"
  >
    <div class="modal-box">
      <button
        v-if="showClose"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="$emit('close')"
      >
        x
      </button>

      <h3 class="font-bold text-lg">Hello!</h3>
      <slot />
    </div>
  </div>
</template>
