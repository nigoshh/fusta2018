const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET':
    return action.text
  default:
    return state
  }
}

export const setFilter = text => ({ type: 'SET', text })

export default filterReducer
