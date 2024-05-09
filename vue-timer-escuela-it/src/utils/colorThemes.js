const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

const setColorScheme = (e) => {
  if (e.matches) {
    setScheme('dark')
  } else {
    setScheme('light')
  }
}

export const setScheme = (theme) => {
  document.querySelector('html').setAttribute('data-theme', theme)
}

export const getColorScheme = () => {
  return document.querySelector('html').getAttribute('data-theme')
}

colorScheme.addEventListener('change', setColorScheme)
