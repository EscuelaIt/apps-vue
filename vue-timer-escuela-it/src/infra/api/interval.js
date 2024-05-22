import { http } from '../http'
import { IntervalModel } from '../models/IntervalModel'
import { IntervalModelApi } from '../models/IntervalModelApi'

export const listIntervals = async () => {
  const { data } = await http().get('/intervals')
  return data.data.map((interval) => new IntervalModel(interval))
}

export const createInterval = async (payload) => {
  const interval = new IntervalModelApi(payload)
  const { data } = await http().post('/intervals', interval)
  return new IntervalModel(data.data)
}

export const finalizeInterval = async () => {
  const { data } = await http().get('/intervals/finalize')
  return new IntervalModel(data.data)
}
