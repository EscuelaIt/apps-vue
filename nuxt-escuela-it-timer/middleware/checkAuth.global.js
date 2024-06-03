import { isAuthenticated } from '../infra/services/authService'
import { getMe } from '@/infra/api/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, setUser } = useUser()

  if (!isAuthenticated() && to.path !== '/auth') {
    return navigateTo('/auth')
  }

  try {
    if (user.value === undefined) {
      const userInfo = await getMe()
      setUser(userInfo)
    }
  } catch (error) {
    console.error(error)
    if (to.path !== '/auth') {
      return '/auth'
    }
  }
})
