import React, { useState, useEffect } from 'react'
import { Form, Input, Button, notification, Spin } from 'antd'
import { SmileOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { createDepartment, updateDepartment, getDepartmentsDataId } from 'services/department'

const Form3 = () => {
  const [data, setData] = useState({
    id: null,
    name: null,
    description: null,
  })
  const [department, setDepartment] = useState({})
  const [idDepartment, setId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const getDepartmentsId = async () => {
    try {
      setId(id)
      console.log('id:', id)
      const departments = await getDepartmentsDataId(id)
      setDepartment(departments)
      if (departments) {
        setIsLoading(false)
      }
      console.log('ResponseClientsID:', department)
    } catch (error) {
      console.log('Error:', error)
    }
  }
  const editDepartment = async () => {
    try {
      const response = await updateDepartment(id, department)
      console.log('Response:', response)
      console.log('idBotão:', idDepartment)
    } catch (error) {
      console.log('Error:', error)
    }
  }
  const openNotification = () => {
    notification.open({
      message: 'Sucesso',
      description: 'departmento cadastrado com sucesso!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }
  console.log('Data fora:', data)
  console.log('Department fora:', department)

  const newDepartment = async () => {
    try {
      const response = await createDepartment(data)
      console.log('Response: ', response)
      if (!response.error) {
        openNotification()
        history.push('/department')
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData(data)
    setDepartment(department)
    console.log('***', data)
  }

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      getDepartmentsId()
    } else {
      setIsLoading(false)
    }
    console.log('***', id)
    console.log('Client:', department)
  }, [])
  return !isLoading ? (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Insira o nome' }]}
          >
            <Input
              defaultValue={department.name}
              onChange={
                id
                  ? (e) => {
                      setDepartment({ ...department, name: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, name: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item name="description" label="Descrição">
            <Input.TextArea
              defaultValue={department.description}
              onChange={
                id
                  ? (e) => {
                      setDepartment({ ...department, description: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, description: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-2">
          <Button
            type="submit"
            className="btn btn-success"
            onClick={id ? editDepartment : newDepartment}
          >
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
