import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

export default defineNuxtPlugin(() => {
  ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)
})
