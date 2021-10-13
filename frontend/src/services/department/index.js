import apiClient from '../axios'

export async function getDepartmentsData() {
  const { data } = await apiClient.get('/department')
  return data
}

export async function getDepartmentsDataId(id) {
  const { data } = await apiClient.get(`/department/${id}`)
  return data
}

export const createDepartment = async (data) => {
  const { data: response } = await apiClient.post('/department/create', data)
  return response
}

export async function deleteDepartment(id) {
  const { data } = await apiClient.delete(`/department/delete/${id}`)
  return data
}

export async function updateDepartment(id, data) {
  const { data: response } = await apiClient.post(`/department/update/${id}`, data)
  return response
}

export default function departmentServices() {
  return {
    getDepartmentsData,
    getDepartmentsDataId,
    createDepartment,
    deleteDepartment,
    updateDepartment,
  }
}
