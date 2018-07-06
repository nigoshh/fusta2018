const initialState = { id: 0, text: '' }

let nextNotificationId = 1

const notificationReducer = (state = initialState, { type, text, id }) => {
  switch (type) {
  case 'HIDE':
    if (state.id === id)
      return initialState
    return state
  case 'SHOW':
    return { id, text }
  default:
    return state
  }
}

export const notify = (text, timeout) => dispatch => {
  const id = nextNotificationId++
  dispatch({ type: 'SHOW', text, id })
  setTimeout(() => dispatch({ type: 'HIDE', id }), timeout)
}

export default notificationReducer
