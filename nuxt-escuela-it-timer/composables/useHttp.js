import { getToken } from '../infra/services/authService'

export default function useHttp(url, options = {}) {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  }

  const token = getToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  options.headers = {
    ...headers,
    ...options.headers,
  }

  return $fetch(`https://timer.escuelait.com/api${url}`, options)
}
