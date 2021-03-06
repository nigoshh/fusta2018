const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = (content, id) => ({ id, content, votes: 0 })

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
  case 'VOTE':
    newState = state
      .map(a => a.id === action.id ? { ...a, votes: a.votes + 1 }  : a)
    break
  case 'CREATE':
    newState = [ ...state, action.anecdote ]
    break
  default:
    newState = state
    break
  }
  return newState.sort((a1, a2) => a2.votes - a1.votes)
}

export default reducer
