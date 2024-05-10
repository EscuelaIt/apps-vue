import { http } from '../http'

export const getMe = async () => {
  const { data } = await http().get('/auth/user')
  return data.data
}
