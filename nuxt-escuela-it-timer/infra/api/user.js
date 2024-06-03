import useHttp from '../../composables/useHttp'

export const getMe = async () => {
  const data = await useHttp('/auth/user', { method: 'GET' })
  return data.data
}
