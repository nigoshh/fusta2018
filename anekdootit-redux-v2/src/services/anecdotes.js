import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const create = async content => {
  const res = await axios.post(baseUrl, { content, votes: 0 })
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const update = async (id, anecdote) => {
  const res = await axios.put(`${baseUrl}/${id}`, anecdote)
  return res.data
}

export default { create, getAll, update }
