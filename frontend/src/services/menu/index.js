import apiClient from '../axios'

export default async function getMenuData() {
  const { data } = await apiClient.get('/menu')
  return data
}
