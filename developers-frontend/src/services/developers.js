import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/developers'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (developer) => {
  const response = await axios.post(baseUrl, developer)
  return response.data
}

const deleteByID = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const update = async (id, developer) => {
  const response = await axios.put(`${baseUrl}/${id}`, developer )
  return response.data
}

export default { getAll, createNew, deleteByID, update }