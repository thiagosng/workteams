import React, { useState, useEffect } from 'react'
import { Form, Spin, Cascader, Modal, Button, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { getUsersData } from 'services/usuarios'
import { createProjectsUsers } from 'services/projectsUsers'

const FormAddUsers = () => {
  const [data, setData] = useState({
    userId: null,
    projectId: null,
  })
  const [users, setUsers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const { id } = useParams()
  const idProject = parseInt(id, 10)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  console.log('id', id)

  // transformar id string em number

  const getUsers = async () => {
    try {
      const listUsers = await getUsersData()
      setUsers(listUsers)
      if (listUsers) {
        setIsLoading(false)
      }
      console.log('ResponseClients:', listUsers)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Sucesso',
      description: 'Membro adicionado com sucesso ao projeto',
    })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    addUsers()
    openNotificationWithIcon('success')
    setIsLoadingUsers(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  console.log('Data fora:', data)
  console.log('Usuarios: ', users)

  const handleSubmit = (e) => {
    e.preventDefault()
    setData(data)
    console.log('***', data)
  }

  const addUsers = async () => {
    try {
      const newProjectUser = await createProjectsUsers(data)
      console.log('ResponseClientsID:', newProjectUser)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const options = users.map((user) => {
    return {
      value: user.id,
      label: user.name,
    }
  })
  useEffect(() => {
    getUsers()
    setIsLoadingUsers(false)
  }, [isLoadingUsers])

  return !isLoading ? (
    <div>
      <Button type="primary" onClick={showModal}>
        Adicionar Membros
      </Button>
      <Modal
        title="Selecione um membro"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="add"
                label="Selecionar"
                rules={[{ required: true, message: 'Adicionar Usuário' }]}
              >
                <Cascader
                  defaultValue={users.id}
                  onChange={(e) => setData({ ...data, userId: e[0], projectId: idProject })}
                  options={options}
                >
                  {users.name}
                </Cascader>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  ) : (
    <Spin indicator={antIcon} />
  )
}

export default FormAddUsers
