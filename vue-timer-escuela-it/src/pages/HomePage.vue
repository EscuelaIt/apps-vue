<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import IntervalCard from '@/components/intervals/IntervalCard.vue'
import { listIntervals } from '@/infra/api/interval'
import { onBeforeMount, ref } from 'vue'

const allIntervals = ref([])

onBeforeMount(() => {
  loadData()
})

const loadData = async () => {
  try {
    allIntervals.value = await listIntervals()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <BaseLayout title="Dashboard" @update-info="loadData()">
    <section class="grid grid-cols-4 gap-3">
      <IntervalCard
        v-for="interval in allIntervals"
        :key="interval.id"
        v-bind="interval"
      />
    </section>
  </BaseLayout>
</template>
