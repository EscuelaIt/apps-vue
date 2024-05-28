import useHttp from '../../composables/useHttp'
import { IntervalModel } from '../models/IntervalModel'
import { IntervalModelApi } from '../models/IntervalModelApi'

export const listIntervals = async () => {
  const { data } = await useHttp('/intervals', { method: 'GET' })
  return data.data.map((interval) => new IntervalModel(interval))
}

export const createInterval = async (payload) => {
  const interval = new IntervalModelApi(payload)
  const { data } = await useHttp('/intervals', {
    method: 'POST',
    body: { interval },
  })
  return new IntervalModel(data.data)
}

export const finalizeInterval = async () => {
  const { data } = await useHttp('/intervals/finalize', { method: 'GET' })
  return new IntervalModel(data.data)
}
