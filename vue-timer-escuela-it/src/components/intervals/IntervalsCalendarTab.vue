<script setup>
import IntervalDetailModal from '@/components/intervals/IntervalDetailModal.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { computed, ref } from 'vue'

const props = defineProps({
  allIntervals: {
    type: Array,
    default: () => [],
  },
})

const intervalToShow = ref({})
const showIntervalDetailModal = ref(false)

const intervalCalendar = computed(() => {
  return props.allIntervals.map((interval) => {
    return {
      id: interval.id,
      title: interval.project.name,
      start: interval.startTime,
      end: interval.endTime,
    }
  })
})

const handleEventClick = (eventClick) => {
  console.log(eventClick)
  intervalToShow.value = props.allIntervals.find((interval) => {
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
  <FullCalendar
    :options="{
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      events: intervalCalendar,
      eventClick: handleEventClick,
      firstDay: 1,
    }"
  />

  <IntervalDetailModal
    v-if="showIntervalDetailModal"
    v-bind="intervalToShow"
    @close="closeIntervalDetailModal"
  />
</template>
