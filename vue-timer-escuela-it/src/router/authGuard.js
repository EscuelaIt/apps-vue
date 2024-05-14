import useUser from '@/composables/useUser'
import { getMe } from '@/infra/api/user'
import { isAuthenticated } from '@/infra/services/authService'

const needsToAuthenticate = (to) => to.matched.some((m) => m.meta.requiresAuth)

export const authGuard = async (to) => {
  const { setUser, user } = useUser()

  if (!isAuthenticated()) {
    if (needsToAuthenticate(to)) {
      return '/auth'
    }
    return
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
}
