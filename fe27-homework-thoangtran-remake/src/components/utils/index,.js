export const localStorageUtil = (key, defaultValue) => {
  const get = () => localStorage.getItem(key) || JSON.stringify(defaultValue)
  const set = (value) => localStorage.setItem(key, JSON.stringify(value))
  const remove = () => localStorage.removeItem(key)

  return {
    get,
    set,
    remove,
  }
}

export const compareWithToday = (dateString) => {
  const date = new Date(dateString).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)

  if (date === today) return true

  return false
}

export const isInPastDate = (dateString) => {
  const date = new Date(dateString).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)

  if (date < today) return true

  return false
}
