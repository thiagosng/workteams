import apiClient from '../axios'

export async function getUsersData() {
  const { data } = await apiClient.get('/users')
  return data
}

export async function getUsersDataId(id) {
  const { data } = await apiClient.get(`/users/${id}`)
  return data
}

export const createUser = async (data) => {
  const { data: response } = await apiClient.post('/users/create', data)
  return response
}

export async function deleteUser(id) {
  const { data } = await apiClient.delete(`/users/delete/${id}`)
  return data
}

export async function updateUser(id, data) {
  const { data: response } = await apiClient.post(`/users/update/${id}`, data)
  return response
}

export default function clientServices() {
  return {
    getUsersData,
    getUsersDataId,
    createUser,
    deleteUser,
    updateUser,
  }
}
