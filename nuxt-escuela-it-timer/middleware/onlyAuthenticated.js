import { isAuthenticated } from '@/infra/services/authService'

export default defineNuxtRouteMiddleware((to) => {
  if (!isAuthenticated()) {
    return navigateTo('/auth')
  }
})
