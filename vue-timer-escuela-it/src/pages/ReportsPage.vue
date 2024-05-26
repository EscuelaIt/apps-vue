<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import { listIntervals } from '@/infra/api/interval'
import { onBeforeMount, ref, computed } from 'vue'
import { extractTime, isToday } from '@/utils/dates'
import BarChart from '@/components/BarChart.vue'

const allIntervals = ref([])
const totalsTimes = ref([])

const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
]

onBeforeMount(() => {
  loadData()
})

const totalTime = computed(() => {
  return extractTime(
    allIntervals.value.reduce((acc, data) => {
      return acc + (data.secondsOpened || 0)
    }, 0),
  )
})

const loadData = async () => {
  try {
    allIntervals.value = await listIntervals()

    const now = new Date()
    const monday = new Date(now)
    const fromMonday = (now.getDay() + 6) % 7
    monday.setDate(now.getDate() - fromMonday)

    const actualWeek = daysOfWeek.map((day, index) => {
      const currentDate = new Date(monday)
      currentDate.setDate(monday.getDate() + index)

      return { day, currentDate }
    })
    // console.log(actualWeek)

    totalsTimes.value = actualWeek.map((day) => {
      let currentTotalTime = 0
      allIntervals.value.forEach((interval) => {
        if (isToday(day.currentDate, new Date(interval.endTime))) {
          // console.log(day.day, interval.project.name)
          currentTotalTime += interval.secondsOpened
        }
        // console.log(isToday(day.currentDate, new Date(interval.endTime)))
      })
      return extractTotalHours(currentTotalTime)
    })

    console.log(totalsTimes.value)
  } catch (error) {
    console.error(error)
  }
}

const extractTotalHours = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  return hours + minutes / 60 + seconds / 3600
}
</script>

<template>
  <BaseLayout title="Reportes">
    <p>
      Tiempo total: <span class="font-bold">{{ totalTime }}</span>
    </p>

    <BarChart
      v-if="totalsTimes.length"
      :labels="daysOfWeek"
      :data="totalsTimes"
    />
  </BaseLayout>
</template>
