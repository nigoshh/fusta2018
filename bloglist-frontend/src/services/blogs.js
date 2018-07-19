import axios from 'axios'
const config = require('../utils/config') 

const baseUrl = config.backendUrl + '/api/blogs'

let token = ''

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog) => {
  const config = { headers: { 'Authorization': token } }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async (id, blog) => {
  const config = { headers: { 'Authorization': token } }
  const res = await axios.put(`${baseUrl}/${id}`, blog, config)
  return res.data
}

const comment = async (id, comment) => {
  const config = { headers: { 'Authorization': token } }
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return res.data
}

const remove = async (id) => {
  const config = { headers: { 'Authorization': token } }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const setToken = newToken => token = `bearer ${newToken}`

export default { getAll, create, update, comment, remove, setToken }
