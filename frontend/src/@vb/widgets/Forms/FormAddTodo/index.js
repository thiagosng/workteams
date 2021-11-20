import React, { useState } from 'react'
import { Form, Modal, Button, notification } from 'antd'
import { useParams } from 'react-router-dom'
// import store from 'store'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import TextArea from 'antd/lib/input/TextArea'

const mapStateToProps = ({ user }) => ({ user })

const FormAddUsers = ({ user }) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id } = useParams()

  console.log('id', id)

  // transformar id string em number

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Sucesso',
      description: 'Card adicionado com sucesso ao quadro kanban',
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
      <Modal title="Novo card" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="content"
                label="Conteudo"
                rules={[{ required: true, message: 'Insira o conteúdo do card' }]}
              >
                <TextArea
                  placeholder="Informe o conteúdo"
                  onChange={(e) => {
                    setContent(e.target.value)
                    setName(user.name)
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

export default connect(mapStateToProps)(FormAddUsers)
