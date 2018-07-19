import axios from 'axios'
import backendUrl from '../utils/config'

const baseUrl = backendUrl + '/api/users'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getAll }
