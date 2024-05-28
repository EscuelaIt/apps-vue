import axios from 'axios'
import { getToken } from '../services/authService'

const axiosCreator = () => {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  }

  const token = getToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return axios.create({
    baseURL: 'https://timer.escuelait.com/api',
    headers,
  })
}

export const http = axiosCreator
