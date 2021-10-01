import apiClient from '../axios'

export async function getClientsPhonesData() {
  const { data } = await apiClient.get('/clientsPhones')
  return data
}

export async function getClientsPhonesDataId(id) {
  const { data } = await apiClient.get(`/clientsPhones/${id}`)
  return data
}

export const createClientsPhones = async (data) => {
  const { data: response } = await apiClient.post('/clientsPhones/create', data)
  return response
}

export async function deleteClientsPhones(id) {
  const { data } = await apiClient.delete(`/clientsPhones/delete/${id}`)
  return data
}

export async function updateClientsPhones(id, data) {
  const { data: response } = await apiClient.post(`/clientsPhones/update/${id}`, data)
  return response
}

export default function ClientsPhonesServices() {
  return {
    getClientsPhonesData,
    getClientsPhonesDataId,
    createClientsPhones,
    deleteClientsPhones,
    updateClientsPhones,
  }
}
