import useUser from '@/composables/useUser'
import { getMe } from '@/infra/api/user'
import { isAuthenticated } from '@/infra/services/authService'

const needsToAuthenticate = (to) => to.matched.some((m) => m.meta.requiresAuth)

export const authGuard = async (to) => {
  const { setUser } = useUser()

  if (!isAuthenticated()) {
    if (needsToAuthenticate(to)) {
      return '/auth'
    }
    return
  }

  try {
    const user = await getMe()
    setUser(user)
  } catch (error) {
    console.error(error)
    return '/auth'
  }
}
