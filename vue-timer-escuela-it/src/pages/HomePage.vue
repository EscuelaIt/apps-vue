<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import IntervalCard from '@/components/intervals/IntervalCard.vue'
import IntervalDetailModal from '@/components/intervals/IntervalDetailModal.vue'
import { finalizeInterval, listIntervals } from '@/infra/api/interval'
import { isToday } from '@/utils/dates'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { computed, onBeforeMount, ref } from 'vue'

const allIntervals = ref([])
const openedIntervals = ref([])
const restIntervals = ref([])
const todayIntervals = ref([])
const intervalToShow = ref({})
const showIntervalDetailModal = ref(false)

onBeforeMount(() => {
  loadData()
})

const intervalCalendar = computed(() => {
  return allIntervals.value.map((interval) => {
    return {
      id: interval.id,
      title: interval.project.name,
      start: interval.startTime,
      end: interval.endTime,
    }
  })
})

const loadData = async () => {
  try {
    allIntervals.value = await listIntervals()
    extractIntervals(allIntervals.value)
  } catch (error) {
    console.error(error)
  }
}

const extractIntervals = (intervals) => {
  openedIntervals.value = []
  restIntervals.value = []
  todayIntervals.value = []

  intervals.forEach((interval) => {
    if (!interval.endTime) {
      openedIntervals.value.push(interval)
      return
    }

    if (isToday(interval.endTime)) {
      todayIntervals.value.push(interval)
      return
    }

    restIntervals.value.push(interval)
  })
}

const closeInterval = async () => {
  try {
    await finalizeInterval()
    loadData()
    // const index = allIntervals.value.findIndex(
    //   (i) => i.id === updatedInterval.id,
    // )
    // allIntervals.value.splice(index, 1, {
    //   ...allIntervals.value[index],
    //   endTime: updatedInterval.endTime,
    // })
  } catch (error) {
    console.error(error)
  }
}

const handleEventClick = (eventClick) => {
  console.log(eventClick)
  intervalToShow.value = allIntervals.value.find((interval) => {
    return interval.id === +eventClick.event.id
  })
  showIntervalDetailModal.value = true
}

const closeIntervalDetailModal = () => {
  showIntervalDetailModal.value = false
  intervalToShow.value = {}
}
</script>

<template>
  <BaseLayout title="Dashboard" @update-info="loadData()">
    <h3>Intervalos abiertos</h3>
    <section class="grid grid-cols-4 gap-3">
      <IntervalCard
        v-for="interval in openedIntervals"
        :key="interval.id"
        v-bind="interval"
        @stop="closeInterval()"
      />
    </section>
    <h3>Intervalos de hoy</h3>
    <section class="grid grid-cols-4 gap-3">
      <IntervalCard
        v-for="interval in todayIntervals"
        :key="interval.id"
        v-bind="interval"
        @stop="closeInterval()"
      />
    </section>
    <h3>Resto de intervalos</h3>
    <section class="grid grid-cols-4 gap-3">
      <IntervalCard
        v-for="interval in restIntervals"
        :key="interval.id"
        v-bind="interval"
        @stop="closeInterval()"
      />
    </section>

    <FullCalendar
      :options="{
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: 'dayGrid',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        events: intervalCalendar,
        eventClick: handleEventClick,
      }"
    />

    <IntervalDetailModal
      v-if="showIntervalDetailModal"
      v-bind="intervalToShow"
      @close="closeIntervalDetailModal"
    />
  </BaseLayout>
</template>
