<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  defaultTab: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['change'])

const selectedTab = ref(props.defaultTab)

const selectTab = (tab) => {
  selectedTab.value = tab
  emit('change', tab)
}
</script>

<template>
  <div class="tabs tabs-bordered">
    <p
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab"
      :class="selectedTab === index ? '!border-b-black' : ''"
      @click="selectTab(index)"
    >
      {{ tab }}
    </p>
  </div>
</template>
