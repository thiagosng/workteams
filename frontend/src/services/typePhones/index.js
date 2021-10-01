import apiClient from '../axios'

export async function getTypePhonesData() {
  const { data } = await apiClient.get('/typesPhones')
  return data
}

export async function getTypePhonesDataId(id) {
  const { data } = await apiClient.get(`/typesPhones/${id}`)
  return data
}

export const createTypePhone = async (data) => {
  const { data: response } = await apiClient.post('/typesPhones/create', data)
  return response
}

export async function deleteTypePhone(id) {
  const { data } = await apiClient.delete(`/typesPhones/delete/${id}`)
  return data
}

export async function updateTypePhone(id, data) {
  const { data: response } = await apiClient.post(`/typesPhones/update/${id}`, data)
  return response
}

export default function typePhonesServices() {
  return {
    getTypePhonesData,
    getTypePhonesDataId,
    createTypePhone,
    deleteTypePhone,
    updateTypePhone,
  }
}
