import axios from 'axios'

const baseUrl = '/api/persons'

const extractData = (response) => response.data

const getAll = () => axios.get(baseUrl).then(extractData)

const create = (newP) => axios.post(baseUrl, newP).then(extractData)

const update = (newP) =>
  axios.put(`${baseUrl}/${newP.id}`, newP).then(extractData)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }
