import apiClient from 'services/axios'
import store from 'store'

// Atualizando as rotas de acordo com o banco de dados

export async function loginAuth(email, password) {
  console.log(email, password)

  const parameters = {
    email,
    password,
  }

  return apiClient
    .post('/users/authentication', parameters)
    .then((response) => {
      store.set('email', email)
      if (response) {
        const { token } = response.data
        if (token) {
          store.set('token', token)
        }
        return response.data
      }
      return false
    })
    .catch((err) => console.log('error: ', err))
}

export async function register(email, password, name) {
  return apiClient
    .post('/register', {
      email,
      password,
      name,
    })
    .then((response) => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('token', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export async function currentAccount() {
  console.log(store.get('email'))
  return apiClient
    .get(`/users/email/${store.get('email')}`)
    .then((response) => {
      store.set('id', response.data.id)
      console.log('ResponseId', response.data.id)
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('token', accessToken)
          console.log('store', store.get('id'))
        }
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export async function logout() {
  store.remove('token')
  store.remove('email')
  store.remove('id')
  return true
}
