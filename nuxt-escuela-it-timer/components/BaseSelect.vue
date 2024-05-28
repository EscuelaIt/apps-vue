<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    required: true,
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
  <select
    v-model="model"
    class="select select-bordered w-full select-sm"
    :class="errorMessage ? 'border-red-400' : ''"
    :name="name"
    v-on="validationListeners"
  >
    <option disabled selected value="">{{ title }}</option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
  <span v-if="errorMessage" class="text-xs text-red-600">
    {{ errorMessage }}
  </span>
</template>
