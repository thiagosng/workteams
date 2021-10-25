import React, { useState, useEffect } from 'react'
import { getProjectsDataId } from 'services/projects'
import { useParams } from 'react-router-dom'
import { Card, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const { id } = useParams()
  const { Meta } = Card

  const getProjectsId = async () => {
    const projectsId = await getProjectsDataId(id)
    setProjects(projectsId)
  }
  console.log('****Projetos', projects)

  useEffect(() => {
    getProjectsId()
  }, [])

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
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
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
