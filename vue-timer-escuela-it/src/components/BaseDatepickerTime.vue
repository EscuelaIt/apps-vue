<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  modelValue: {
    type: [Date, String],
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  min: {
    type: String,
    default: '',
  },
})

const {
  value: model,
  errorMessage,
  handleBlur,
} = useField(() => props.name, undefined, {
  syncVModel: true,
})
const validationListeners = {
  blur: (evt) => handleBlur(evt, true),
}
</script>

<template>
  <div class="flex flex-col">
    <input
      v-model="model"
      type="datetime-local"
      :name="name"
      v-on="validationListeners"
      class="border rounded px-3 py-1"
      :class="errorMessage ? 'border-red-400' : ''"
      :min="min"
    />
    <span v-if="errorMessage" class="text-xs text-red-600">
      {{ errorMessage }}
    </span>
  </div>
</template>
