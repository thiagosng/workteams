import React, { useState, useEffect } from 'react'
import { getProjectsDataId, deleteProject } from 'services/projects'
import { useParams, useHistory } from 'react-router-dom'
import { Card, Avatar, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const history = useHistory()
  const { id } = useParams()
  const { Meta } = Card

  const getProjectsId = async () => {
    const projectsId = await getProjectsDataId(id)
    setProjects(projectsId)
  }
  console.log('****Projetos', projects)

  const onEditProject = () => {
    history.push(`/projects/update/${id}`)
  }

  useEffect(() => {
    getProjectsId()
    setIsDelete(false)
  }, [isDelete])

  function showDeleteConfirm() {
    Modal.confirm({
      title: 'Você deseja mesmo deletar esse cliente ?',
      icon: <ExclamationCircleOutlined />,
      content: 'O cliente será deletado de forma permanente',
      okText: 'Deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        try {
          deleteProject(id)
          setIsDelete(true)
          history.push('/projects')
        } catch (error) {
          console.log(error)
        }
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <DeleteOutlined key="setting" onClick={showDeleteConfirm} />,
        <EditOutlined key="edit" onClick={onEditProject} />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={projects.name}
        description={projects.description}
      />
    </Card>
    // <div>
    //   <h1>{projects.name}</h1>
    //   <div className="card-body">
    //     <h3>{projects.description}</h3>
    //   </div>
    // </div>
  )
}

export default ProjectsList
