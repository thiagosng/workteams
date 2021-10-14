import apiClient from '../axios'

export async function getProjectsData() {
  const { data } = await apiClient.get('/projects')
  return data
}

export async function getProjectsDataId(id) {
  const { data } = await apiClient.get(`/projects/${id}`)
  return data
}

export const createProject = async (data) => {
  const { data: response } = await apiClient.post('/projects/create', data)
  return response
}

export async function deleteProject(id) {
  const { data } = await apiClient.delete(`/projects/delete/${id}`)
  return data
}

export async function updateProject(id, data) {
  const { data: response } = await apiClient.post(`/projects/update/${id}`, data)
  return response
}

export default function projectservices() {
  return {
    getProjectsData,
    getProjectsDataId,
    createProject,
    deleteProject,
    updateProject,
  }
}
