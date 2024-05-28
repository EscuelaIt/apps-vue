export const extractTime = (totalSeconds) => {
  const hours = formatTwoDigits(Math.floor(totalSeconds / 3600))
  const minutes = formatTwoDigits(Math.floor((totalSeconds % 3600) / 60))
  const seconds = formatTwoDigits(Math.floor(totalSeconds % 60))

  return `${hours}:${minutes}:${seconds}`
}

const formatTwoDigits = (number) => {
  return number < 10 ? `0${number}` : number
}

export const isToday = (dateToCompare, vsDate = new Date()) => {
  return (
    new Date(dateToCompare).getDate() === vsDate.getDate() &&
    new Date(dateToCompare).getMonth() === vsDate.getMonth() &&
    new Date(dateToCompare).getFullYear() === vsDate.getFullYear()
  )
}
