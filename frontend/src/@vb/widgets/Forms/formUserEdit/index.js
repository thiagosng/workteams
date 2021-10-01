import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useParams } from 'react-router-dom'
import { updateUser, getUsersDataId } from '../../../../services/usuarios'

const FormUserEdit = () => {
  const [idUser, setId] = useState(null)

  const { id } = useParams()

  const editClient = async () => {
    try {
      const response = await updateUser(idUser)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const [user, setUser] = useState({})

  const getUsersId = async () => {
    try {
      setId(id)
      console.log('id:', id)
      const users = await getUsersDataId(id)
      setUser(users)
      console.log('ResponseClientsID:', user)
    } catch (error) {
      console.log(error)
    }
  }
  console.log('ResponseClientsIDFORA:', user)

  useEffect(() => {
    getUsersId()
    console.log('***', id)
    console.log('Client:', user)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser(user)
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Form.Item name="ID Profile" label="profileId">
            <Input
              placeholder="ProfileId"
              onChange={(e) => setUser({ ...user, profileId: e.target.value })}
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item name="name" label="Nome">
            <Input
              placeholder="Nome"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              rules={[{ required: true, message: 'Please input your name!' }]}
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item name="email" label="Email">
            <Input onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item name="password" label="Password">
            <Input onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </Form.Item>
        </div>
        <Button type="submit" className="mr-3 mb-3" onClick={editClient}>
          Salvar Alterações
        </Button>
      </div>
    </Form>
  )
}

export default FormUserEdit
