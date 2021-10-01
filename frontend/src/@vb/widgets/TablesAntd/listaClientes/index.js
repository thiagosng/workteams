import React, { useState, useRef, useEffect } from 'react'
import { Table, Input, Button, Space, Divider, Tag, Modal } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { getClientsData, deleteClient } from 'services/clientes'

function TablesAntdCustomFilter() {
  const [clients2, setClients] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const history = useHistory()
  const searchInput = useRef(null)

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current.select())
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  function handleReset(clearFilters) {
    clearFilters()
    setSearchText('')
  }

  useEffect(() => {
    getAllClients()
    setIsDelete(false)
    console.log(clients2)
  }, [isDelete])

  const getAllClients = async () => {
    try {
      const clients = await getClientsData()
      setClients(clients)
      console.log(clients)
    } catch (error) {
      console.log(error)
    }
  }

  const GoToEdit = (id) => {
    history.push(`/clients/update/${id}`)
  }

  function showDeleteConfirm(id) {
    Modal.confirm({
      title: 'Você deseja mesmo deletar esse cliente ?',
      icon: <ExclamationCircleOutlined />,
      content: 'O cliente será deletado de forma permanente',
      okText: 'Deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        try {
          deleteClient(id)
          setIsDelete(true)
        } catch (error) {
          console.log(error)
        }
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  if (clients2.length === 0) {
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Contato',
      dataIndex: 'contact',
      key: 'contact',
      width: '20%',
      ...getColumnSearchProps('contact'),
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
      ...getColumnSearchProps('cnpj'),
    },
    {
      title: 'Cidade',
      dataIndex: 'district',
      key: 'district',
      ...getColumnSearchProps('cnpj'),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => {
        if (tags === null) {
          return <span>No Tags</span>
        }
        return (
          <span>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'red' : 'green'
              if (tag === 'loser') {
                color = 'volcano'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </span>
        )
      },
    },
    {
      title: 'Segmento',
      dataIndex: 'segment',
      key: 'segmentId',
      render: (segment) => {
        return <span>{segment.name}</span>
      },
    },
    {
      title: 'Action',
      key: 'id',
      dataIndex: 'id',
      render: (id) => {
        return (
          <span>
            <Button
              type="primary"
              onClick={() => GoToEdit(id)}
              shape="circle"
              icon={<FormOutlined />}
            />
            <Divider type="vertical" />
            <Button
              type="danger"
              onClick={() => showDeleteConfirm(id)}
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </span>
        )
      },
    },
  ]

  return <Table columns={columns} dataSource={clients2} />
}

export default TablesAntdCustomFilter
