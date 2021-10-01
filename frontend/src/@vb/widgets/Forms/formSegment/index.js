import React, { useState, useEffect } from 'react'
import { Form, Input, Button, notification, Spin } from 'antd'
import { SmileOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { createSegment, updateSegment, getSegmentsDataId } from '../../../../services/segmentos'

const Form3 = () => {
  const [data, setData] = useState({
    id: null,
    name: null,
  })
  const [segment, setSegment] = useState({})
  const [idSegment, setId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const getSegmentsId = async () => {
    try {
      setId(id)
      console.log('id:', id)
      const segments = await getSegmentsDataId(id)
      setSegment(segments)
      if (segments) {
        setIsLoading(false)
      }
      console.log('ResponseClientsID:', segment)
    } catch (error) {
      console.log('Error:', error)
    }
  }
  const editSegment = async () => {
    try {
      const response = await updateSegment(id, segment)
      console.log('Response:', response)
      console.log('idBotão:', idSegment)
    } catch (error) {
      console.log('Error:', error)
    }
  }
  const openNotification = () => {
    notification.open({
      message: 'Sucesso',
      description: 'Segmento cadastrado com sucesso!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }
  console.log('Data fora:', data)

  const newSegment = async () => {
    try {
      const response = await createSegment(data)
      console.log('Response: ', response)
      if (!response.error) {
        openNotification()
        history.push('/segments')
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData(data)
    setSegment(segment)
    console.log('***', data)
  }

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      getSegmentsId()
    } else {
      setIsLoading(false)
    }
    console.log('***', id)
    console.log('Client:', segment)
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
              defaultValue={segment.name}
              onChange={
                id
                  ? (e) => {
                      setSegment({ ...segment, name: e.target.value })
                    }
                  : (e) => {
                      setData({ ...data, name: e.target.value })
                    }
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-2">
          <Button type="submit" className="btn btn-success" onClick={id ? editSegment : newSegment}>
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
