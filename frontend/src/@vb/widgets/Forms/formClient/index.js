import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Cascader, Input, Button, notification, Spin, Tabs } from 'antd'
import { SmileOutlined, LoadingOutlined } from '@ant-design/icons'
import store from 'store'
import { getSegmentsData } from 'services/segmentos'
import { createClient, updateClient, getClientsDataId } from 'services/clientes'
import { getTypePhonesData } from 'services/typePhones'
import { getClientsPhonesData, createClientsPhones } from 'services/clientsPhones'

const Form3 = () => {
  const [idCliente, setId] = useState(null)
  const [segments2, setSegments] = useState([])
  const [typePhones, setTypePhones] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [phones, setPhones] = useState([])
  const [client, setClient] = useState({})
  const [index, setIndex] = useState(0)
  // const [phone, setPhone] = useState()
  // const [phoneType, setPhoneType] = useState()
  const [data, setData] = useState({
    name: null,
    cnpj: null,
    address: null,
    number: null,
    district: null,
    zip: null,
    contact: null,
    email: null,
    site: null,
    ig: null,
    obs: null,
    segmentId: null,
    tags: null,
    active: true,
    createdBy: store.get('id'),
  })
  const [clientsPhones, setClientsPhones] = useState({
    clientId: store.get('idNewClient'),
    typePhoneId: typePhones.id,
    phone: null,
  })
  const [activeKey, setActiveKey] = useState('1')
  const onKeyChange = (key) => setActiveKey(key)

  const { id } = useParams()
  const history = useHistory()
  const { TabPane } = Tabs

  // const callback = (key) => {
  //   console.log(key)
  // }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const getClientsId = async () => {
    try {
      setId(id)
      const clients = await getClientsDataId(id)
      setClient(clients)
      if (clients) {
        setIsLoading(false)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const getTypesPhones = async () => {
    try {
      setId(id)
      const typesPhones = await getTypePhonesData()
      setTypePhones(typesPhones)
      if (typesPhones) {
        setIsLoading(false)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const getClientsPhones = async () => {
    try {
      const clientPhones = await getClientsPhonesData()
      setClientsPhones(clientPhones)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const getAllSegments = async () => {
    const AllSegments = await getSegmentsData()
    setSegments(AllSegments)
  }

  const openNotification = () => {
    notification.open({
      message: 'Sucesso',
      description: id ? 'Cliente modificado com sucesso!' : 'Cliente cadastrado com sucesso',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }
  const openNotificationPhone = () => {
    notification.open({
      message: 'Sucesso',
      description: id ? 'Fone modificado com sucesso!' : 'Fone cadastrado com sucesso',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
  }
  const editClient = async () => {
    try {
      const response = await updateClient(id, client)
      if (!response.error) {
        openNotification()
        history.push('/clients')
      }
      console.log('idBotão:', idCliente)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const newClient = async () => {
    try {
      const response = await createClient(data)
      if (!response.error) {
        openNotification()
        history.push(onKeyChange('2'))
        store.set('idNewClient', response.id)
        console.log(store.get('idNewClient'))
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const newClientPhone = async () => {
    try {
      const response = await createClientsPhones(clientsPhones)
      if (!response.error) {
        openNotificationPhone()
        // history.push(onKeyChange('2'))
        // store.set('idNewClient', response.id)
        // console.log(store.get('idNewClient'))
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData(data)
    setClient(client)
    setClientsPhones(phones)
    console.log('***', data)
    console.log('***', clientsPhones)
  }

  const options2 = segments2.map((segment) => {
    return {
      value: segment.id,
      label: segment.name,
    }
  })

  const options3 = typePhones.map((typePhone) => {
    return {
      value: typePhone.id,
      label: typePhone.name,
    }
  })

  const addInputButton = async (e) => {
    // const response = await createClientsPhones(phones)
    // if(!response.error){
    //   openNotificationPhone()
    // }
    setIndex(index + 1)
    e.preventDefault()
    const newPhones = [
      ...phones,
      {
        clientId: store.get('idNewClient'),
        phone: clientsPhones.phone,
        typePhone: clientsPhones.typePhoneId,
      },
    ]
    setPhones(newPhones)
    console.log(phones)
  }
  console.log('***', clientsPhones)
  console.log('******', phones)

  console.log('***CP', clientsPhones)
  console.log('***Data', data)
  useEffect(() => {
    setIsLoading(true)
    if (id) {
      getClientsId()
      getAllSegments()
      getTypesPhones()
      getClientsPhones()
    } else {
      getAllSegments()
      getTypesPhones()
      setIsLoading(false)
    }
  }, [])

  return !isLoading ? (
    <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={onKeyChange}>
      <TabPane tab="Dados" key="1">
        <Form layout="vertical" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <Form.Item name="name" label="Nome" defaultValue={data.name}>
                <Input
                  defaultValue={client.name}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, name: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, name: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="cnpj" label="CNPJ" rules={[{ required: true }]}>
                <Input
                  defaultValue={client.cnpj}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, cnpj: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, cnpj: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item name="address" label="Endereço">
                <Input
                  defaultValue={client.address}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, address: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, address: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-1">
              <Form.Item name="number" label="Numero">
                <Input
                  defaultValue={client.number}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, number: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, number: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="district" label="Cidade">
                <Input
                  defaultValue={client.district}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, district: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, district: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-1">
              <Form.Item name="zip" label="Zip">
                <Input
                  defaultValue={client.zip}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, zip: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, zip: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-1">
              <Form.Item name="contact" label="Contato">
                <Input
                  defaultValue={client.contact}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, contact: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, contact: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="email" label="Email">
                <Input
                  defaultValue={client.email}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, email: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, email: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="site" label="Site">
                <Input
                  defaultValue={client.site}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, site: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, site: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="ig" label="Instagram">
                <Input
                  defaultValue={client.ig}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, ig: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, ig: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="segmentId" label="Segmento">
                <Cascader
                  defaultValue={client.segmentId}
                  options={options2}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, segmentId: e[0] })
                        }
                      : (e) => {
                          setData({ ...data, segmentId: e[0] })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="tags" label="Tags">
                <Input
                  defaultValue={client.tags}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, tags: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, tags: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item name="obs" label="Obs">
                <Input
                  defaultValue={client.obs}
                  onChange={
                    id
                      ? (e) => {
                          setClient({ ...client, obs: e.target.value })
                        }
                      : (e) => {
                          setData({ ...data, obs: e.target.value })
                        }
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Button className="primary" onClick={id ? editClient : newClient}>
                Proxima Etapa
              </Button>
            </div>
          </div>
        </Form>
      </TabPane>
      <TabPane tab="Contatos" disabled key="2">
        <Form layout="vertical">
          <div className="row">
            <div className="col-md-2">
              <Form.Item name="type" label="Tipo">
                <Cascader
                  options={options3}
                  onChange={(e) => {
                    setClientsPhones({ ...clientsPhones, typePhoneId: e[0] })
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="phone" label="Fone">
                <Input
                  onChange={(e) => {
                    setClientsPhones({ ...clientsPhones, phone: e.target.value })
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Button type="submit" className="btn btn-success" onClick={addInputButton}>
                Adicionar
              </Button>
            </div>
          </div>
          {phones.map((type, fone) => (
            <div className="row">
              <div className="col-md-2">
                <Form.Item name={`type[${fone}]`} label="Tipo">
                  <Cascader
                    options={options3}
                    onChange={(e) => {
                      setClientsPhones({ ...clientsPhones, typePhoneId: e[0] })
                      setClientsPhones({ ...clientsPhones, clientId: store.get('idNewClient') })
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item name={`phone[${fone}]`} label="Fone">
                  <Input
                    defaultValue={phones[index] ? phones[index].phone : ''}
                    onChange={(e) => {
                      console.log('indejasiodj', phones)
                      console.log('indejasiodj', phones[index])
                      setClientsPhones({ ...clientsPhones, phone: e.target.value })
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          ))}
        </Form>
        <div className="col-md-2">
          <Button className="primary" onClick={() => onKeyChange('1')}>
            Voltar
          </Button>
          <Button
            type="submit"
            className="btn btn-success"
            onClick={id ? editClient : newClientPhone}
          >
            Salvar
          </Button>
        </div>
      </TabPane>
    </Tabs>
  ) : (
    <Spin indicator={antIcon} />
  )
}

export default Form3
