import axios from 'axios'
import backendUrl from '../utils/config'

const baseUrl = backendUrl() + '/api/login'

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { login }
