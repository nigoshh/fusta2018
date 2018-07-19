// @flow
type NotificationAction = { id: number, text: string, type: string }
type ErrorState = { id: number, error: string }
type MessageState = { id: number, message: string }

const initialStateE: ErrorState = { id: 0, error: '' }
const initialStateM: MessageState = { id: 0, message: '' }

let nextErrorId: number = 1
let nextMessageId: number = 1

export const errorReducer =
  (state: ErrorState = initialStateE, action: NotificationAction): ErrorState => {
    switch (action.type) {
    case 'E_HIDE':
      if (state.id === action.id)
        return initialStateE
      return state
    case 'E_SHOW':
      return { id: action.id, error: action.text }
    default:
      return state
    }
  }

export const messageReducer =
  (state: MessageState = initialStateM, action: NotificationAction): MessageState => {
    switch (action.type) {
    case 'M_HIDE':
      if (state.id === action.id)
        return initialStateM
      return state
    case 'M_SHOW':
      return { id: action.id, message: action.text }
    default:
      return state
    }
  }

const notify = (id: number, text: string, timeout: number, type: string) =>
  async (dispatch: Object => void) => {
    await dispatch({ type: `${type}SHOW`, text, id })
    window.scrollTo(0, 0)
    setTimeout(() => dispatch({ type: `${type}HIDE`, id }), timeout)
  }

export const notifyMessage = (text: string, timeout: number) => {
  const id: number = nextMessageId++
  return notify(id, text, timeout, 'M_')
}

export const notifyError = (text: string, timeout: number) => {
  const id: number = nextErrorId++
  return notify(id, text, timeout, 'E_')
}
