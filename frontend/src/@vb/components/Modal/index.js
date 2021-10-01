import React, { useState } from 'react'
import { Modal, Button, Form, Cascader, Input, Checkbox } from 'antd'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'

const ModalCadastro = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    console.log(data)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ]

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Cadastrar
      </Button>
      <Modal title="Cadastro" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="card">
          <div className="card-header">
            <HeadersCardHeader data={{ title: 'Novo Cliente' }} />
          </div>
          <div className="card-body">
            <Form layout="vertical">
              <div className="row">
                <div className="col-md-6">
                  <Form.Item name="nome" label="Nome">
                    <Input placeholder="Nome" onChange={(e) => setData(e.target.value)} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="cnpj" label="CNPJ">
                    <Input placeholder="CNPJ" />
                  </Form.Item>
                </div>
                <div className="col-9">
                  <Form.Item name="address" label="Endereço">
                    <Input placeholder="1234 Main St." />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item name="number" label="Numero">
                    <Input placeholder="987" />
                  </Form.Item>
                </div>
                <div className="col-md-5">
                  <Form.Item name="district" label="Cidade">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item name="state3" label="State">
                    <Cascader options={residences} />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item name="zip" label="Zip">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="contact" label="Contato">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="email" label="Email">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="site" label="Site">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="ig" label="Instagram">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="segmentId" label="Segmento">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item name="tags" label="Tags">
                    <Input />
                  </Form.Item>
                </div>

                <div className="col-12">
                  <Form.Item valuePropName="active" name="Active">
                    <Checkbox className="text-uppercase">Usuário ativo?</Checkbox>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalCadastro
