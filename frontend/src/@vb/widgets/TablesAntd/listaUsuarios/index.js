import React, { useState, useRef, useEffect } from 'react'
import { Table, Input, Button, Space, Divider, Modal } from 'antd'
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { getUsersData, deleteUser } from 'services/usuarios'
import Highlighter from 'react-highlight-words'

function TablesAntdCustomFilter() {
  const [users2, setUsers] = useState([])
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
    getAllUsers()
    setIsDelete(false)
    console.log(users2)
  }, [isDelete])

  const getAllUsers = async () => {
    try {
      const users = await getUsersData()
      setUsers(users)
      console.log(users)
    } catch (error) {
      console.log(error)
    }
  }

  const GoToEdit = (id) => {
    history.push(`/users/update/${id}`)
  }

  function showDeleteConfirm(id) {
    Modal.confirm({
      title: 'Você deseja mesmo deletar esse usuário ?',
      icon: <ExclamationCircleOutlined />,
      content: 'O usuário será deletado de forma permanente',
      okText: 'Deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        try {
          deleteUser(id)
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

  if (users2.length === 0) {
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => {
        return <img src={avatar} alt="avatar" />
      },
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'active',
      render: (active) => {
        return active ? 'Sim' : 'Não'
      },
    },
    {
      title: 'Último Acesso',
      dataIndex: 'lastAcess',
      key: 'lastAcess',
      render: (lastAcess) => {
        return lastAcess || 'Sem acessos'
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

  return <Table columns={columns} dataSource={users2} />
}

export default TablesAntdCustomFilter
