import apiClient from '../axios'

export async function getProjectsUsersData() {
  const { data } = await apiClient.get('/projectsUsers')
  return data
}

export async function getProjectsUsersDataId(id) {
  const { data } = await apiClient.get(`/projectsUsers/projects/${id}`)
  return data
}

export async function getUsersProjectsDataId(id) {
  const { data } = await apiClient.get(`/projectsUsers/users/${id}`)
  return data
}

export const createProjectsUsers = async (data) => {
  const { data: response } = await apiClient.post('/projectsUsers/create', data)
  return response
}

export async function deleteProjectsUsers(id) {
  const { data } = await apiClient.delete(`/projectsUsers/delete/${id}`)
  return data
}

export async function updateProjectsUsers(id, data) {
  const { data: response } = await apiClient.post(`/projectsUsers/update/${id}`, data)
  return response
}

export default function projectservices() {
  return {
    getProjectsUsersData,
    getProjectsUsersDataId,
    createProjectsUsers,
    deleteProjectsUsers,
    updateProjectsUsers,
  }
}
