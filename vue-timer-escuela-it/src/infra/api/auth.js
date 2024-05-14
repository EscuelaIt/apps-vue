import useUser from '@/composables/useUser'
import { http } from '../http'
import { removeToken, setToken } from '../services/authService'
import { getMe } from './user'

export const doRegister = async ({ name, email, password }) => {
  const { data } = await http().post('/auth/register', {
    name,
    email,
    password,
  })
  setToken(data.token)
  return getMe()
}

export const doLogin = async ({ email, password }) => {
  const { data } = await http().post('/auth/login', {
    email,
    password,
  })
  setToken(data.token)
  return getMe()
}

export const doLogout = async () => {
  const { setUser } = useUser()
  await http().get('/auth/logout')
  removeToken()
  setUser()
}
