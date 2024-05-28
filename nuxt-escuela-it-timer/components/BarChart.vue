<script setup>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
