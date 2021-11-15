import apiClient from '../axios'

export async function getTodoListData() {
  const { data } = await apiClient.get('/todoList')
  return data
}

export async function getTodoListDataId(id) {
  const { data } = await apiClient.get(`/todoList/${id}`)
  return data
}

export const createTodoList = async (data) => {
  const { data: response } = await apiClient.post('/todoList/create', data)
  return response
}

export async function deleteTodoList(id) {
  const { data } = await apiClient.delete(`/todoList/delete/${id}`)
  return data
}

export async function updateTodoList(id, data) {
  const { data: response } = await apiClient.post(`/todoList/update/${id}`, data)
  return response
}

export default function todoListService() {
  return {
    getTodoListData,
    getTodoListDataId,
    createTodoList,
    deleteTodoList,
    updateTodoList,
  }
}
