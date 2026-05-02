/**
 * src/components/DarkMode.ts
 * Dark mode toggle — persists preference in localStorage,
 * respects prefers-color-scheme on first visit.
 */

const KEY = 'attend-color-scheme'

export type ColorScheme = 'light' | 'dark'

export const getScheme = (): ColorScheme => {
  const stored = localStorage.getItem(KEY) as ColorScheme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const setScheme = (scheme: ColorScheme) => {
  localStorage.setItem(KEY, scheme)
  document.documentElement.setAttribute('data-scheme', scheme)
}

export const toggleScheme = () => {
  const current = getScheme()
  setScheme(current === 'dark' ? 'light' : 'dark')
}

export const initDarkMode = () => {
  setScheme(getScheme())
}
