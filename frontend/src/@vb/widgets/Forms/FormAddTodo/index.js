import React, { useState } from 'react'
import { Form, Input, Modal, Button, notification } from 'antd'
import { useParams } from 'react-router-dom'
// import store from 'store'
import { v4 as uuid } from 'uuid'

const FormAddUsers = () => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id } = useParams()

  console.log('id', id)

  // transformar id string em number

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
    openNotificationWithIcon('success')
    const oldLeads = localStorage.getItem('lead')
    if (oldLeads === null) {
      localStorage.setItem('lead', JSON.stringify([{ id: uuid(), name, content }]))
      //    history.push('/painel');
    } else {
      const lead = [...JSON.parse(oldLeads), { id: uuid(), name, content }]
      localStorage.setItem('lead', JSON.stringify(lead))
      // history.push('/painel');
      console.log(lead)
    }
  }

  console.log('teste modal', name, content)
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Adicionar Card
      </Button>
      <Modal
        title="Selecione um membro"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, message: 'Insira um nome' }]}
              >
                <Input
                  placeholder="Informe o conteudo"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="content"
                label="Conteudo"
                rules={[{ required: true, message: 'Insira o conteudo' }]}
              >
                <Input
                  placeholder="Informe o conteudo"
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default FormAddUsers
