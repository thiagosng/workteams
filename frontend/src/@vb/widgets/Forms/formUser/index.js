import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Input, Button, notification, Spin } from 'antd'
import { SmileOutlined, LoadingOutlined } from '@ant-design/icons'
import store from 'store'
import { createUser, updateUser, getUsersDataId } from 'services/usuarios'

const Form3 = () => {
  const [data, setData] = useState({
    name: null,
    profileId: null,
    email: null,
    password: null,
    active: true,
    createdBy: store.get('id'),
  })
  const [user, setUser] = useState({})
  const [idUser, setId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const editUser = async () => {
    try {
      const response = await updateUser(idUser)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const getUsersId = async () => {
    try {
      setId(id)
      console.log('id:', id)
      const users = await getUsersDataId(id)
      setUser(users)
      if (users) {
        setIsLoading(false)
      }
      console.log('ResponseClientsID:', user)
    } catch (error) {
      console.log(error)
    }
  }
  const openNotification = () => {
    notification.open({
      message: 'Sucesso',
      description: 'Usuário cadastrado com sucesso!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }
  console.log('Data fora:', data)

  const newUser = async () => {
    try {
      const response = await createUser(data)
      if (!response.error) {
        openNotification()
        history.push('/users')
      }
      console.log('Response:', response)
    } catch (error) {
      console.log('Erro:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData(data)
    setUser(user)
    console.log('***', data)
  }

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      getUsersId()
    } else {
      setIsLoading(false)
    }
    console.log('***', id)
    console.log('Client:', user)
  }, [])

  return !isLoading ? (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Form.Item name="ID Profile" label="profileId">
            <Input
              placeholder="ProfileId"
              defaultValue={user.profileId}
              onChange={
                id
                  ? (e) => {
                      setUser({ ...user, profileId: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, profileId: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item name="name" label="Nome">
            <Input
              placeholder="Nome"
              defaultValue={user.name}
              onChange={
                id
                  ? (e) => {
                      setUser({ ...user, name: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, name: e.target.value })
                    }
              }
              rules={[{ required: true, message: 'Please input your name!' }]}
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item name="email" label="Email">
            <Input
              placeholder="Email"
              defaultValue={user.email}
              onChange={
                id
                  ? (e) => {
                      setUser({ ...user, email: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, email: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item name="password" label="Password">
            <Input
              placeholder="Password"
              defaultValue={user.password}
              onChange={
                id
                  ? (e) => {
                      setUser({ ...user, password: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, password: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-2">
          <Button type="submit" className="btn btn-success" onClick={id ? editUser : newUser}>
            Salvar
          </Button>
        </div>
      </div>
    </Form>
  ) : (
    <Spin indicator={antIcon} />
  )
}

export default Form3
