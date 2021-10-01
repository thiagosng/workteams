import apiClient from '../axios'

export async function getSegmentsData() {
  const { data } = await apiClient.get('/segments')
  return data
}

export async function getSegmentsDataId(id) {
  const { data } = await apiClient.get(`/segments/${id}`)
  return data
}

export const createSegment = async (data) => {
  const { data: response } = await apiClient.post('/segments/create', data)
  return response
}

export async function deleteSegment(id) {
  const { data } = await apiClient.delete(`/segments/delete/${id}`)
  return data
}

export async function updateSegment(id, data) {
  const { data: response } = await apiClient.post(`/segments/update/${id}`, data)
  return response
}

export default function segmentServices() {
  return {
    getSegmentsData,
    getSegmentsDataId,
    createSegment,
    deleteSegment,
    updateSegment,
  }
}
