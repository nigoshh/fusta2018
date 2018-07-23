import axios from 'axios'
const config = require('../utils/config')

const baseUrl = config.backendUrl + '/api/users'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export default { getAll, getOne }
