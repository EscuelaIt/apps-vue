export const setToken = (token) => {
  localStorage.setItem('timer-eit-token', token)
}

export const getToken = () => {
  return localStorage.getItem('timer-eit-token')
}

export const isAuthenticated = () => {
  return !!getToken()
}
