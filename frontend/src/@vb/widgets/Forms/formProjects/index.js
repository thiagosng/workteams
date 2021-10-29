import React, { useState, useEffect } from 'react'
import { Form, Input, Button, notification, Spin, DatePicker, Space } from 'antd'
import { SmileOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { createProject, updateProject, getProjectsDataId } from 'services/projects'
import moment from 'moment'

const Form3 = () => {
  const [data, setData] = useState({
    id: null,
    name: null,
  })
  const [project, setProject] = useState({})
  const [idProject, setId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const { RangePicker } = DatePicker

  const dateFormat = 'YYYY/MM/DD'

  const getProjectsId = async () => {
    try {
      setId(id)
      console.log('id:', id)
      const projects = await getProjectsDataId(id)
      setProject(projects)
      if (projects) {
        setIsLoading(false)
      }
      console.log('ResponseClientsID:', project)
    } catch (error) {
      console.log('Error:', error)
    }
  }
  const editProject = async () => {
    try {
      const response = await updateProject(id, project)
      console.log('Response:', response)
      console.log('idBotão:', idProject)
    } catch (error) {
      console.log('Error:', error)
    }
  }
  const openNotification = () => {
    notification.open({
      message: 'Sucesso',
      description: 'projecto cadastrado com sucesso!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }
  console.log('Data fora:', data)

  const newProject = async () => {
    try {
      const response = await createProject(data)
      console.log('Response: ', response)
      if (!response.error) {
        openNotification()
        history.push('/projects')
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData(data)
    setProject(project)
    console.log('***', data)
  }

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      getProjectsId()
    } else {
      setIsLoading(false)
    }
    console.log('***', id)
    console.log('Client:', project)
  }, [])
  return !isLoading ? (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Insira o nome' }]}
          >
            <Input
              defaultValue={project.name}
              onChange={
                id
                  ? (e) => {
                      setProject({ ...project, name: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, name: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item name="name" label="Insira uma data de inicio e fim">
            <Space direction="vertical" size={4}>
              <RangePicker
                defaultValue={[moment(dateFormat), moment(dateFormat)]}
                format={dateFormat}
                onChange={
                  id
                    ? (e) => {
                        setProject({
                          ...project,
                          start_date: e[0].format('YYYY-MM-DD'),
                          end_date: e[1].format('YYYY-MM-DD'),
                        })
                      }
                    : (e) => {
                        setData({
                          ...data,
                          start_date: e[0].format('YYYY-MM-DD'),
                          end_date: e[1].format('YYYY-MM-DD'),
                        })
                      }
                }
              />
            </Space>
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item name="description" label="Descrição">
            <Input.TextArea
              defaultValue={project.description}
              onChange={
                id
                  ? (e) => {
                      setProject({ ...project, description: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, description: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-2">
          <Button type="submit" className="btn btn-success" onClick={id ? editProject : newProject}>
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
