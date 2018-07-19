import axios from 'axios'
const config = require('../utils/config')

const baseUrl = config.backendUrl + '/api/login'

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { login }
