<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  showError: {
    type: Boolean,
    default: true,
  },
})
// const model = defineModel()
const { value: model, errorMessage, handleBlur } = useField(() => props.name)
const validationListeners = {
  blur: (evt) => handleBlur(evt, true),
}
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      class="input input-bordered w-full max-w-xs"
      :class="errorMessage ? 'border-red-400' : ''"
      :name="name"
      v-on="validationListeners"
    />
    <span v-if="errorMessage" class="text-xs text-red-600">
      {{ errorMessage }}
    </span>
  </div>
</template>
