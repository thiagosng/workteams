import React, { useState, useEffect } from 'react'
import { getProjectsDataId, deleteProject } from 'services/projects'
import { useParams, useHistory } from 'react-router-dom'
import { Card, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { getProjectsUsersDataId } from 'services/projectsUsers'
import FormAddUsers from '../FormAddUser'

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const [projectUser, setProjectUser] = useState([])
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

  const getProjectsUsersId = async () => {
    try {
      const projectsUsers = await getProjectsUsersDataId(id)
      setProjectUser(projectsUsers)
      console.log('ResponseClientsID:', projectsUsers)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  useEffect(() => {
    getProjectsId()
    getProjectsUsersId()
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
  console.log('****Projetos', projectUser)
  return (
    <div>
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
          title={projects.name}
          description={projects.description}
          style={{ textAlign: 'center' }}
        />
      </Card>

      <Card title="Membros do Projeto" style={{ width: 300, marginTop: 10 }}>
        <div>
          {projectUser.map((project) => (
            <div key={project.id}>
              <p>{project.users.name}</p>
            </div>
          ))}
        </div>
        <FormAddUsers />
      </Card>
    </div>
  )
}

export default ProjectsList
