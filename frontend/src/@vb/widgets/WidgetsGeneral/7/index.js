import React, { useEffect, useState } from 'react'
import { getUsersDataId } from 'services/usuarios'
import store from 'store'

const General7 = () => {
  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(true)

  const id = store.get('id')

  const getUsers = async () => {
    const data = await getUsersDataId(id)
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
    setLoading(true)
    if (users.department !== undefined) {
      setLoading(false)
    } else {
      users.department = 'Não definido'
      setLoading(false)
    }
  }, [])

  console.log(users)

  return !loading ? (
    <div>
      <div className="d-flex flex-wrap align-items-center mb-2">
        <div className="mb-2">
          <div className="text-dark font-size-18 font-weight-bold text-nowrap">
            Minhas Informações
          </div>
          <div className="text-uppercase">Support team</div>
        </div>
      </div>
      <div className="mb-3">
        <a className="btn btn-outline-primary mr-2">Chat</a>
        <a className="btn btn-outline-danger">Unfollow</a>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="text-gray-6 pl-0">Departamento</td>
              <td className="pr-0 text-right text-dark">{users.department.name}</td>
            </tr>
            <tr>
              <td className="text-gray-6 pl-0">Ocupação</td>
              <td className="pr-0 text-right text-dark">{users.occupation}</td>
            </tr>
            <tr>
              <td className="text-gray-6 pl-0">Tempo de Experiência</td>
              <td className="pr-0 text-right text-dark">{users.timeExperience}</td>
            </tr>
            <tr>
              <td className="text-gray-6 pl-0">Email</td>
              <td className="pr-0 text-right text-dark">{users.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default General7
