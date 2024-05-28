<script setup>
import { StopIcon } from '@heroicons/vue/24/solid'
import { extractTime } from '@/utils/dates'

const props = defineProps({
  project: {
    type: Object,
    default: () => ({}),
  },
  secondsOpened: {
    type: Number,
    required: true,
  },
  endTime: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['stop'])

const totalTime = ref('')

const loadData = () => {
  let totalSeconds = props.secondsOpened
  totalTime.value = extractTime(totalSeconds)

  setInterval(() => {
    if (!props.endTime) {
      totalSeconds++
    }

    totalTime.value = extractTime(totalSeconds)
  }, 1000)
}

loadData()
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-4">
      <h2 class="card-title">{{ totalTime }}</h2>
      <div class="flex items-center">
        <p v-if="project" class="text-xs flex flex-col">
          <span>{{ project.name }}</span>
          <span>{{ project.description }}</span>
        </p>
        <button
          v-if="!endTime"
          class="bg-red-700 rounded-full border w-fit p-1 hover:opacity-75"
          @click="emit('stop')"
        >
          <StopIcon class="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>
