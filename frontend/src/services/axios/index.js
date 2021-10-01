import axios from 'axios'
import store from 'store'
import { notification } from 'antd'

// Atualização da urlBASE de conexão com a API

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.request.use((request) => {
  const accessToken = store.get('token')
  console.log('accessToken: ', accessToken)
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, (error) => {
  // Errors handling
  console.log(error.response.data.error)
  const { response } = error
  const { data } = response
  if (data) {
    notification.warning({
      message: data.error,
    })
  }
  console.log('data: ', data)
})

export default apiClient
