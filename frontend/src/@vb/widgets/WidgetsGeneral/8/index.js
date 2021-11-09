import React, { useEffect, useState } from 'react'
import { getUsersDataId } from 'services/usuarios'
import { getUsersProjectsDataId } from 'services/projectsUsers'
import store from 'store'

const General8 = () => {
  const [users, setUsers] = useState({})
  const [projectUser, setProjectUser] = useState([])
  const [loading, setLoading] = useState(true)

  const id = store.get('id')

  const getUsers = async () => {
    const data = await getUsersDataId(id)
    setUsers(data)
  }

  const getUsersProjectsId = async () => {
    try {
      const projectsUsers = await getUsersProjectsDataId(id)
      setProjectUser(projectsUsers)
      console.log('ResponseClientsID:', projectsUsers)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  useEffect(() => {
    getUsers()
    getUsersProjectsId()
    setLoading(true)
    if (users.department !== undefined) {
      setLoading(false)
    } else {
      users.department = 'Não definido'
      setLoading(false)
    }
    // if(projectUser.projects !== undefined) {
    //   setLoading(false)
    // } else {
    //   projectUser.projects = 'Não definido'
    //   setLoading(false)
    // }
  }, [])

  console.log(users)
  console.log(projectUser)

  return !loading ? (
    <div>
      <div className="d-flex flex-wrap align-items-center mb-2">
        <div className="mb-2">
          <div className="text-dark font-size-18 font-weight-bold text-nowrap">Meus Projetos</div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless">
          <tbody>
            {projectUser.map((project) => (
              <div key={project.id}>
                <p className="text-dark font-size-48 font-weight-bold mb-2">
                  {project.projects.name}
                </p>
                <p className="text-uppercase text-muted mb-3">{project.projects.status}</p>
                <p className="mb-4">{project.projects.description}</p>
                <a className="btn btn-outline-primary">Ver projeto</a>
              </div>
            ))}
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

export default General8
