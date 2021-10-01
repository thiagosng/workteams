import React, { useState, useRef, useEffect } from 'react'
import { Table, Input, Button, Space, Divider, Modal } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { getSegmentsData, deleteSegment } from 'services/segmentos'

function TablesAntdCustomFilter() {
  const [segments2, setSegments] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const history = useHistory()
  const { confirm } = Modal

  const searchInput = useRef(null)

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirmar, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirmar, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirmar, dataIndex)}
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

  function handleSearch(selectedKeys, confirmar, dataIndex) {
    confirmar()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  function handleReset(clearFilters) {
    clearFilters()
    setSearchText('')
  }

  useEffect(() => {
    getAllSegments()
    setIsDelete(false)
    console.log(segments2)
  }, [isDelete])

  const getAllSegments = async () => {
    try {
      const segments = await getSegmentsData()
      setSegments(segments)
      console.log(segments)
    } catch (error) {
      console.log(error)
    }
  }

  const GoToEdit = (id) => {
    history.push(`/segments/update/${id}`)
  }

  function showDeleteConfirm(id) {
    confirm({
      title: 'Você deseja mesmo deletar esse segmento ?',
      icon: <ExclamationCircleOutlined />,
      content: 'O segmento será deletado de forma permanente',
      okText: 'Deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        try {
          deleteSegment(id)
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

  if (segments2.length === 0) {
    return <div>Loading...</div>
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
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

  return <Table columns={columns} dataSource={segments2} />
}

export default TablesAntdCustomFilter
