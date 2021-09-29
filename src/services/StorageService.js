const saveItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

const getItem = (name) => {
  const item = localStorage.getItem(name)
  if (!item) {
    return null
  }
  return JSON.parse(item)
}

const clearStorage = () => {
  localStorage.clear()
}

export {
  saveItem,
  getItem,
  clearStorage
}