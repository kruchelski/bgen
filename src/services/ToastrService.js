import EventBus from '@/utils/EventBus'

const displayToastr = (body, title = 'Success event', type = 'succes') => {
  if (!body) return
  const toastrData = {
    type,
    title,
    body
  }
  EventBus.$emit('display-toastr', toastrData)
}

export {
  displayToastr
}