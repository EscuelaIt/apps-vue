<script setup>
import IntervalCard from '@/components/intervals/IntervalCard.vue'
import IntervalsCalendarTab from '@/components/intervals/IntervalsCalendarTab.vue'
import IntervalsListTab from '@/components/intervals/IntervalsListTab.vue'

import { finalizeInterval, listIntervals } from '@/infra/api/interval'
import { isToday } from '@/utils/dates'

definePageMeta({
  middleware: ['only-authenticated'],
})

const allIntervals = ref([])
const openedIntervals = ref([])
const restIntervals = ref([])
const todayIntervals = ref([])

const selectedTab = ref(0)

const tabsComponents = computed(() => {
  const options = [IntervalsCalendarTab, IntervalsListTab]

  return options[selectedTab.value]
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

loadData()
</script>

<template>
  <!-- <BaseLayout title="Dashboard" @update-info="loadData()"> -->
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

  <BaseTabs
    :tabs="['Calendario', 'Listado']"
    @change="(tab) => (selectedTab = tab)"
  />

  <section class="mt-5">
    <component :is="tabsComponents" :all-intervals="allIntervals" />
  </section>

  <!-- <FullCalendar
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
    /> -->
  <!-- </BaseLayout> -->
</template>
