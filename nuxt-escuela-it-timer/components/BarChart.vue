<script setup>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
})

const chartData = ref({
  labels: props.labels,
  datasets: [{ label: 'Tiempo por días', data: props.data }],
})

const chartOptions = {
  responsive: true,
  backgroundColor: 'rgba(75, 192, 192, 0.2)',
  borderColor: 'rgb(75, 192, 192)',
  borderWidth: 1,
}
</script>

<template>
  <Bar :options="chartOptions" :data="chartData" />
</template>
