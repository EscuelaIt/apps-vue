import useHttp from '../../composables/useHttp'
import { removeToken, setToken } from '../services/authService'
import { getMe } from './user'
import useUser from '@/composables/useUser'

export const doRegister = async ({ name, email, password }) => {
  const { data } = await useHttp('/auth/register', {
    method: 'POST',
    body: {
      name,
      email,
      password,
    },
  })
  setToken(data.token)
  return getMe()
}

export const doLogin = async ({ email, password }) => {
  const { data } = await useHttp('/auth/login', {
    method: 'POST',
    body: {
      email,
      password,
    },
  })
  setToken(data.token)
  return getMe()
}

export const doLogout = async () => {
  const { setUser } = useUser()
  await useHttp('/auth/logout', { method: 'GET' })
  removeToken()
  setUser()
}
