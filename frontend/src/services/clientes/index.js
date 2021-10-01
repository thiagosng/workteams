import apiClient from '../axios'

export async function getClientsData() {
  const { data } = await apiClient.get('/clients')
  return data
}

export async function getClientsDataId(id) {
  const { data } = await apiClient.get(`/clients/${id}`)
  return data
}

export const createClient = async (data) => {
  const { data: response } = await apiClient.post('/clients/create', data)
  return response
}

export async function deleteClient(id) {
  try {
    const { data } = await apiClient.delete(`/clients/delete/${id}`)
    console.log('******', data)
    return data
  } catch (error) {
    return error
  }
}

export async function updateClient(id, data) {
  const { data: response } = await apiClient.post(`/clients/update/${id}`, data)
  return response
}

export default function clientServices() {
  return {
    getClientsData,
    getClientsDataId,
    createClient,
    deleteClient,
    updateClient,
  }
}
