const generateId = ids => {
  let newId
  do newId = randomId()
  while (ids.includes(newId))
  return newId
}

const randomId = () => (100000*Math.random()).toFixed(0)

const create = (content, ids) => {
  const id = generateId(ids)
  const anecdote = { id, content, votes: 0 }
  return { type: 'CREATE', anecdote }
}

const vote = id => ({ type: 'VOTE', id })

export { create, vote }
