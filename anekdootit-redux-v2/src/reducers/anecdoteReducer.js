import anecdoteService from '../services/anecdotes'
import { notify } from '../reducers/notificationReducer'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const rest = state.filter(a => a.id !== action.anecdote.id)
    return [ ...rest, action.anecdote ]
  }
  case 'CREATE':
    return [ ...state, action.anecdote ]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const createAnecdote = content => async (dispatch) => {
  const anecdote = await anecdoteService.create(content)
  dispatch({ type: 'CREATE', anecdote })
  const text = `you created "${anecdote.content}"`
  notify(text, 5000)(dispatch)
}

export const initAnecdotes = () => async (dispatch) => {
  const data = await anecdoteService.getAll()
  dispatch({ type: 'INIT_ANECDOTES', data })
}

export const voteAnecdote = anecdote => async (dispatch) => {
  anecdote.votes++
  const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdote)
  dispatch({ type: 'VOTE', anecdote: updatedAnecdote })
  const text = `you voted "${updatedAnecdote.content}"`
  notify(text, 5000)(dispatch)
}

export default anecdoteReducer
