import apiClient from '../axios'

export async function getPostsData() {
  const { data } = await apiClient.get('/posts')
  return data
}

export async function getPostsDataId(id) {
  const { data } = await apiClient.get(`/posts/${id}`)
  return data
}

export const createPost = async (data) => {
  const { data: response } = await apiClient.post('/posts/create', data)
  return response
}

export async function deletePost(id) {
  const { data } = await apiClient.delete(`/posts/delete/${id}`)
  return data
}

export async function updatePost(id, data) {
  const { data: response } = await apiClient.post(`/posts/update/${id}`, data)
  return response
}

export default function postsServices() {
  return {
    getPostsData,
    getPostsDataId,
    createPost,
    deletePost,
    updatePost,
  }
}
