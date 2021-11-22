import React, { useState } from 'react'
import { Input, Button, Form, notification } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { forgotPassword } from 'services/usuarios'
import style from '../style.module.scss'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const history = useHistory()

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const openNotification = () => {
    notification.open({
      message: 'Sucesso',
      description: 'Um email foi enviado para você com instruções para recuperar sua senha',
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    })
  }

  const sendForgotPassword = async () => {
    const response = await forgotPassword(email)
    if (!response.error) {
      openNotification()
      history.push('/auth/login')
    }
    console.log(response)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="mt-5 pt-2">
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-32 mb-3">Redefinição de Senha</div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira a sua nova senha' }]}
          >
            <Input placeholder="Endereço de Email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="repeat-password"
            rules={[{ required: true, message: 'Por favor, insira novamente a sua nova senha' }]}
          >
            <Input placeholder="Endereço de Email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="text-center w-100"
            onClick={sendForgotPassword}
          >
            <strong>Enviar email</strong>
          </Button>
        </Form>
        <Link to="/auth/login" className="vb__utils__link">
          <i className="fe fe-arrow-left mr-1 align-middle" />
          Fazer login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
